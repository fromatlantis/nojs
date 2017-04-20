//main.js
import React from 'react';
import ReactDom from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Component1 from './Component1.jsx';

injectTapEventPlugin();


const App = () => (
  <MuiThemeProvider>
    <Component1/>
  </MuiThemeProvider>
);
/**推荐第一种写法
const App = (
  <MuiThemeProvider>
    <Component1/>
  </MuiThemeProvider>
);
**/
ReactDom.render(
    //App,
    <App/>,
    document.getElementById('app')
);