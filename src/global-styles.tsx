import { injectGlobal } from 'styled-components';
/* tslint:disable:no-unused-expression */
injectGlobal`
  html,
  body {
    overflow: hidden;
    height: 100%;
    width: 100%;
  }
  body {
    background-color: #f4f4f4;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  #app {
    min-height: 100%;
    min-width: 100%;
  }
`;
