import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) {}

  searchUserById(query: string): Observable<any> {
    if (!query) return this.http.get(this.apiUrl);
    const url = `${this.apiUrl}?id=${query}`;
    const response = this.http.get(url);
    return response;
  }
  getUser(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    const response = this.http.get(url);
    return response;
  }
}
