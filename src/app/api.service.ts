import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Team {
  team_name: string;
  member1: string;
  member2: string;
  member3: string;
}
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://127.0.0.1:8000/hackathon/api'; // Backend endpoint
  constructor(private http: HttpClient) {}

  // Get all teams
  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.apiUrl}/teams`);
  }

  // Get a specific team by name
  getTeam(teamName: string): Observable<Team> {
    return this.http.get<Team>(`${this.apiUrl}/teams/${teamName}`);
  }

  // Create a new team
  createTeam(team: Team): Observable<Team> {
    return this.http.post<Team>(`${this.apiUrl}/team/create`, team); // Updated URL for create
  }

  // Update an existing team
  updateTeam(team: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/team/update`, team);
  }

  // Delete a team by name
  deleteTeam(teamName: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/team/delete`, {
      headers: { 'Content-Type': 'application/json' },
      body: { team_name: teamName } // Properly formatted payload
    });
  }
}
