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
    }

    componentDidMount() {
        const { pathname, search } = window.location;
        const post = JSON.parse(sessionStorage.getItem('donating_info'));
        console.log(post);

        const body = {
            payment_type: post.payment_type,
            post_id: post.id,
            sum: +post.sum,
            message: post.message,
        };
        console.log(body);

        if (pathname && search) {
            AjaxModule.doAxioPost(`${pathname}${search}`, body)
                .then(({ data, status}) => {
                    debugger
                    if (status !== 200 && status !== 201) {
                        throw new Error(data.message);
                    }
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
