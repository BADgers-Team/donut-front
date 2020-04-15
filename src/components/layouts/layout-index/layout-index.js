import React, { Component } from 'react';

import AjaxModule from 'services/ajax';
import RouteStore from 'store/routes';

import './layout-index.scss';
import BlockLayoutIndexSlotLanding
    from 'components/blocks/block-layout-index-slot-landing/block-layout-index-slot-landing';
import BlockLayoutIndexSlotCategories
    from 'components/blocks/block-layout-index-slot-categories/block-layout-index-slot-categories';
import BlockLayoutIndexSlotExpose
    from 'components/blocks/block-layout-index-slot-expose/block-layout-index-slot-expose';
import BlockLayoutIndexSlotAdvantages
    from 'components/blocks/block-layout-index-slot-advantages/block-layout-index-slot-advantages';
import BlockLayoutIndexSlotFinalize
    from 'components/blocks/block-layout-index-slot-finalize/block-layout-index-slot-finalize';
import BlockFooter from 'components/blocks/block-footer/block-footer';

class LayoutIndex extends Component {
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

    render() {
        return (
            <div className="layout-index">
                <div className="layout-index__slot-landing">
                    <BlockLayoutIndexSlotLanding/>
                </div>
                <div className="layout-index__slot-categories">
                    <BlockLayoutIndexSlotCategories/>
                </div>
                <div className="layout-index__slot-expose">
                    <BlockLayoutIndexSlotExpose/>
                </div>
                <div className="layout-index__slot-advantages">
                    <BlockLayoutIndexSlotAdvantages/>
                </div>
                <div className="layout-index__slot-finalize">
                    <BlockLayoutIndexSlotFinalize/>
                </div>
                {/* TODO: Переместить крутой футер в нормальное место */}
                <BlockFooter/>
            </div>
        );
    }
}

export default LayoutIndex;
