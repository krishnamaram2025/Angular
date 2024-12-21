import { Component } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent {

  constructor(private teamService: ApiService) {}
  teams: any // Array to store teams
  team: any = { team_name: '', member1: '', member2: '', member3: '' }; // Form model

  ngOnInit(): void {
    this.loadTeams(); // Load teams when component initializes
  }

  // Fetch all teams
  loadTeams() {
    this.teamService.getTeams().subscribe((resp:any) => {
      console.log('Fetched response:', resp); // Log the entire response for debugging
      if (resp && Array.isArray(resp.teams)) {  // Check if teams is an array
        this.teams = resp.teams; // Set the teams array from the response
      } else {
        console.error('Unexpected response format', resp);
      }
    }, error => {
      console.error('Error fetching teams:', error);
    });
  }
  // Handle form submission
  onSubmit() {
    const teamExists = this.teams.some((team: { team_name: any; }) => team.team_name === this.team.team_name);    
    if (teamExists) {
      // If the team exists, update the team
      this.teamService.updateTeam(this.team).subscribe((updatedTeam) => {
        this.loadTeams(); // Reload teams after update
        this.resetForm(); // Reset form after successful update
        this.ngOnInit(); // Reload teams after update
      });
    } else {
      // If team name does not exist, create a new team
      this.teamService.createTeam(this.team).subscribe((newTeam) => {
        this.teams.push(newTeam); // Add the new team to the list
        this.resetForm(); // Reset form after creating the new team
        this.ngOnInit(); // Reload teams after update
      });
    }
  }
  

  // Edit team
  editTeam(index: number) {
    this.team = { ...this.teams[index] };
  }

  // Delete team
  deleteTeam(index: number) {
    this.teamService.deleteTeam(this.teams[index].team_name).subscribe(() => {
      this.teams.splice(index, 1); // Remove the team from the list
    });
  }

  // Reset form
  resetForm() {
    this.team = { team_name: '', member1: '', member2: '', member3: '' };
  }
}
