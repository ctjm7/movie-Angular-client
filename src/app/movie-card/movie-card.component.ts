import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  isFavorite: any = null;

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }


  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * retrieves all movies from api endpoint
   * @returns array of all movies each as an object
   * @function getMovies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * opens the dialog when the director button is clicked
   * @param {string} name
   * @param {string} bio
   * @param {number} birth
   */
  openDirectorDialog(name: string, bio: string, birth: number): void {
    this.dialog.open(DirectorComponent, {
      width: '500px',
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
      }
    });
  }

  /**
   * opens dialog and gives genre name and description
   * @param {string} name
   * @param {string} desc
   */
  openGenreDialog(name: string, desc: string): void {
    this.dialog.open(GenreComponent, {
      width: '500px',
      data: {
        Name: name,
        Description: desc,
      }
    });
  }

  /**
   * opens dialog and gives movie title and description
   * @param {string} title
   * @param {string} desc
   */
    openSynopsisDialog(title: string, desc: string): void {
      this.dialog.open(SynopsisComponent, {
        width: '500px',
        data: {
          Title: title,
          Description: desc,
        }
      });
    }

  /**
   * adds movie to favorites list and changes icon color to red for favorite
   * @param {string} id
   * @param {number} index
   */
  addFavoriteMovie(id: string, index: number): void {
    this.fetchApiData.addFav(id).subscribe((response: any) => {
      this.isFavorite = index;
      return console.log(response);
    });
  }

}
