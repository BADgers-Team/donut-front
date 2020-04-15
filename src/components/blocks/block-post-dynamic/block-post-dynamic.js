import React, { Component } from 'react';
import { PRIVACY } from 'store/const';
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';


import './block-post-dynamic.scss';

const BLUR_CLASS = 'post-dynamic__blur';

class BlockPostDynamic extends Component {
    render() {
        const { post, current } = this.props;
        const classes = ['post-dynamic'];
        if (post.visible_type !== PRIVACY.OPEN && !post.paid && !post.follows && current?.login !== post.author.login) {
            classes.push(BLUR_CLASS);
        }

        return (
            <div className={classes.join(' ')}>
                <div className="post-dynamic__description">
                    {post.description}
                </div>
                {post.files && (
                    <div className="post-dynamic__files">
                        <Carousel dynamicHeight={false} className="post-dynamic__carousel" showArrows={true} useKeyboardArrows={true} showIndicators={false} emulateTouch={true}>
                            {post.files.map((imgSrc, index) => {
                                return <img className="post-dynamic__image" key={index} src={imgSrc} />
                            })} 
                        </Carousel>
                    </div>
                )}
            </div>
        );
    }
}

export default BlockPostDynamic;
