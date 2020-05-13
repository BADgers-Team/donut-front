import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'mobx-react';

import '@fortawesome/fontawesome-free/js/all.js';
import '@fortawesome/fontawesome-free/css/all.css';

import RouterStore from 'store/routes';
import LayoutIndex from 'components/layouts/layout-index/layout-index';
import LayoutCreatePost from 'components/layouts/layout-create-post/layout-create-post';
import { LayoutProfile } from 'components/layouts/layout-profile/layout-profile';
import LayoutCreateSubscription from 'components/layouts/layout-create-subscription/layout-create-subscription';
import LayoutSearch from 'components/layouts/layout-search/layout-search';
import { LayoutFeed } from 'components/layouts/layout-feed/layout-feed';
import LayoutPost from 'components/layouts/layout-post/layout-post';
import { LayoutLogin } from 'components/layouts/layout-login/layout-login';
import { LayoutCallback } from 'components/layouts/layout-callback/layout-callback';
import BlockHeader from 'components/blocks/block-header/block-header';
import { models } from 'models/models';

import './app.scss';
import 'assets/fonts/Avenir-Next.ttf';
import {LayoutCollections} from 'components/layouts/layout-collections/layout-collections';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
        };
    }

    render() {
        const pages = RouterStore.pages;
        const { user } = this.state;
        const stores = models();

        return (
            <Provider {...stores}>
                <BrowserRouter>
                    <BlockHeader/>
                    <div className="content">
                        <Switch>
                            <Route path={pages.main} exact render={(props) => <LayoutIndex {...props}/>}/>
                            <Route path={pages.posts.new} render={(props) => <LayoutCreatePost {...props}/>}/>
                            <Route path={pages.subscriptions.new} render={(props) => <LayoutCreateSubscription {...props}/>}/>
                            <Route path={pages.search} render={(props) => <LayoutSearch {...props}/>}/>
                            <Route path={pages.user.login} render={(props) => <LayoutLogin {...props}/>}/>
                            <Route path={pages.user.callback} render={(props) => <LayoutCallback {...props}/>}/>
                            <Route path={pages.feed} render={(props) => <LayoutFeed {...props}/>}/>
                            <Route path={pages.collections} render={(props) => <LayoutCollections {...props}/>}/>
                            <Route path="/posts/:id" render={(props) => <LayoutPost {...props} current={user}/>}/>
                            <Route path="/users/:login" render={(props) => <LayoutProfile {...props} current={user}/>}/>
                        </Switch>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
