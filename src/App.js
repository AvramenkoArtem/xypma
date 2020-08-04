import React from 'react';
// import logo from './logo.svg';
import './App.css';
import AppRouter from './components/AppRouter';

import {
  Link,
} from 'react-router-dom';




class myComponent extends React.Component {

  render() {
    return ( <React.Fragment>
      <Link to="/posts">К постам</Link>
      <AppRouter />
      </React.Fragment> )
  }

}
export default myComponent;
