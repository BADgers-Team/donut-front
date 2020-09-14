import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import BlockPostForm from 'components/blocks/block-post-form/block-post-form';

import './layout-create-post.scss';

class LayoutCreatePost extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const { history, showToast } = this.props;
        const editingPost = history.location.state?.editing;

        const title = editingPost ? 'Редактирование поста' : 'Создание нового поста';
        return (
            <div className="post-container">
                <div className="post-header">{title}</div>
                <BlockPostForm editingPost={editingPost} showToast={showToast}/>
            </div>
        );
    }
}

export default withRouter(LayoutCreatePost);
