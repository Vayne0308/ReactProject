import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from './components/home';
import Login from './containers/login';
import BaseLayout from '$comp/basic-layout'

class App extends Component{

    render(){
        
        return(
            <Router>
                <Switch>
                    <Route path="/login" exact component={Login} />
                    <BaseLayout>
                        <Route path="/" exact component={Home} />   
                    </BaseLayout>   
                </Switch>
            </Router>
        )
    }
}


export default App;