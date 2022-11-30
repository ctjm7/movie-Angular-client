import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(public router: Router) {}
  ngOnInit(): void {}

   /**
    * navigates to movies page
    */
  toMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * navigates to user profile
   */
  toProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * logs out user and clears local storage
   */
  logout(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }
}
