import React, { Component } from 'react';
import BlockPostForm from 'components/blocks/block-post-form/block-post-form';

class LayoutCreatePost extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {    
        return (
            <div className="container">
                <h3>Создание нового поста</h3>
                <BlockPostForm />
            </div>
        );
    }
}

export { LayoutCreatePost };
