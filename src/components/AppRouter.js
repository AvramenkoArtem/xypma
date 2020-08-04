import React from 'react';

import {
  Route,
  Switch,
} from 'react-router-dom';

import Posts from './posts';

class AppRouter extends React.Component {

	render () {
		return ( <Switch> <Route exact path="/posts" component={Posts} /> </Switch> )
	}
}


export default AppRouter;