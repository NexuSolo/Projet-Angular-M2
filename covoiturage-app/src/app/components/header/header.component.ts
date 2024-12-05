import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isLoggedIn: boolean = false;
  profileDropdown: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    console.log(this.isLoggedIn);
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
    console.log("Déconnexion");
    this.authService.logout();
    this.isLoggedIn = false;
  }

}
