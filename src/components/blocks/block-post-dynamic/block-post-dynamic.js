import React, { Component } from 'react';

import './block-post-dynamic.scss';

class BlockPostDynamic extends Component {
    render() {
        const { post } = this.props;
        return (
            <div className="post-dynamic">
                <div className="post-dynamic__description">
                    {post.description}
                </div>
                <div className="post-dynamic__files">

                </div>
            </div>
        );
    }
}

export default BlockPostDynamic;
