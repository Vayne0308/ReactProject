import React, { Component } from 'react';

import WithCheckLogin from '$cont/with-check-out';

@WithCheckLogin
class Home extends Component{

    render(){

        return <div>
            home...
        </div>
    }
}

export default Home;
