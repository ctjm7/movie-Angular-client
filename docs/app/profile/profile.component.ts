import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit{

  // initializes user updated input
  @Input() updatedUser: any = {};

  user: any = {};
  favoriteMovies: any = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar,
  ) { }

  // loads user info on profile page
  ngOnInit(): void {
    this.getUserInfo();
  }

  // retrieves user info
  getUserInfo(): void {
    this.fetchApiData.getUser().subscribe((response) => {
      console.log(response);
      this.user = response;
      this.favoriteMovies = response.FavoriteMovies;
    });
  }

  // deletes user profile from database and routes to welcome page
  deleteUserProfile(): void {
    if (confirm('Are you sure you want to delete your profile?')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('Your account has been deleted', 'OK',
          { duration: 3000 });
      });
      this.fetchApiData.deleteUser().subscribe((response) => {
        console.log(response);
        localStorage.clear();
      });
    }
  }

  // updates user profile information and resets user in local storage
  updateUserProfile(): void {
    this.fetchApiData.editUser(this.updatedUser).subscribe((response) => {
      console.log(response);
      this.user = response;
      localStorage.setItem('user', response.Username);
      this.snackBar.open('Profile successfully updated', 'OK', {
        duration: 2000
      });
    });
  }

}
