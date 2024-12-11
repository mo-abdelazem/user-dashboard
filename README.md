# UserDashboard

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.4.

## Overview
The **SearchComponent** is a standalone Angular component designed to search for users by ID. It provides real-time search functionality, handles loading and error states, and supports efficient caching to avoid redundant API calls.

---

## Features
- **View a paginated list of users**: Users are retrieved from an API and displayed in a paginated format.
- **Search for users by ID**: A search bar allows users to search for specific users by their ID.
- **View user details**: Clicking on a user from the list or search results navigates to a detailed user profile page.

## Project Structure
The project is structured as follows:
- src/app - Contains the core application logic.
- core - Contains services used throughout the application.
- services - Contains the UserService for fetching user data.
- features - Contains feature-specific components.
- user-dashboard - Contains the UserDashboardComponent for displaying the user list and pagination.
- user-details - Contains the UserDetailsComponent for displaying a user's details.
- shared - Contains reusable components used across the application.
- header - Contains the HeaderComponent for displaying the application header and search bar.
- search - Contains the SearchComponent for handling user search functionality.
- angular.json - Configuration file for the Angular CLI.

## Dependencies
- This project uses the following dependencies:

- Angular CLI
- HttpClient
- Angular Material (optional for UI components)
- Running the application
- Clone this repository.
- Install dependencies: npm install
- Start the development server: ng serve
- Access the application in your browser at http://localhost:4200/

## UserService
- The UserService is responsible for fetching user data from the reqres.in API. It utilizes caching mechanisms to improve performance:

- searchUserById: Searches for a user by ID. It checks the cache first before making an API call.
- getUser: Retrieves details of a specific user by ID. Similar to searchUserById, it utilizes caching.
- fetchUsers: Fetches a paginated list of users. Caches the retrieved data for faster subsequent requests.

## UserDashboardComponent
- The UserDashboardComponent displays the list of users and pagination controls.

- It retrieves the initial set of users on initialization using fetchUsers from UserService.
- It handles pagination events and reloads user data based on the selected page.

## UserDetailsComponent
- The UserDetailsComponent displays the details of a specific user.

- It retrieves user details based on the ID received through the route parameters.
- It utilizes caching within UserService for improved performance.

## HeaderComponent
- The HeaderComponent displays the application header and includes the SearchComponent.

- It facilitates navigation to a user's details page.
- 
## SearchComponent
- The SearchComponent handles user search functionality.

- It utilizes a Subject to debounce search queries and improve performance.
- It displays a loading indicator and search results based on user input.
- Clicking on a search result emits a user ID which can be used for navigation.

