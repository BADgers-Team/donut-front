import React, { Component } from 'react';
import { PRIVACY } from 'store/const';
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';


import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw, ContentState  } from 'draft-js';
import { Link } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import embed from "embed-video";


import './block-post-dynamic.scss';

const BLUR_CLASS = 'post-dynamic__blur';

class BlockPostDynamic extends Component {
    constructor(props) {
        super(props);      
    }

    componentDidMount() {
        // wysiwyg editorы оставляют мусор в виде пустых дивов, поэтому чищу 
        const postDescription = document.querySelector('.post-dynamic__description');
        const blocks = postDescription.querySelectorAll('[data-text]');

        blocks.forEach(v => {
            if (v.innerHTML.trim() === '') v.remove();
        });
    }


    render() {
        const { post, current } = this.props;
        const classes = ['post-dynamic'];
        if (post.visible_type !== PRIVACY.OPEN && !post.paid && !post.follows && current?.login !== post.author.login) {
            classes.push(BLUR_CLASS);
        }

        const isAudios = Boolean(post.full_files && post.full_files.find(file => file.mimetype === 'audio/mpeg'));

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
                { post.full_files && post.full_files.length > 0 && isAudios && (
                    <div className="post-dynamic__music">
                        {post.full_files.map((audio, index) => {
                            if (audio.mimetype === 'audio/mpeg' && audio.link !== '')
                                return <audio className="post-dynamic__audio" key={index} src={audio.link} controls />
                        })} 
                    </div>
                ) }
                {post.full_files && post.full_files.length > 0 && (
                    <div className="post-dynamic__files">
                        {post.full_files.map((file, index) => {
                            if (file.file_name === 'undefined') {
                                return;
                            }
                            if (file.mimetype !== 'audio/mpeg' && file.link !== '')
                                return <a className="post-dynamic__files-link" target="_blank" rel="noopener noreferrer" key={index} href={file.link}>{file.file_name}</a>
                        })} 
                    </div>
                )}

            </div>
        );
    }
}

export default BlockPostDynamic;
