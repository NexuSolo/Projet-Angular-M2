import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isLoggedIn: boolean = true;
  profileDropdown: boolean = false;

  toggleDropdown() {
    // changer le style de la div
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

  login() {
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
    this.profileDropdown = false;
  }
}
