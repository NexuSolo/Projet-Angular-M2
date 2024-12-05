import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = {} as User;
  constructor(private http : HttpClient) { }

  register(user: User) {
    console.log(user);
    return this.http.post('http://localhost:3000/users', user).subscribe();
  }

  login(user: { email: string, password: string }) {
    return this.http.get('http://localhost:3000/users?username=' + user.email + '&password=' + user.password);
  }

  logout(){
    this.user = {} as User;
    localStorage.removeItem('user');
  }

  getUser(){
    return localStorage.getItem('user');
  }

  saveUser(){
    localStorage.setItem('user', '' + this.user?.id);
  }

  isLoggedIn(){
    // si le localstorage contient user
    if(localStorage.getItem('user')){
      return true;
    } else {
      return false;
    }

  }

  private getUserInfo() {
    return this.http.get('http://localhost:3000/users/' + this.getUser());
  }

  checkUserExists(email: string): boolean {
    let userExists = false;
    this.http.get<User[]>('http://localhost:3000/users?email=' + email).subscribe((users: User[]) => {
      if (users.length > 0) userExists = true;
    });
    if(userExists){
      console.log('User exists');
    } else{
      console.log('User does not exist');
    }
    return userExists;
    

  }

}
