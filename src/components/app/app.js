import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { LayoutIndex } from 'components/layouts/layout-index/layout-index';
import { LayoutCreatePost } from 'components/layouts/layout-create-post/layout-create-post';
import { BlockHeader } from 'components/blocks/block-header/block-header';

import { AjaxModule } from 'services/ajax';
import { RouteStore } from 'store/routes';

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
        AjaxModule.get(RouteStore.api.me).then((data) => {
            this.setState({ user: data });
        });
    }

    render() {
        const pages = RouteStore.pages;
        const { user } = this.state;

        return (
            <BrowserRouter>
                <BlockHeader user={user}/>
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
