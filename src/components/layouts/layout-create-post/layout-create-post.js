import React, { Component } from 'react';

import BlockHeader from 'components/blocks/block-header/block-header';
import BlockPostForm from 'components/blocks/block-post-form/block-post-form';

import './create-post.scss';

class LayoutCreatePost extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {    
        return (
            <>
                <BlockHeader/>
                <div className="container">
                    <h3>Создание нового поста</h3>
                    <BlockPostForm />
                </div>
            </>
        );
    }
}

export default LayoutCreatePost;
