import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface skill {
  skill_name: string;
  member1: string;
  member2: string;
  member3: string;
}
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://127.0.0.1:8000/portfolio/api'; // Backend endpoint
  constructor(private http: HttpClient) {}

  // Get all skills
  getSkills(): Observable<skill[]> {
    return this.http.get<skill[]>(`${this.apiUrl}/skills`);
  }

  // Get a specific skill by name
  getSkill(skillName: string): Observable<skill> {
    return this.http.get<skill>(`${this.apiUrl}/skills/${skillName}`);
  }

  // Create a new skill
  createSkill(skill: skill): Observable<skill> {
    return this.http.post<skill>(`${this.apiUrl}/skill/create`, skill); // Updated URL for create
  }

  // Update an existing skill
  updateSkill(skill: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/skill/update`, skill);
  }

  // Delete a skill by name
  deleteSkill(skillName: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/skill/delete`, {
      headers: { 'Content-Type': 'application/json' },
      body: { skill_name: skillName } // Properly formatted payload
    });
  }
}
