import React, { Component } from 'react';

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
        // TODO: запрос за тематиками
        // AjaxModule.get(RouterStore.api.posts.all).then((data) => {
        //     this.setState({ posts: data || [] });
        // });
        const activities = [
            {
                id: 0,
                label: 'Все',
                title: 'Любые категории, любые тематики',
                subtitle: 'Любой опубликованный пост можно найти здесь!'
            },
            {
                id: 1,
                label: 'Живопись',
                title: 'Изобразительное искусство',
                subtitle: 'Лучшие шедевры живописи можно отыскать тут!'
            },
            {
                id: 2,
                label: 'Блог',
                title: 'Блогерство',
                subtitle: 'Посты от самых "залайканных" блогеров можно увидеть здесь!'
            },
            {
                id: 3,
                label: 'Фото',
                title: 'Фотография',
                subtitle: 'Невероятно крутые фото от невероятно талантливых фотографов - и все тут!'
            },
            {
                id: 4,
                label: 'Музыка',
                title: 'Музыка',
                subtitle: 'Музыканты, композиторы и певцы рады поделились своими лучшими произведениями здесь!'
            },
            {
                id: 5,
                label: 'Писательство',
                title: 'Писательство',
                subtitle: 'Рукописями лучших авторов современности можно вдохновиться именно тут!'
            },
        ];

        this.setState({
            activities: activities
        });
    }

    handleClick = (id) => {
        if (this.state.selectedTab !== id) {
            this.setState({ selectedTab: id });
        }
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
        onClick && onClick(tab.id);
    };

    render() {
        const { tab, active } = this.props;
        const classes = active ? 'activity activity__active' : 'activity';
        return (
            <div className={classes} onClick={this.handleClick}>{tab.label}</div>
        );
    }
}
