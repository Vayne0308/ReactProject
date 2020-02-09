import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import Home from './components/home';
import Login from './containers/login';
import BaseLayout from '$comp/basic-layout';

import { en, zhCN } from './locales';

class App extends Component{

    render(){
        const language = navigator.language || navigator.languages[0] || "zh-CN" ;
        const message = language === 'en' ? en : zhCN;

        return(
            <IntlProvider locale = {language} messages = { message }>
                <Router>
                    <Switch>
                        <Route path="/login" exact component={Login} />
                        <BaseLayout>
                            <Route path="/" exact component={Home} />   
                        </BaseLayout>   
                    </Switch>
                </Router>
            </IntlProvider>
        );   
    }
}


export default App;