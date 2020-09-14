import React, { Component } from 'react';
import { inject } from 'mobx-react';
import Loader from 'react-loader-spinner';

import BlockActivities from 'components/blocks/block-activities/block-activities';
import BlockCards from 'components/blocks/block-cards/block-cards';
import Button from 'components/fragments/button/button';
import { TOAST_TYPES } from 'components/fragments/toast/toast';
import AjaxModule from 'services/ajax';
import RouteStore from 'store/routes';

import './layout-collections.scss';

@inject('user')
class LayoutCollections extends Component {
    state = {
        selectedActivity: 'Все',
        posts: [],
        isLoaded: false,
    }

    componentDidMount() {
        const {showToast} = this.props;

        AjaxModule.get(RouteStore.api.posts.all).then((data) => {
            this.setState({ posts: data || [], isLoaded: true });
        }).catch((error) => {
            showToast({ type: TOAST_TYPES.ERROR });
            console.error(error.message);
        });
    }

    handleChangeActivity = (key) => {
        const {showToast} = this.props;

        this.setState({ isLoaded: false }, () => {
            AjaxModule.get(RouteStore.api.posts.all, key !== 'Все' ? {activities: key} : {})
                .then((data) => {
                    this.setState({ posts: data || [], isLoaded: true });
                })
                .catch((error) => {
                    showToast({ type: TOAST_TYPES.ERROR });
                    console.error(error.message);
                });
        });
    };

    render() {
        const { posts, isLoaded } = this.state;
        const { user, showToast } = this.props;
        return (
            <div className="layout-collections">
                <BlockActivities onChange={this.handleChangeActivity} showToast={showToast}/>
                {isLoaded ? (
                    <>
                        <BlockCards cards={posts} showToast={showToast}/>
                        {(!user.login && posts?.length > 0) && (
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
                    </>
                ) : (
                    <div className="layout-collections__loader">
                        <Loader
                            type="Bars"
                            color="#FF6982"
                            height={120}
                            width={120}
                        />
                    </div>
                )}
            </div>
        );
    }
}

export { LayoutCollections };
