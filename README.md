This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## NOTE:

## amplify environment managment
Currently there are two amplify environments:
1. product: it is connected to the git "product" branch. This branch should stay stable and change infrequently.
   if there is a major change on the "master" branch and approved by product manager, we should merge it from the "master" branch to the "pruduct" branch.
2. dev: historically it is connected to the git "master" branch
   it is a daily development branch.

To switch different environemnts, do "git checkout product" first to change to the other branch; 
then do "amplify env checkout product" to change to corresponding amlify environment. 

When to merge from master to product:
  -- major change approved by admin/product manager

## graphql dependencies packages
important:
1. the react-apollo 3.* version has a known issue about hydrated package; so we chose the 2.5.8 (last of 2.*) instead of 3.*
2. Try to avoid the amplify-js-app package, it conflicts with 4.* antd:
         in yarn.lock exists below dependency (if installed the amplify-js-app@1.0.0):
        amplify-js-app ==> bulky-ui "^1.0.1  ==>   antd "^3.26.0" ==> "@ant-design/icons" "~2.1.1"

        and "@ant-design/icons" "~2.1.1" do not have our codes required resource like "AccountBookOutlined'
        current I removed the amplify-js-app package. 
   From aws-amplify api document: "The Amplify GraphQL client is a light weight option if you’re looking for a simple way to leverage GraphQL features and do not need the offline capabilities or caching"; 
   so using the appsync SDK (e.g., AWSAppSyncClient) instead of amplify SDK
3. to connect the AppSync graphql backend, we need "npm install aws-appsync graphql-tag react-apollo", and our pakcage.json already setup them (item 1 states the react-apollo version issue).
4. https://github.com/awslabs/aws-mobile-appsync-sdk-js 

## react-apollo access the database
all the graphql auto-genereated codes locate at src/graphql
all the data access/CURD codes can be placed at src/helpers/data

recommend to install the Apollo Client Development Tool extension for Chrome 
https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm?hl=en-US

## Refereces:
1. https://dashbird.io/blog/serverless-react-graphql/
2. https://docs.amplify.aws/cli/teams/overview
3. https://github.com/awslabs/aws-mobile-appsync-sdk-js

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
