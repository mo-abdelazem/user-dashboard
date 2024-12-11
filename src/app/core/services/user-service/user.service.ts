import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) {}

  private searchCache = new Map<string, any>();
  private userCache = new Map<number, any>();
  private usersCache = new Map<number, any>();

  searchUserById(query: string): Observable<any> {
    if (!query) return this.http.get(this.apiUrl);

    if (this.searchCache.has(query)) {
      return of(this.searchCache.get(query));
    }

    const url = `${this.apiUrl}?id=${query}`;
    return this.http.get(url).pipe(
      tap((response) => {
        this.searchCache.set(query, response);
      })
    );
  }

  getUser(id: number): Observable<any> {
    if (this.userCache.has(id)) {
      return of(this.userCache.get(id));
    }

    const url = ` ${this.apiUrl}/${id}`;
    return this.http.get(url).pipe(
      tap((response) => {
        this.userCache.set(id, response);
      })
    );
  }

  fetchUsers(page: number): Observable<any> {
    if (this.usersCache.has(page)) {
      return of(this.usersCache.get(page));
    }
    return this.http.get<any>(`${this.apiUrl}?page=${page}`).pipe(
      tap((data) => {
        this.usersCache.set(page, { data: data.data, total: data.total });
      })
    );
  }
}
