# Maltem Full Stack Assignment - Front End

This repository contains the source code for the React front end.

## Structure

-   In the `src` folder, you will find a `components` and `containers` folder.
    -   The `components` folder contains single components such as each individual `Card` component, the `NavBar`, `Table` and `ButtonGroup` components.
        The `NavBar` and `ButtonGroup` components are wrapper components for React-Bootstrap components.
    -   The `containers` folder contains two main containers, namely `LandingLayout` and `DetailsLayout`. These two containers represent the UI for page 1 and 2 respectively in the assignment.

*   components each have a css file (modules for non React-bootstrap components, regular css files for bootstrap components)

## Design Choices

### React Router

To provide the multipage experience needed in page 1 and page 2, React Router was used in the `index.js` file.

The router is set up in a way where the `NavBar` component remains on the page no matter the endpoint. The router then switches between `LandingLayout` and `DetailsLayout` depending on the path and passing props to them from the `App.js` component.

### Landing Page (Page 1)

The landing page in the `LandingLayout` component contains a list of `Card` components. Each card component has an `onClick` listener which pushes a path to the router history. This way, the user can navigate to the details page by clicking on the respective card.

### Details Page (Page 2)

The details page in the `DetailsLayout` component contains several key parts. One of which is `updateTableDataHandler`. This handler executes a helper method, `queryNDates` whenever `this.state.frequency` changes. This call updates the `this.state.tableData` state which gets passed into the `Table` component for displaying.

Constants such as `TODAY`, `THREE_DAYS`, `SEVEN_DAYS` and `NO_EXCHANGE_RATE_FOUND` can be observed in this component. This is to minimize errors when these names are reused in different components such as the `ButtonGroup` and `Table` components.

### Refreshing the `DetailsLayout` page

In my original design, the `DetailsLayout` component did not query for the currency data - it was passed in by props instead. This was an attempt to save on API calls to the currencyScoopAPI via the NodeJS backend. However, refreshing the page caused the props to reset, rendering the page unable to load. Thus, an API call was made in the `ComponentDidMount()` method in the component.

### User Experience

Hover effects were used to give users visual feedback that `Card` components were clickable. The base currency dropdown was also shortened and made scrollable so that the dropdown list would not be too long.

### Others

-   A library was used to manage local storage where key value pairs are used. This stores the base currency under the key name of `base`. The base currency state is taken from this key pair value whenever the page is reloaded.

-   As some components are just wrapper components for react-bootstrap components, these components require a regular css file to style components with existing class names given by the react-bootstrap library. For components which do not rely on react-bootstrap, css moduels are used for styling instead.

## Set Up

### Running The Back end

Before running the front end, please set up and run the back end first. The backend is accessible at https://github.com/Dominic-C/maltem-backend

### Building and Running The Front End

-   After cloning the repository, run `npm install` from the root folder.
-   To build the front end, run `npm run build` from the front end root folder.
-   To run the build, ensure you have `serve` installed. If not, run `npm install -g serve`, then run `serve -s build`.
