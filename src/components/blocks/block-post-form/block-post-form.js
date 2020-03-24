import React, { Component } from 'react';
import RouterStore from 'store/routes';

import Button from 'components/fragments/button/button';
import Input from 'components/fragments/input/input';
import Textarea from 'components/fragments/textarea/textarea';
import FileInput from 'components/fragments/file-input/file-input';
import Select from 'components/fragments/select/select';

import AjaxModule from 'services/ajax';

import './block-post-from.scss';

class BlockPostForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = { showSubscriptions: false };
        this.handleSubscriptionCategory = this.handleSubscriptionCategory.bind(this);
        this.handleCreatePostClick = this.handleCreatePostClick.bind(this);
        this.handleSendFile = this.handleSendFile.bind(this);
        this._form = React.createRef();
    }
    
    render() {
        //TODO get this data from back
        const subscriptionSelect = {
            'For all': 'Открыт для всех',
            'Subscribers': 'Только по подписке',
            'Subscribers and one time': 'Для подписчиков и разовая оплата',
            'One time': 'Только разовая оплата',
        }; 
        const subscriptionCategorySelect = {
            '1': 'Подписка 1',
            '2': 'Подписка 2',
        }; 
        const activitySelect = {
            'Art': 'Живопись',
            'Photography': 'Фотография',
            'Music': 'Музыка',
            'Blog': 'Блог',
            'Writing': 'Писательство',
        };
        return (
            <form ref={this._form} id="post_form">
                <div className="form__inputs">
                    <div className="form-input input-title">
                        <Input label="Заголовок" type={Input.types.text} name="title" placeholder="Добавьте заголовок"/>
                    </div>
                    <div className="form-input input-description">
                        <Textarea label="Содержание" name="description" placeholder="Напишите что-нибудь..."/>
                    </div>
                    <div className="form-input input-file">
                        <FileInput label="Загрузите файл" name="file" id="file-input" onAction={this.handleSendFile}/>
                    </div>
                </div>

                <div className="form__controls">
                    <div className="form-control control-button">    
                        <Button text="Опубликовать" type={Button.types.submit} onAction={this.handleCreatePostClick}/>
                    </div>
                    <div className="form-control control-select-visible">
                        <Select label="Уровень приватности поста" name="visibleTypes" actionType={Select.events.change} onAction={this.handleSubscriptionCategory} values={subscriptionSelect}/>
                    </div>
                    {this.state.showSubscriptions && <div className="form-control control-subscription-category">
                        <Select label="Выберите категорию подписки" name="subscriptionCategory" values={subscriptionCategorySelect}/>
                    </div>}
                    <div className="form-control control-select-activity">
                        <Select label="Категория деятельности" name="activity" values={activitySelect}/>
                    </div>
                </div>
            </form>
        );
    }

    handleSubscriptionCategory(event) {
        const subscription = 'Subscribers';
        if (event.target[event.target.selectedIndex].value === undefined) return;
        const selectedSubscription = event.target[event.target.selectedIndex].value;
        if (selectedSubscription.indexOf(subscription) !== -1) {
            this.setState({showSubscriptions: true});
        } else {
            this.setState({showSubscriptions: false});
        } 
    }

    handleSendFile() {
        const form = this._form.current;
        const reqBody = form.file ? form.file.files[0] : null;
        if (reqBody) {
            const data = new FormData();
            data.append('image', reqBody, reqBody.name);  
            AjaxModule.post(RouterStore.api.posts.file.new, data, 'multipart/form-data');
        }
    }

    handleCreatePostClick(event) {
        event.preventDefault();

        const form = this._form.current;
        let reqBody = {
            title: form.title.value,
            description: form.description.value,
            subscription_category_id: form.subscriptionCategory ? form.subscriptionCategory.value : null,
            visible_type_id: form.visibleTypes.value,
            category_id: form.activity.value,
        };

        console.log(reqBody);

        AjaxModule.post(RouterStore.api.posts.new, reqBody);
    }
}

export default BlockPostForm;
