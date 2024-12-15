import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'covoiturage-app';
  showHeader = true;
  showFooter = true;


  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showFooter = !['/login', '/register'].includes(event.urlAfterRedirects) && !event.urlAfterRedirects.includes('/course/') && !event.urlAfterRedirects.includes('/reserved');
        this.showHeader = !['/login', '/register'].includes(event.urlAfterRedirects);
      }

    });
  }
}
