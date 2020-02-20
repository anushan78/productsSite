This is a simple implementation of a product site using react and Typescript
The project is created with [Create React App](https://github.com/facebook/create-react-app).

## Setup

To get started, clone this repo and install dependencies with `npm install`.

`npm start` runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

`npm test` launches the test runner in the interactive watch mode.

`npm run test:coverage` for full test coverage report.

`npm run build` builds the app for production to the `build` folder.

## About

#### The Libraries used
* TypeScript
* TypeStyle (Type-safe CSS)
* AntD (component library)
* FontAwesome (icon library)
* Enzyme (test utility)

#### More Details
* Some of the provided `metadata` relating to pagination didn't reflect the actual results, so some of this was left out in place of more accurate pagination feedback.
* While displaying the 'add to cart' button on hover works on desktop, this may not be the ideal solution for touch devices.
* The product grid is responsive through the use of CSS grid without media queries.
* Normally the endpoint URL would be stored in an `.env` file, not in source code.

By Anushan Tennakoon: February 2020