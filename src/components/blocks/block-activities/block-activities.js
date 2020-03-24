import React, { Component } from 'react';
import AjaxModule from 'services/ajax';
import RouteStore from 'store/routes';

import './block-activities.scss';

class BlockActivities extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activities: [],
            selectedTab: 0,
        };
    }
    componentDidMount() {
        AjaxModule.get(RouteStore.api.activities).then((data) => {
            this.setState({ activities: data || [] });
        }).catch((error) => {
            console.error(error.message);
        });
    }

    handleClick = (tab) => {
        this.setState({ selectedTab: tab.id });
        const { onChange } = this.props;
        onChange && onChange(tab.label);
    };

    render() {
        const { activities, selectedTab } = this.state;
        const activitiesNodes = activities.map((activity, index) => {
            if (index === selectedTab) {
                return <Tab key={index} tab={activity} active={true}/>;
            }
            return <Tab key={index} tab={activity} onClick={this.handleClick}/>;
        });
        const currentActivity = activities[selectedTab];

        return (
            <>
                <div className="activities">
                    {activitiesNodes}
                </div>
                <div className="activity__current">
                    {currentActivity && <div className="activity__title">{currentActivity.title}</div>}
                    {currentActivity && <div className="activity__subtitle">{currentActivity.subtitle}</div>}
                </div>
            </>
        );
    }
}

export default BlockActivities;

class Tab extends Component {
    handleClick = () => {
        const { tab, onClick } = this.props;
        onClick && onClick(tab);
    };

    render() {
        const { tab, active } = this.props;
        const classes = active ? 'activity activity__active' : 'activity';
        return (
            <div className={classes} onClick={this.handleClick}>{tab.label}</div>
        );
    }
}
