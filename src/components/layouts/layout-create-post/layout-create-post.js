import React, { Component } from 'react';
import RouterStore from 'store/routes';

import BlockHeader from 'components/blocks/block-header/block-header';
import Button from 'components/fragments/button/button';
import Input from 'components/fragments/input/input';
import Textarea from 'components/fragments/textarea/textarea';

import AjaxModule from 'services/ajax';

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
                    <h3>Новый пост</h3>
                    <form id="post_form">
                        <div className="form__inputs">
                            <div className="form-input input-title">
                                <Input label="Заголовок" type={Input.types.text} name="title" placeholder="Мой крутой заголовок"/>
                            </div>
                            <div className="form-input input-description">
                                <Textarea label="Содержание" name="description" placeholder="Мой крутой рассказ"/>
                            </div>
                            <div className="form-input input-file">
                                <Input label="Прикрепить файл" type={Input.types.file} name="file"/>
                            </div>
                        </div>

                        <div className="form__controls">
                            <div className="form-control control-button">    
                                <Button text="Опубликовать" type={Button.types.submit} onAction={this.handleCreatePostClick}/>
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

    showSubscriptionCategory(event) {
        const selectSubscription = document.getElementsByClassName('control-subscription-category')[0];
        if (event.target[event.target.selectedIndex].dataset.subscription === "true") {
            selectSubscription.style.display = "block";
        } else {
            selectSubscription.style.display = "none";
        }
    }

    handleCreatePostClick(event) {
        event.preventDefault();

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
}

export default LayoutCreatePost;

