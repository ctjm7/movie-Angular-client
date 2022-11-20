import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

// api url for retrieving movie and user info
const apiUrl = 'https://seeyouatmovies.herokuapp.com/';
//get token
const token = localStorage.getItem('token');
//get username stored in local storage
const userName = localStorage.getItem('user');

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  // user login
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  // retrieve all movies
  getAllMovies(): Observable<any> {
    return this.http.get<any>(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // retrieve info for one movie
  getOneMovie(Title: string): Observable<any> {
    return this.http.get<any>(apiUrl + `movies/${Title}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      }),
    }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError));
  }

  // retrieve info on a director
  getDirector(Director: string): Observable<any> {
    return this.http.get<any>(apiUrl + `movies/directors/${Director}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError));
  }

  // retrieve info on a genre
  getGenre(Genre: string): Observable<any> {
    return this.http.get<any>(apiUrl + `movies/genre/${Genre}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError));
  }

  // retrieve user profile information
  getUser(): Observable<any> {
    return this.http.get<any>(apiUrl + `users/${userName}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError));
  }

  // update user profile information
  editUser(updatedUser: any): Observable<any> {
    return this.http.put<any>(apiUrl + `users/${userName}`,
      { updatedUser }, {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          })
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError));
  }

  // delete user profile
  deleteUser(): Observable<any> {
    return this.http.delete(apiUrl + `users/${userName}`,
      {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          })
        }).pipe(catchError(this.handleError));
  }

  // retrieve one movie from favorite movie's list
  getFavMovies(): Observable<any> {
    return this.http.get<any>(apiUrl + `/users/${userName}/movies`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError));
  }

  // add one movie to favorite movie's list
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

  // remove a movie from favorite movie's list
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
