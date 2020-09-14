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
import {LayoutPayment} from 'components/layouts/layout-payment/layout-payment';
import BlockToastStack from 'components/blocks/block-toast-stack/block-toast-stack';

class App extends Component {
    state = {
        user: null,
    };

    toastStackRef = React.createRef();

    showToast = (data) => {
        const { current: toastStack } = this.toastStackRef;
        toastStack.add(data);
    };

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
                            <Route path={pages.main} exact render={(props) => <LayoutIndex {...props} showToast={this.showToast} />}/>
                            <Route path={pages.posts.new} render={(props) => <LayoutCreatePost {...props} showToast={this.showToast} />}/>
                            <Route path={pages.subscriptions.new} render={(props) => <LayoutCreateSubscription {...props} showToast={this.showToast} />}/>
                            <Route path={pages.search} render={(props) => <LayoutSearch {...props} showToast={this.showToast}/>}/>
                            <Route path={pages.user.login} render={(props) => <LayoutLogin {...props} showToast={this.showToast}/>}/>
                            <Route path={pages.user.callback} render={(props) => <LayoutCallback {...props} showToast={this.showToast}/>}/>
                            <Route path={pages.feed} render={(props) => <LayoutFeed {...props} showToast={this.showToast}/>}/>
                            <Route path={pages.collections} render={(props) => <LayoutCollections {...props} showToast={this.showToast}/>}/>
                            <Route path={pages.pay} render={(props) => <LayoutPayment {...props} showToast={this.showToast}/>}/>
                            <Route exact path="/posts/:id" render={(props) => <LayoutPost {...props} current={user} showToast={this.showToast}/>}/>
                            <Route path="/users/:login" render={(props) => <LayoutProfile {...props} current={user} showToast={this.showToast}/>}/>
                            <Route path={pages.posts.edit} render={(props) => <LayoutCreatePost {...props}/>}/>
                        </Switch>
                    </div>
                </BrowserRouter>
                <BlockToastStack ref={this.toastStackRef}/>
            </Provider>
        );
    }
}

export default App;
