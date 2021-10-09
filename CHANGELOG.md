# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.9.0] - 2021-10-09

### Added

- This PR adds custom description to cards in the form of a popup. Very handy feature that allows users to add more info about an issue.

## [1.8.2] - 2021-01-03

### Changed

- Completely replace materialize with bootstrap. At the moment the project loads only what it needs and not the whole library. This will make it easier to develop since way more people use bootstrap than materialize and will be more contributor-friendly too.

## [1.8.1] - 2021-01-02

### Changed

- Replace moment with Day.js in the backend
- Updated packages in the backend

## [1.8.0] - 2020-11-29

### Added

- Add forgot/reset password functionality

## [1.7.1] - 2020-11-29

### Changed

- Fix bug in timesheets that messed up the days in the bar chart because in JavaScript day 0 is Sunday instead of Monday
- Optimize lodash imports in Front-End

## [1.7.0] - 2020-08-13

After a lot of inactivity, today we're introducing a new update with 2 kinda big features, quality improvements of the project and bug fixes. There are also changes that we never released a changelog for, so every change since the last changelog is documented here.

### Added

- 🎉🥳 Add timesheets for pomodoros. This shows your stats and it has 2 graphs. The first will show you which days of the week you are most productive and the other will show your completed pomodoros over time. This is still an incomplete version, there are more stuff that will be added, but now you can use all the pomodoros that you were completing all this time and be happy with yourself. 🎉🥳
- 🎉🥳 Beta version of the app. This version will contain any upcoming changes and features that are almost-complete before going into the main app. This version is live on [beta.prodapp.xyz](https://beta.prodapp.xyz/). That way we can have 1 more testing step before features go to the main app. 🎉🥳

### Changed

- Functionality of the pomodoros is changed. Now when the break ends, you will have to manually start a new pomodoro.
- Improve board cards. Now you text will wrap to a new line using auto-heighted textareas.
- Fix bug on board cards that didn't show the old text when you went to edit it.
- Remove snyk from the repository and the packages
- Update packages
- Remove double import of \_.cloneDeep
- Add favicons
- Move the backend to a [separate repository](https://github.com/1qk1/prodapp-backend) and add it as a submodule to make it easier to deploy the backend and the frontend, since they get deployed on different services and require different build processes.
- Remove postbuild.js and heroku-postbuild from the build script and package.json. This has to do with the way backend is deployed now. Before it was deployed on a VPS using pm2. This made it very hard to maintain and easy to break since it was just a folder containing all the files. Now it's containerized using dokku on a [hetzner](https://www.hetzner.com/) VPS, behind an nginx webserver. That makes it way easier to handle SSL certificates(that was a problem before), domains and everything is more automated.

## [1.6.6] - 2019-11-17

### Changed

- Add document titles to each page
- Fix bug of not closing modal after deleting a board.
- Updated to correct version

## [1.6.5] - 2019-11-13

### Added

- Screenshots of the project in README

### Changed

- Fixed card moving bug
- Fixed button type bug in edit form
- Fixed list title changing bug

## [1.6.4] - 2019-11-12

### Changed

- Add cors whitelist for prodapp.xyz on production
- Add redirects file for netlify
- Improve password verification middleware and passport strategy

## [1.6.3] - 2019-11-10

### Added

- Added spdy/http2 support
- Added more env vars in the webclient for axios and fixed the current ones with the right prefix for create-react-app

### Changed

- Set the node version in the package.json files back to 10 because 12 was causing many problems with the spdy server and netlify

## [1.6.2] - 2019-11-10

### Changed

- Removed all post build scripts and production hacks

## [1.6.1] - 2019-11-08

### Changed

- Included Montserrat font through npm and removed the cdn import
- Fixed the instructions in the README file to install dependencies using the new command mentioned in the previous version

## [1.6.0] - 2019-11-07

### Added

- 🎉🥳 Added functionality for multiple boards 🎉🥳
- Added components to view and manage all your boards, and one to view a single board
- Added validation for inputted text in boards/lists/cards
- Added board colors in both frontend and backend to make them the same and more consistent

### Changed

- User, board, list and card models in the backend to make less requests.
- Improved the way routes and sidebar buttons are rendered
- Updated (almost) all dependencies and fixed all vulnerabilities
- Removed unused dependencies
- Style improvements
- Bug fixes
- Rename install dependencies script. Now you can install all dependencies from the root folder of the project by running `npm run installdeps`

## [1.5.4] - 2019-07-04

### Added

- Added form validation in both frontend and backend
- Added colors for invalid form inputs

### Changed

- Improved component structure to fit the form validation changes
- Moved the authentication actions from redux to the LandingPage component
- Added a close button in the authentication modal
- Made the colors in the landing page more consistent (replaced Material UI's default color)
- Added prop-types to components
- Cleaned up console.logs and commented out code
- Minor style improvements

## [1.5.3] - 2019-03-28

### Changed

- Layout and styling improvements
- Improve landing page structure
- Update README.md

## [1.5.2] - 2019-02-05

### Added

- Heroku deployment scripts and production checks to serve the website
- Minor chrome error fixes

## [1.5.1] - 2019-02-02

### Changed

- Heavily improved the landing page, now the project has a more decent looking landing page
- Styling improvements here and there
- Moved all api calls to the backend to /api/

## [1.5.0] - 2019-01-26

### Added

- An extension store where you can select what features of the platform you want.

### Changed

- Improved authentication handling.
- Now routes and sidebar buttons load dynamically based on the user's selected extensions

## [1.4.2] - 2019-01-20

### Added

- Token verification when loading the webclient.

### Changed

- Improved the verifyToken function.
- Added a subtle linear gradient.
- Small improvements in components.
- Small styling improvements.

## [1.4.1] - 2019-01-10

### Added

- Added proptypes in the components: auth forms, landing page navbar, sidebar, sidebar buttons, pomodoro,
  card, list, new card, dropdown, modal and toggler

### Changed

- Fixed a bug that made the pomodoro slow when the tab wasn't active

## [1.4.0] - 2019-01-06

### Added

- Added action queuing when dropping cards in the board. This also fixes some errors regarding
  moving cards when the backend moves a second card before it finishes moving the first one

### Changed

- Renamed the Home and Unauthorized components to Landing and LandingPage
- Minor improvements

## [1.3.11] - 2018-12-31

### Changed

- Improved the styling of the cards, lists and scrollbars in the kanban board

## [1.3.10] - 2018-12-30

### Changed

- Fixed a bug that broke the moving of the cards caused by not updating the card's listId on the database.
- Fixed patch's 1.3.9 date.

## [1.3.9] - 2018-12-29

### Added

- Functionality to move cards between lists AND sorting them at the same time, and also connected it to the backend

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
