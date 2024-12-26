import { Component } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.css'
})
export class SkillComponent {

  constructor(private skillService: ApiService) {}
  skills: any // Array to store skills
  skill: any = { skill_name: '', stream_name: ''}; // Form model

  ngOnInit(): void {
    this.loadSkills(); // Load skills when component initializes
  }

  // Fetch all skills
  loadSkills() {
    this.skillService.getSkills().subscribe((resp:any) => {
      console.log('Fetched response:', resp); // Log the entire response for debugging
      if (resp && Array.isArray(resp.skills)) {  // Check if skills is an array
        this.skills = resp.skills; // Set the skills array from the response
      } else {
        console.error('Unexpected response format', resp);
      }
    }, error => {
      console.error('Error fetching skills:', error);
    });
  }
  // Handle form submission
  onSubmit() {
    const skillExists = this.skills.some((skill: { skill_name: any; }) => skill.skill_name === this.skill.skill_name);    
    if (skillExists) {
      // If the skill exists, update the skill
      this.skillService.updateSkill(this.skill).subscribe((updatedSkill) => {
        this.loadSkills(); // Reload skills after update
        this.resetForm(); // Reset form after successful update
        this.ngOnInit(); // Reload skills after update
      });
    } else {
      // If skill name does not exist, create a new skill
      this.skillService.createSkill(this.skill).subscribe((newskill) => {
        this.skills.push(newskill); // Add the new skill to the list
        this.resetForm(); // Reset form after creating the new skill
        this.ngOnInit(); // Reload skills after update
      });
    }
  }
  

  // Edit skill
  editSkill(index: number) {
    this.skill = { ...this.skills[index] };
  }

  // Delete skill
  deleteSkill(index: number) {
    this.skillService.deleteSkill(this.skills[index].skill_name).subscribe(() => {
      this.skills.splice(index, 1); // Remove the skill from the list
    });
  }

  // Reset form
  resetForm() {
    this.skill = { skill_name: '', stream_name: ''};
  }
}
