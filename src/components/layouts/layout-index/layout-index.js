import React, { Component } from 'react';

import BlockActivities from 'components/blocks/block-activities/block-activities';
import BlockCards from 'components/blocks/block-cards/block-cards';

class LayoutIndex extends Component {
    render() {
        return (
            <>
                <BlockActivities/>
                <BlockCards/>
            </>
        );
    }
}

export default LayoutIndex;
