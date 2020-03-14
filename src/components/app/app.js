import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import RouterStore from 'store/routes';
import LayoutIndex from 'components/layouts/layout-index/layout-index';
import LayoutCreatePost from 'components/layouts/layout-create-post/layout-create-post';

import './app.scss';

class App extends Component {
    render() {
        const pages = RouterStore.pages;
        return (
            <BrowserRouter>
                <div className="header">Шапка</div>
                <div className="content">
                    <Switch>
                        <Route path={pages.main} exact render={(props) => <LayoutIndex {...props}/>}/>
                        <Route path={pages.posts.new} render={(props) => <LayoutCreatePost {...props}/>}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
