import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isLoggedIn: boolean = false;
  profileDropdown: boolean = false;
  currentUser: User = {} as User;

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    console.log(this.isLoggedIn);
    if (this.isLoggedIn) {
      this.currentUser = await this.authService.getCurrentUser();
    }
    console.log(this.currentUser);
  }

  ngOnChanges() {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  toggleDropdown() {
    const dropdownMenu = document.getElementById('dropdownMenu');
    if (dropdownMenu) {
      if (this.profileDropdown) {
        dropdownMenu.style.display = 'none';
      } else {
        dropdownMenu.style.display = 'block';
      }
      this.profileDropdown = !this.profileDropdown;
    } else {
      throw new Error('dropDownMenu not found');
    }
  }

  logout() {
    console.log('Déconnexion');
    this.authService.logout();
    this.isLoggedIn = false;
  }
}
