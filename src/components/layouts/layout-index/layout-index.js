import React, { Component } from 'react';
import AjaxModule from '../../../services/ajax';
import RouterStore from 'store/routes';

class LayoutIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        };
        AjaxModule.get(RouterStore.api.posts.all).then((data) => {
            const posts = data ? data : [];
            this.setState({ posts });
        });
    }

    render() {
        console.log(this.state);
        const postsNode = this.state.posts.map((post, index) => {
            return <div key={index}>{post.title}</div>;
        });

        return (
            <>
                <div>Все посты</div>
                { postsNode }
            </>
        );
    }
}

export default LayoutIndex;
