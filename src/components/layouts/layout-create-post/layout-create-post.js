import React, { Component } from 'react';
import RouterStore from 'store/routes';

import BlockHeader from 'components/blocks/block-header/block-header';
import Button from 'components/fragments/button/button';
import Input from 'components/fragments/input/input';
import Textarea from 'components/fragments/textarea/textarea';
import Select from 'components/fragments/select/select';

import AjaxModule from 'services/ajax';

import './create-post.scss';

class LayoutCreatePost extends Component {
    constructor(props) {
        super(props);

        this.state = { showSubscription: false };
        this.showSubscriptionCategory = this.showSubscriptionCategory.bind(this);
        this.handleCreatePostClick = this.handleCreatePostClick.bind(this);
        this._form = React.createRef();
    }
    
    render() {    
        const subscriptionSelect = {
            "For all": "Открыт для всех",
            "Subscribers": "Только по подписке",
            "Subscribers and one time": "Для подписчиков и разовая оплата",
            "One time": "Только разовая оплата",
        }; 
        const subscriptionCategorySelect = {
            "1": "Подписка 1",
            "2": "Подписка 2",
        }; 
        const activitySelect = {
            "Art": "Живопись",
            "Photography": "Фотография",
            "Music": "Музыка",
            "Blog": "Блог",
            "Writing": "Писательство",
        };
        return (
            <>
                <BlockHeader/>
                <div className="container">
                    <h3>Новый пост</h3>
                    <form ref={this._form} id="post_form">
                        <div className="form__inputs">
                            <div className="form-input input-title">
                                <Input label="Заголовок" type={Input.types.text} name="title" placeholder="Добавьте заголовок"/>
                            </div>
                            <div className="form-input input-description">
                                <Textarea label="Содержание" name="description" placeholder="Напишите что-нибудь..."/>
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
                                <Select label="Кто может просматривать пост" actionType={Select.events.change} onAction={this.showSubscriptionCategory} values={subscriptionSelect}/>
                            </div>
                            <div className="form-control control-subscription-category">
                                {this.state.showSubscription && <Select label="Выберите подписку" values={subscriptionCategorySelect}/> }
                            </div>
                            <div className="form-control control-select-activity">
                                <Select label="Категория деятельности" values={activitySelect}/>
                            </div>
                        </div>
                    </form>
                </div>
            </>
        );
    }

    showSubscriptionCategory(event) {
        const subscription = "Subscribers";
        const optionValue = event.target[event.target.selectedIndex].value;
        if (optionValue.indexOf(subscription) !== -1) {
            this.setState({showSubscription: true});
        } else {
            this.setState({showSubscription: false});
        }
        
    }

    handleCreatePostClick(event) {
        event.preventDefault();

        const form = this._form.current;

        let reqBody = {};

        reqBody.title = form.title.value;
        reqBody.description = form.description.value;
        //TODO договориться с беком о значениях
        reqBody.subscription_category_id = 1;
        reqBody.visible_type_id = 1;
        reqBody.category_id = 1;

        // reqBody.file = form.file.value; //TODO отдельным запросом 

        AjaxModule.post(RouterStore.api.posts.new, reqBody)
    }
}

export default LayoutCreatePost;

