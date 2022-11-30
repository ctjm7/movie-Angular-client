import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

// api url for retrieving movie and user info
const apiUrl = 'https://seeyouatmovies.herokuapp.com/';
// get token
const token = localStorage.getItem('token');
// get username stored in local storage
const userName = localStorage.getItem('user');

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  /**
   * Makes the api call for the user registration endpoint
   * @param {object} userDetails
   * @returns user info as an object
   * @function userRegistration
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * API call to login user
   * sets user and token at login
   * @param {object} userDetails
   * @returns user info as an object
   * @function userLogin
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * retrieves all movies from database
   * @returns an array of all movies in json format
   */
  getAllMovies(): Observable<any> {
    return this.http.get<any>(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * retrieves info for one movie
   * @param {string} Title
   * @returns one movie as an object
   */
  getOneMovie(Title: string): Observable<any> {
    return this.http.get<any>(apiUrl + `movies/${Title}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      }),
    }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError));
  }

  /**
   * retrieves info for a director
   * @param {string} Director
   * @returns director info as an object
   */
  getDirector(Director: string): Observable<any> {
    return this.http.get<any>(apiUrl + `movies/directors/${Director}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError));
  }

  /**
   * retrieves info for a genre
   * @param {string} Genre
   * @returns genre and description as an object
   */
  getGenre(Genre: string): Observable<any> {
    return this.http.get<any>(apiUrl + `movies/genre/${Genre}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError));
  }

  /**
   * retrieves user info or error if request failed
   * @param {string} username
   * @returns user information as an object
   */
  getUser(): Observable<any> {
    return this.http.get<any>(apiUrl + `users/${userName}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError));
  }

  /**
   * retrieves updated user info
   * @param {object} updatedUser
   * @returns user info with updated profile info as object
   */
  editUser(updatedUser: any): Observable<any> {
    return this.http.put<any>(apiUrl + `users/${userName}`,
      {
        Username: updatedUser.Username,
        Password: updatedUser.Password,
        Email: updatedUser.Email,
        Birthday: updatedUser.Birthday
      }, {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          })
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError));
  }

  /**
   * deletes user profile from database
   * @param {string} username
   */
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete<any>(apiUrl + `users/${userName}`,
      {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          })
        }).pipe(map(this.extractResponseData),
          catchError(this.handleError));
  }

  // retrieves info for favorite movies
  getFavMovies(): Observable<any> {
    return this.http.get<any>(apiUrl + `/users/${userName}/movies`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError));
  }

  /**
   * updated user info with favorite movie added
   * @param {string} MovieID
   * @returns user with updated info as object
   */
  addFav(MovieID: string): Observable<any> {
    return this.http.post<any>(apiUrl + `users/${userName}/movies/${MovieID}`,
      { FavoriteMovies: MovieID }, {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          })
        }).pipe(map(this.extractResponseData),
          catchError(this.handleError));
  }

  /**
   * updated user info with movie deleted from favorites
   * @param {string} MovieID
   * @returns updated user info as object
   */
  deleteFav(MovieID: string): Observable<any> {
    return this.http.delete<any>(apiUrl + `users/${userName}/movies/${MovieID}`,
      {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          })
        }).pipe(map(this.extractResponseData),
          catchError(this.handleError));
  }

  /**
   * handles an error with any http requests
   * @param error
   * @returns error status and message
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
  return throwError(() => {
    new Error('Something bad happened; please try again later.')
  });
  }

  // Non-typed response extraction
  private extractResponseData(res: Response): any {
    const body = res;
    return body || { };
  }
}
