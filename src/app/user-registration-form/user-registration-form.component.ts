import { Component, OnInit, Input } from '@angular/core';
// use this to close dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// brings in the API calls created
import { FetchApiDataService } from '../fetch-api-data.service';
// used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * Called when creating an instance of the class
   * @param fetchApiData
   * @param dialogRef
   * @param snackBar
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

ngOnInit(): void {}

// This is the function responsible for sending the form inputs to the backend
/**
 * Function for sending the form inputs to the backend to create a new user
 * @returns alert indicationg a successful registration or an error
 */
registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
    // Logic for a successful user registration goes here!
      console.log(response);
      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open('Registration complete', 'OK', {
        duration: 2000
      });
    }, (response) => {
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }
}
