# Univ List App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Feature List

1. List university
2. Search university based on name or/and country
3. The list can be sorted
4. Subscription feature on each of the university
5. See list of email subscribe to the univ
6. Login / Register Feature
7. Favorites university for login user

## Developer Feature List

1. Unit Test with coverage using jest enzyme
2. Whole code is covered by ESlint
3. Dynamic import for component
4. Split node modules chunk
5. Setting optimized build using `Craco`

### Before Optimize
![Before](https://user-images.githubusercontent.com/32459976/135231924-96d534b1-fe5e-43cf-8b30-aa2d6a9c4064.png)

### After Optimize
![After](https://user-images.githubusercontent.com/32459976/135231934-08d7b428-2309-4e37-b17e-a97cee17fa7d.png)


## Available Scripts

In the project directory, you can run:

### `yarn Craco`

Runs the app in the development mode using webpack config to optimize the code.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
2 new tab will open:

1. Localhost for react app
2. Webpack bundler analyzer tab

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn coverage`

Launches the test runner and compile coverage statistic.\
See the coverage statistic from `coverage` folder -> `index.html` file

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

This script will be uisng craco build script to use the customize webpack setting
