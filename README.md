# Photo Dashboard

## Starting guide:

1. installing the packages.

```
yarn install
```

2. run the project locally.

```
yarn start
```

## Included packages:

1. [React](https://reactjs.org/) for building the interface.
2. [Redux](https://redux.js.org/) for state management.
3. [Redux toolkit](https://redux-toolkit.js.org/) for making redux simpler.
4. [Typescript](https://www.typescriptlang.org/) for writing typed javascript.
5. [Material UI](https://material-ui.com/) for build in UI element and style.

## Added features:

1. Instant change between pagination mode and infinite scroll mode.
2. Album selection from specific values (valid values loaded from the API).
3. Search by title.
4. Compact view , for more dins view.
5. Slide show for the current page.
6. Alert If the API failed.
7. Skeleton for not loaded yet photos.

### TODO

Those are things I was wishing todo If I had more time:

1. Make some components more generic for reusability (pagination component).
2. App profiling and optimization.
3. Adding 5 thumbnail images to the slide show.
4. Adding more animation , just to feel the site more fluid.
5. Adding some testing with coverage.

### Notes

- The pagination and filtering should be happen in the BE, so In real APP, those actions should be called via Thunk or as an endpoint for RTK createAPI, I use them as normal actions just for better performance in this scenario
