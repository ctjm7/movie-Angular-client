import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit{

  // initializes user data input
  @Input() userData = { Username: '', Password: '' };

  /**
   * Called when creating an instance of the class
   * @param fetchApiData
   * @param dialogRef
   * @param snackBar
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router) { }

ngOnInit(): void {}

 // Function for sending the form inputs to the backend to login a user
loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
    // Logic for a successful user registration goes here!
      console.log(response);
      this.router.navigate(['movies']);
      localStorage.setItem('user', response.user.Username);
      localStorage.setItem('token', response.token);
      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open('Login successful', 'OK', {
        duration: 2000
      });
    }, (response) => {
      this.snackBar.open('No user found', 'OK', {
        duration: 3000
      });
    });
  }
}
