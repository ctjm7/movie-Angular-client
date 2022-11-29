# myFlix!

## Description
This is a client-side application using Angular. It is based on an existing server-side code that was created using a REST API and database.

## Purpose of the App
This app is was developed to be introduced to Angular while recreating a client side application that was previously done using React. This is to allow learning Angular in an environment that I am already familiar. This application allows users to view a list of movies. The information provided is a movie description, genre details, and director information. The user can create a profile, update their information and add movies to a favorites list.

## Key Features
* Displays a welcome view where users can either log in or register an
account.
* Once authenticated, the user is directed to the movies view.
* Upon clicking on a particular movie, users are taken to a single movie view, where additional movie details are displayed. The single movie view contains the following additional features:
  * A button that when clicked takes a user to the director view, where details about the director of that particular movie are displayed.
  * A button that when clicked takes a user to the genre view, where details about that particular genre of the movie are displayed.

## User Stories
* As a user, I want to be able to receive information on movies, directors, and genres so that I can learn more about movies I’ve watched or am interested in.
* As a user, I want to be able to create a profile so I can save data about my favorite movies.

## Tech Used
Angular, Node.js, Angular Material, CSS, HTML, JavaScript, TypeScript, Typedoc and JSDoc

## Setting up your environment
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`
Run `ng generate component component-name` to generate a new component

## Dependencies
```
