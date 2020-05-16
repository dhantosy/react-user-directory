## React User Directory App

Demo: [Github Page](https://dhantosy.github.io/react-user-directory/).



### Getting started

Setup the development environment by using the following guide:
```shell
https://create-react-app.dev/docs/getting-started
```

### To start local development

after cloning the repo to your machine, go to the project folder and do the following in the terminal:

Install all dependencies & libraries
```shell
npm install
```

To start local development
```shell
npm start
```


### To create build folder

In the terminal, go to the project folder and do the following:

1. Build assets bundle
```shell
npm run build
```

------------------------------

Known Bugs:
- During initial page load, filter returns empty array when selected. Current workaround is to select the filter, then refresh the page.
- Filter can only be chosen either one, cannot be both. eg. when Color & Cities filter are both active, the displayed data shows filtered by City.

To Do:
- Create infinite scrolling (Need more time to do some research).
