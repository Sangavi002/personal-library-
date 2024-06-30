# Personal Library Application API

## Features

- **User Authentication**: Secure user registration and login.
- **Book Management**: CRUD operations for books.
- **Book Categorization**: Organize books with statuses (Currently Reading, Read, Want to Read).
- **Dynamic Pagination**: Efficiently handle large collections of books.
- **Filtering, Sorting, and Search**: Easily find books based on title and author.
- **Book Reviews**: Create, update, and delete reviews for books.
- **Favorites**: Manage a list of favorite books.

### Authorization
An authorization token needs to be passed in the header for all requests except for the register user API.

---

## API Endpoints

## 1. User Authentication - Register
- **POST /user/register** - Register a new user.
- **Request payload**:
{
  "username": "c",
  "email": "c@gmail.com",
  "password": "c"
}

- **Sample Response**:
{
  "msg": "New user is registered."
}

## 2. User Login
- **POST /user/login** - Login a user and receive a token.
- **Request payload**:
{
  "email": "b@gmail.com",
  "password": "b"
}
- **Sample Response**:
{
  "msg": "Logged In successfully.",
  "Token": "**"
}

## 3. Books - Get All Books:
- **GET /book/allBook** - Retrieve a list of books with optional pagination (default 10 records per page), filtering (status) and search (based on author and title).
Request Query Params:
page=1
limit=1
status=Read
search=think

- **Sample Response**:
{
  "book": [
    {
      "_id": "66813d54e0f10f2542b9c282",
      "title": "Think Like a Monk",
      "author": "jai",
      "genre": "self-help",
      "created": "a",
      "status": "Read"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "hasNextpage": false,
    "hasPrevPage": false,
    "totalItems": 1,
    "itemsPerPage": 1
  }
}

## 4. Add a book
- **POST /book/createBook** - Add a new book.
- **Request payload**:
{
  "title": "War and peace",
  "author": "Leo Tolstoy",
  "genre": "Crime",
  "status": "Read"
}
- **Sample Response**:
{
  "msg": "New Book is created."
}

## 5. Update a book - Only the created user of the book can update it
- **PUT /book/updateBook/{id}** - Update a book by ID.
- **Request payload**:
{
  "status":"Currently Reading"
}
- **Sample Response**:
{
  "msg": "Book updated successfully."
}

## 6. Delete book - Only the created user of the book can delete it
- **DELETE /book/deleteBook/{id}** - Delete a book by ID.
- **Sample Response**:
{
  "msg": "Book deleted successfully."
}

## 7. Reviews - Create or Update: If a review is already present for the logged in user and specified book then we update it or else we create a new review
- **POST /book/createReview** - Add a review for a specific book.
- **Request payload**:
{
  "bookId": "66813ced5470acd6f5336a70",
  "review": "very good",
  "rating": 9
}
- **Sample Response**:
{
  "msg": "Review updated successfully."
}

or

{
  "msg": "Review created successfully."
}

## 8. Delete Review - Only the user who created the review can delete their review
- **DELETE /book/deleteReview/{review_id}** - Delete a review by ID.
- **Sample Response**:
{
  "msg": "Review deleted successfully."
}

## 9.Favorites - Create or Update:  If a book is already added as favorite for the logged in user then we update the favorite status or else we create a new entry for the user and book.
- **POST /book/favoriteBook** - Add a book to favorites.
- **Request payload**:
{
  "bookId": "66813d54e0f10f2542b9c282",
  "marked": true
}
- **Sample Response**:
{
  "msg": "Marked favorite status"
}
