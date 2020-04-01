import React, { Component } from 'react';
import BlockPostForm from 'components/blocks/block-post-form/block-post-form';

import './layout-create-post.scss';

class LayoutCreatePost extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {    
        return (
            <div className="post-container">
                <div className="post-header">Создание нового поста</div>
                <BlockPostForm />
            </div>
        );
    }
}

export default LayoutCreatePost;
