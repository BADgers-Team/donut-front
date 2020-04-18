import React, { Component } from 'react';
import { inject } from 'mobx-react';

import BlockActivities from 'components/blocks/block-activities/block-activities';
import BlockCards from 'components/blocks/block-cards/block-cards';
import Button from 'components/fragments/button/button';
import AjaxModule from 'services/ajax';
import RouteStore from 'store/routes';

import './layout-collections.scss';

@inject('user')
class LayoutCollections extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedActivity: 'Все',
            posts: [],
        };
    }

    componentDidMount() {
        AjaxModule.get(RouteStore.api.posts.all).then((data) => {
            this.setState({ posts: data || [] });
        }).catch((error) => {
            console.error(error.message);
        });
    }

    handleChangeActivity = (key) => {
        AjaxModule.get(RouteStore.api.posts.all, key !== 'Все' ? {activities: key} : null)
            .then((data) => {
                this.setState({ posts: data || [] });
            })
            .catch((error) => {
                console.error(error.message);
            });
    };

    render() {
        const { posts } = this.state;
        const { user } = this.props;
        return (
            <div className="layout-collections">
                <BlockActivities onChange={this.handleChangeActivity}/>
                <BlockCards cards={posts}/>
                {!user.login && (
                    <div className="continue">
                        <div className="continue__title">Хотите увидеть больше? Присоединяйтесь!</div>
                        <Button
                            primary
                            outline
                            wide
                            type={Button.types.link}
                            to={RouteStore.pages.user.login}
                            text="Присоединиться"
                        />
                    </div>
                )}
            </div>
        );
    }
}

export { LayoutCollections };
