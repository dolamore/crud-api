# CRUD API

## Description

This project is a simple CRUD API built with Node.js and TypeScript, using an in-memory database to store user records. The API supports creating, reading, updating, and deleting users through RESTful endpoints. Error handling is implemented for both client and server-side errors, and the application can be run in both development and production modes.

## Running the Application

### Development Mode

To run the application in development mode with `nodemon` for automatic reloads:

```bash
npm run start:dev
```
This will use nodemon to monitor the dist/bundle.js file, automatically restarting the server on file changes.

### Production Mode

To build and run the application in production:

```bash
npm run start:prod
```

This command will first build the project using webpack and then start the application by running the generated bundle.

### Multi Threading

If you want to run the application in development mode with multi threads, use the following command:

```
npm run start:multi
```

This command uses nodemon to monitor dist/cls.js and restart the server automatically on changes.



## Building

To only build the project:

```bash
npm run build
```

To build the multi threading project:

```bash
npm run build:multi
```

## Endpoints

- **GET /api/users**  
  Returns a list of all users with status code `200`.

- **GET /api/users/{userId}**  
  Returns the user with the specified `userId`.
    - Returns `200` if the user exists.
    - Returns `400` if `userId` is not a valid UUID.
    - Returns `404` if no user with the `userId` exists.

- **POST /api/users**  
  Creates a new user.
    - Returns `201` with the newly created user.
    - Returns `400` if the request body does not contain all required fields.

- **PUT /api/users/{userId}**  
  Updates the user with the specified `userId`.
    - Returns `200` with the updated user.
    - Returns `400` if `userId` is not valid or the request body is missing required fields.
    - Returns `404` if no user with the `userId` exists.

- **DELETE /api/users/{userId}**  
  Deletes the user with the specified `userId`.
    - Returns `204` if the user was successfully deleted.
    - Returns `400` if `userId` is invalid.
    - Returns `404` if the user doesn't exist.

## Error Handling

- Requests to non-existing endpoints return a `404` status with a human-friendly message.
- Server-side errors during request processing return a `500` status with a message.

## Users Schema

Users are stored as objects with the following properties:
- `id` — unique identifier (UUID)
- `username` — user's name (string, required)
- `age` — user's age (number, required)
- `hobbies` — user's hobbies (array of strings, required)

## Environment Variables

The application uses a .env file to store environment variables, specifically the port on which the server runs. Add a .env file in the root directory with the following content:

```
PORT=4000
```
## Running the Tests

The project includes a Postman collection with tests for three scenarios:
1. Get all records with a GET api/users request (an empty array is expected)
2. A new object is created by a POST api/users request (a response containing newly created record is expected)
3. With a GET api/user/{userId} request, we try to get the created record by its id (the created record is expected)

To run the tests, use the following command:

```bash
npm run test
```