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
      
    }


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
                    editorState={!post.raw ? null : EditorState.createWithContent(convertFromRaw(JSON.parse(post.raw)))}
                    wrapperClassName="post-dynamic__description"
                />
                    {/* {post.description} */}
                </div>
                {post.files && (
                    <div className="post-dynamic__files">
                        {/* <Carousel dynamicHeight={false} className="post-dynamic__carousel" showArrows={true} useKeyboardArrows={true} showIndicators={false} emulateTouch={true}> */}
                            {post.files.map((imgSrc, index) => {
                                const url = location.protocol + '//'+location.host + '/static/';
                                const pathLenWithoutName = url.length + 14 + 10;
                                if (imgSrc.substr(pathLenWithoutName) === 'undefined') return;
                                return <a className="post-dynamic__image" target="_blank" rel="noopener noreferrer" key={index} href={imgSrc}>{imgSrc.substr(53)}</a>
                            })} 
                        {/* </Carousel> */}
                    </div>
                )}


                {post.full_files && (
                    <div className="post-dynamic__music">
                        {post.full_files.map((audio, index) => {
                            if (audio.mimetype === 'audio/mpeg')
                                return <audio className="post-dynamic__audio" key={index} src={audio.link} controls />
                        })} 
                    </div>
                )}

            </div>
        );
    }
}

export default BlockPostDynamic;
