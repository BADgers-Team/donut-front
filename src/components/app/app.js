import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import RouterStore from 'store/routes';
import AjaxModule from 'services/ajax';
import LayoutIndex from 'components/layouts/layout-index/layout-index';
import LayoutCreatePost from 'components/layouts/layout-create-post/layout-create-post';
import LayoutSearch from 'components/layouts/layout-search/layout-search';
import BlockHeader from 'components/blocks/block-header/block-header';

import './app.scss';
import 'assets/fonts/Avenir-Next.ttf';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
        };
    }

    componentDidMount() {
        AjaxModule.get(RouterStore.api.me).then((data) => {
            this.setState({ user: data });
        });
    }

    render() {
        const pages = RouterStore.pages;
        const { user } = this.state;

        return (
            <BrowserRouter>
                <BlockHeader user={user}/>
                <div className="content">
                    <Switch>
                        <Route path={pages.main} exact render={(props) => <LayoutIndex {...props}/>}/>
                        <Route path={pages.posts.new} render={(props) => <LayoutCreatePost {...props}/>}/>
                        <Route path={pages.podcasts.all} render={(props) => <LayoutSearch {...props}/>}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
