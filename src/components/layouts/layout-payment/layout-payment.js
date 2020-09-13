import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Loader from 'react-loader-spinner';
import AjaxModule from 'services/ajax';

import './layout-payment.scss';
import RouteStore from 'store/routes';
import { getRouteWithID } from 'services/getRouteWithId';

@inject('post')
@observer
class LayoutPayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            success: false,
        };
    }

    componentDidMount() {
        const { pathname, search } = window.location;
        const post = JSON.parse(sessionStorage.getItem('payment_info'));

        const body = {
            payment_type: post.payment_type,
            post_id: post.id,
            sum: +post.sum,
            message: post.message,
        };

        if (pathname && search) {
            AjaxModule.doAxioPost(`${pathname}${search}`, body)
                .then(({ data, status}) => {
                    if (status !== 200 && status !== 201) {
                        throw new Error(data.message);
                    }
                    this.setState({ success: true }, () => {
                        sessionStorage.removeItem('payment_info');
                    });
                })
                .catch((error) => {
                    console.error(error.message);
                });
        }
        // TODO: обработка ошибки
    }

    render() {
        // const { user } = this.props;
        // if (user.login) {
        //     const path = getRouteWithID(RouteStore.pages.user.profile, user.login);
        //     return <Redirect to={path} />;
        // }
        // if (user.name) {
        //     return <Redirect to={RouteStore.pages.user.login} />;
        // }
        const { success } = this.state;

        const post = JSON.parse(sessionStorage.getItem('payment_info'));
        const path = getRouteWithID(RouteStore.pages.posts.id, post.id);
        if (success) {
            return <Redirect to={path}/>;
        }

        return (
            <div className="callback">
                <div className="callback__loader">
                    <div className="callback__loader__text">Загрузка</div>
                    <Loader
                        type="Bars"
                        color="#FF6982"
                        height={120}
                        width={120}
                    />
                </div>
            </div>
        );
    }
}

export { LayoutPayment };
