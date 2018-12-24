# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.8] - 2018-12-24

### Added

- Screenshots and gifs in README
- Functionality to move cards between lists and connected it to the backend

### Changed

- Fixed a bug that didn't allow the to text didn't wrap in cards
- Fixed a bug that the list's name wasn't updating after renaming it

## [1.3.7] - 2018-12-22

### Changed

- Replaced all findByid-edit-save() logic on the models with findByIdAndUpdate().
  This cleans up the code and fixes another bug that hashes the user's password everytime you do User.find execute some logic,
  edit some data and then user.save() for example, because of the User.pre('save') middleware on the user's model which is
  used to hash the user's password before saving the user in the database.

## [1.3.6] - 2018-12-21

### Added

- New way of handling errors, now all errors have the same format, the same error object and are handled by the same error handling function

### Changed

- Replaced all code that was using callbacks with promises and .thens and also cleaned it up when needed
- Fixed some errors and improved the handling of the authentication

## [1.3.5] - 2018-12-20

### Added

- New middleware folder for all future middlewares

### Changed

- Moved the middleware.js file in the middlware folder and split it to seperate files (I would if it didn't had auth middleware functions only!)
- Made the verifyToken middleware router-level in all routes except the auth routes (because of register route)
- Made the bcrypt compare function asynchronous

## [1.3.4] - 2018-12-17

### Changed

- Cleaned up the backend routes by moving each route callback into their own function in a different file.
  Now each part of the board routes (cards and lists), as well as the pomodoro routes have their own handlers files.

## [1.3.3] - 2018-12-16

### Changed

- Fixed the functionality to change a card's text

## [1.3.2] - 2018-12-16

### Added

- Functionality to delete lists from the Board
- Readded the changelog file

### Changed

- Improved the dropdown button component
- Moved all common dropdown button styles to Board.scss
