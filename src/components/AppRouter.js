import React from 'react';

import {
  Route,
  Switch,
} from 'react-router-dom';

import Posts from './posts';
import Showpost from './showpost';

class AppRouter extends React.Component {

	render () {
		return ( <Switch>
		 <Route exact path="/posts" component={Posts} />
		 <Route path="/posts/:id">
		  	<Showpost />
        	</Route>
		  </Switch>
			 )
	}
}


export default AppRouter;