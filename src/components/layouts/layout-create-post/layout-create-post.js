import React, { Component } from 'react';
import RouterStore from 'store/routes';

import BlockHeader from 'components/blocks/block-header/block-header';
import Button from 'components/fragments/button/button';

import AjaxModule from 'services/ajax';

import './create-post.scss';

class LayoutCreatePost extends Component {
    showSubscriptionCategory(event) {
        const selectSubscription = document.getElementsByClassName('control-subscription-category')[0];
        if (event.target[event.target.selectedIndex].dataset.subscription === "true") {
            selectSubscription.style.display = "block";
        } else {
            selectSubscription.style.display = "none";
        }
    }

    createPost(e) {
        e.preventDefault();

        const form = document.getElementById('post_form');

        let reqBody = {};

        reqBody.title = form.title.value;
        reqBody.description = form.description.value;
        //TODO take norm values
        reqBody.subscription_category_id = 1;
        reqBody.visible_type_id = 1;
        // reqBody.category_id = 1;
        // reqBody.file = form.file.value; //TODO отдельным запросом 

        AjaxModule.post(RouterStore.api.posts.new, reqBody);
    }

    render() {
        return (
            <>
                <BlockHeader/>
                <div className="container">
                    <h3>Новый пост</h3>
                    <form id="post_form">
                        <div className="form__inputs">
                            <div className="form-input input-title">
                                <label>Заголовок</label>
                                <input type="text" name="title"/>
                            </div>
                            <div className="form-input input-description">
                                <label>Содержание</label>
                                <textarea type="text" name="description"/>
                            </div>
                            <div className="form-input input-file">
                                <label>Прикрепить файл</label>
                                <input type="file" name="file"/>
                            </div>
                        </div>

                        <div className="form__controls">
                            <div className="form-control control-button">
                                <button onClick={this.createPost} type="button">Опубликовать</button>
                            </div>
                            <div className="form-control control-select-visible">
                                <label>Кто может просматривать пост</label>
                                <select onChange={this.showSubscriptionCategory}>
                                    <option value="For all">Открыт для всех</option>
                                    <option value="Subscribers" data-subscription="true">Только по подписке</option>
                                    <option value="Subscribers and one time" data-subscription="true">Для подписчиков и разовая оплата</option>    
                                    <option value="One time">Только разовая оплата</option>
                                </select>
                            </div>
                            <div className="form-control control-subscription-category">
                                <label>Выберите подписку</label>
                                <select>
                                    <option>Подписка 1</option>
                                    <option>Подписка 2</option> 
                                </select>
                            </div>
                            <div className="form-control control-select-activity">
                                <label>Категория деятельности</label>
                                <select>
                                    <option value="Art">Живопись</option>
                                    <option value="Photography">Фотография</option>
                                    <option value="Music">Музыка</option>  
                                    <option value="Blog">Блог</option>  
                                    <option value="Writing">Писательство</option>     
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
            </>
        );
    }
}


export default LayoutCreatePost;

