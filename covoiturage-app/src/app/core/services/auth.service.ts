import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user!: User | null;

  constructor(private http: HttpClient) {}

  register(user: User): void {
    this.http.post('http://localhost:3000/users', user).subscribe();
  }

  login(email: string, password: string): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/users?email=' + email + '&password=' + password);
  }

  logout(): void {
    localStorage.removeItem('user');
    this.user = null;
  }

  saveUser(user: User): void {
    this.user = user;
    localStorage.setItem('user', '' + this.user?.id);
  }

  isLoggedIn(): boolean {
    // si le localstorage contient user
    return localStorage.getItem('user') !== null;
  }

  checkUserExists(email: string): boolean {
    let userExists = false;
    this.http.get<User[]>('http://localhost:3000/users?email=' + email).subscribe((users: User[]) => {
      if (users.length > 0) userExists = true;
    });
    return userExists;
  }
}
