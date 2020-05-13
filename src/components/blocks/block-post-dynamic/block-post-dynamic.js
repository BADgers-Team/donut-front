import React, { Component } from 'react';
import { PRIVACY } from 'store/const';
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';


import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw, ContentState  } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import embed from "embed-video";


import './block-post-dynamic.scss';

const BLUR_CLASS = 'post-dynamic__blur';

class BlockPostDynamic extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
            editorState: null,
        };
    }

    componentDidMount() {
        const { post } = this.props;
        if (!post.raw) return;

        const contentState = convertFromRaw(JSON.parse(post.raw));
        this.setState({ editorState: EditorState.createWithContent(contentState) });
    }

    onContentStateChange = (contentState) => {
        this.setState({ contentState: contentState});
    };

    render() {
        const { post, current } = this.props;
        const classes = ['post-dynamic'];
        if (post.visible_type !== PRIVACY.OPEN && !post.paid && !post.follows && current?.login !== post.author.login) {
            classes.push(BLUR_CLASS);
        }

        return (
            <div className={classes.join(' ')}>
                <div className="post-dynamic__description">
                <Editor
                    readOnly
                    toolbarHidden={true}
                    editorState={this.state.editorState}
                    wrapperClassName="post-dynamic__description"
                />
                    {/* {post.description} */}
                </div>
                {post.files && (
                    <div className="post-dynamic__files">
                        {/* <Carousel dynamicHeight={false} className="post-dynamic__carousel" showArrows={true} useKeyboardArrows={true} showIndicators={false} emulateTouch={true}> */}
                            {post.files.map((imgSrc, index) => {
                                if (imgSrc.substr(53) === 'undefined') return;
                                return <a className="post-dynamic__image" target="_blank" rel="noopener noreferrer" key={index} href={imgSrc}>{imgSrc.substr(53)}</a>
                            })} 
                        {/* </Carousel> */}
                    </div>
                )}
            </div>
        );
    }
}

export default BlockPostDynamic;
