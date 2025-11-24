# API Documentation

This document provides information about the Express CRUD JWT API endpoints and how to test them using Postman.

## Setup

1. Import the files into Postman:
   - Import `collection.json` as a collection
   - Import `environment.json` as an environment

2. Select the "Week7 Express CRUD JWT Env" environment in Postman

3. Make sure your server is running on port 4000

## Environment Variables

The following environment variables are used:

- `baseUrl`: Base URL of the API (default: http://localhost:4000)
- `username`: Username for authentication
- `password`: Password for authentication
- `bearerToken`: JWT token (automatically set after login)

## Available Endpoints

### Authentication

#### Register User
- **Endpoint**: POST {{baseUrl}}/auth/register
- **Body**:
```json
{
    "username": "{{username}}",
    "password": "{{password}}"
}
```
- **Access**: Public

#### Login
- **Endpoint**: POST {{baseUrl}}/auth/login
- **Body**:
```json
{
    "username": "{{username}}",
    "password": "{{password}}"
}
```
- **Access**: Public
- **Note**: Successfully logging in will automatically save the JWT token to the `bearerToken` environment variable

### Cars

#### Get All Cars
- **Endpoint**: GET {{baseUrl}}/cars
- **Access**: Protected (requires JWT token)
- **Headers**: 
  - Authorization: Bearer {{bearerToken}}

#### Get Car by ID
- **Endpoint**: GET {{baseUrl}}/cars/:id
- **Access**: Public
- **Parameters**:
  - id: Car ID (path parameter)

#### Create Car
- **Endpoint**: POST {{baseUrl}}/cars
- **Access**: Protected (requires JWT token)
- **Headers**: 
  - Authorization: Bearer {{bearerToken}}
  - Content-Type: application/json
- **Body**:
```json
{
    "brand": "Toyota",
    "model": "Avanza",
    "year": 2020,
    "price": 150000000
}
```

#### Update Car
- **Endpoint**: PUT {{baseUrl}}/cars/:id
- **Access**: Protected (requires JWT token)
- **Headers**: 
  - Authorization: Bearer {{bearerToken}}
  - Content-Type: application/json
- **Parameters**:
  - id: Car ID (path parameter)
- **Body**:
```json
{
    "brand": "Honda",
    "model": "Civic",
    "year": 2021,
    "price": 300000000
}
```

#### Delete Car
- **Endpoint**: DELETE {{baseUrl}}/cars/:id
- **Access**: Protected (requires JWT token)
- **Headers**: 
  - Authorization: Bearer {{bearerToken}}
- **Parameters**:
  - id: Car ID (path parameter)

## Testing Flow

1. Register a new user (if you don't have an account)
2. Login to get the JWT token (automatically saved to environment)
3. Use the protected endpoints with the saved token
4. For public endpoints, no token is required

## Status Codes

- 200: Success (GET, PUT)
- 201: Created (POST)
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Tips

- Always check if you're using the correct environment
- The JWT token is automatically saved after login
- For protected routes, ensure the Authorization header is included
- Check the response status and body for error messages