import React, { Component } from 'react';
import { inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import BlockPostForm from 'components/blocks/block-post-form/block-post-form';
import BlockNoWalletModal from 'components/blocks/block-no-wallet-modal/block-no-wallet-modal';

import './layout-create-post.scss';

@inject('user')
class LayoutCreatePost extends Component {
    constructor(props) {
        super(props);

        const {user} = this.props;
        this.state = {
            isModalOpen: user.is_wallet !== null && !user.is_wallet,
        };
    }

    componentDidUpdate(prevProps) {
        const {user} = this.props;
        if (prevProps.user.is_wallet !== user.is_wallet) {
            this.setState({ isModalOpen: !user.is_wallet });
        }
    }

    onModalClose = () => {
        this.setState({
            isModalOpen: false,
        });
    }

    get isModeEditing() {
        return this.props.history.location.state?.editing;
    }

    render() {
        const { isModeEditing } = this;
        const { isModalOpen } = this.state;
        const { showToast } = this.props;

        const title = isModeEditing ? 'Редактирование поста' : 'Создание нового поста';
        return (
            <div className="post-container">
                <div className="post-header">{title}</div>
                <BlockPostForm editingPost={isModeEditing} showToast={showToast}/>
                {!isModeEditing && isModalOpen && <BlockNoWalletModal open={isModalOpen} onClose={this.onModalClose}/>}
            </div>
        );
    }
}

export default withRouter(LayoutCreatePost);
