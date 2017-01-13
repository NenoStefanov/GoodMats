# GoodMats


SPA application for working with learning materials. Each material has **title**, **description**, optional **img**. Registered users can leave comments on materials and add materials to their profile in a categoty **want-to-watch**, **watched** or **watching**

### Users pages/functionality

- **Users** can **Register**, **Login** and **Logout** in the application
  - Users provide `username`  and `password`
- **All users** (even not logged in) can
  - **View** other users profile page
  - **View** list of materials, that are created by any user
    - The `title`, `createdOn`, `description` and `img` are shown
    - Clicking on a `title` should take the user to the details page of that material
  - **Search** by `title`, `user` or `description`
  - **View** all comments of a material
  - **View** their and other users profile page
  - **View** the details page of the material
    - Shows the `title`, full `description`, `img`, `username` of the creator of the material and a list with all comments
      - Clicking on the `username` (who created the material) should open that user's profile page (`#/users/:username`)
- **Registered and Logged-in users** can:
  - **Have** a profile page on `/users/:username`
  - **Create** a new material
    - Providing `title`, `description` and optionally `img`
  - **Leave** comments on existing materials
    - Prodiving `commentText`
  - Assign a **Status** to a material
  	 - Status can be `want-to-watch`, `watched`, `watching`

### User Profile pages/functionality

- Shows the current users details by username
- Show `want-to-watch`, `watched`, `watching` and lists materials in that state for the current user

### Materials pages/functionality

- **View all materials**
  - List all materials from the server
- **Search materials**
  - **View only filtered materials** that contain the **search phrase**
  - Redirects to **Search results page**
- **Details page**:
  - Shows the `title`, full `description`, `user`, `img` and list with all comments
  	 - Clicking on the `user` should open that user's profile page (`#/users/:username`)
  - Logged-in users can assign a **Status** to a material
  	 - Status can be `want-to-watch`, `watched` or `watching`

## Application routes

- `#/`
  - Redirects to `#/home`
- `#/home`
  - Shows all materials
  - Available to all users, logged-in or not
- `#/home?filter=XXXXXX` or `#/home/XXXXXX`
  - Shows the materials that match the search phrase in the _Search Page_
  - Available to all users, logged-in or not
- `#/auth/register`
  - Shows register form
  - Available to logged-out users
- `#/auth/login`
  - Shows login form
  - Available to logged-out users
- `#/auth/logout`
  - Logged out user
  - Available to logged-in users
- `#/user/:profile`
  - Shows the profile of logged-in user
  - Available to logged-in users
- `#/user/watchlist/:categoty`
  - Shows the materials of user with the `categoty` passed in the URL
  - `#/user/watchlist/want-to-watch` should show the `want-to-watch` materials of the user
  - Available to logged-in users
- `#/users/all`
  - Shows all users
  - Available to all users, logged-in or not
- `#/users/:username`
  - Shows the profile of user with the `username` passed in the URL
  - `#/profiles/john` should show the profile of the user `john`
  - Available to all users, logged-in or not
- `#/materials/add`
  - Show add material form
  - Available to logged-in users
- `#/materials/:id`
  - Shows the materials the _Details page_ of the material with the provided `id`, with full description
      - Logged in users only should be able to change the status of the material (`want-to-watch`, `watched`, `watching`)
  - Available to all users, logged-in or not

## Unit tests

- Unit tests with Mocha, Chai and Sinon for each method of the services
  - Test if the methods work correctly with correct data
  - Test if the methods throw/return approriate exceptions/results


## Constraints and validation

- **User**
  - **username**
      - A string
      - Has length between 6 and 30
      - Can contain only Latin letters, digits and the characters '\_' and '.'
  - **password**
      - A string
      - Has length between 6 and 30
      - Can contain only Latin letters, digits
- **Material**
  - **title**
      - A string
      - Has length between 6 and 100
      - Can contain any characters
  - **description**
      - A string
      - Has no length restrictions
      - Can contain any characters
