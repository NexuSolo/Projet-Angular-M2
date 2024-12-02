import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = {} as User;
  constructor(private http: HttpClient) {}

  register(user: User) {
    console.log(user);
    return this.http.post('http://localhost:3000/users', user).subscribe();
  }

  login(user: { email: string; password: string }) {
    return this.http.get('http://localhost:3000/users?username=' + user.email + '&password=' + user.password);
  }

  logout() {
    this.user = {} as User;
    localStorage.removeItem('user');
  }

  getUser() {
    return localStorage.getItem('user');
  }

  saveUser() {
    localStorage.setItem('user', '' + this.user?.id);
  }

  isLoggedIn() {
    if (this.user) {
      this.saveUser();
      return true;
    } else if (this.getUser()) {
      this.getUserInfo().subscribe((user: any) => {
        this.user = user[0];
        return true;
      });
    }
    return false;
  }

  private getUserInfo() {
    return this.http.get('http://localhost:3000/users/' + this.getUser());
  }

  checkUserExists(email: string): Observable<any> {
    return this.http.get('http://localhost:3000/users?email=' + email);
  }
}
