import React, { Component } from 'react';
import RouterStore from 'store/routes';

import Button from 'components/fragments/button/button';
import Input from 'components/fragments/input/input';
import Select from 'components/fragments/select/select';

import AjaxModule from 'services/ajax';

import './block-post-from.scss';

class BlockPostForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = { postIDs: [], showSubscriptions: true, disabledButton: false };
        this.handleSubscriptionCategory = this.handleSubscriptionCategory.bind(this);
        this.handleCreatePostClick = this.handleCreatePostClick.bind(this);
        this.handleSendFile = this.handleSendFile.bind(this);
        this._form = React.createRef();
    }
    
    render() {
        //TODO get this data from back
        const subscriptionSelect = [
            {id: 1, value:'For all', text:'Открыт для всех'},
            {id: 2, value:'Subscribers', text: 'Только по подписке'},
            {id: 3, value:'Subscribers and one time', text: 'Для подписчиков и разовая оплата'},
            {id: 4, value:'One time', text: 'Только разовая оплата'},
        ]; 
        const subscriptionCategorySelect = [
            {id: 1, value:'Без подписки', text:'Без подписки'},
            {id: 2, value:'Подписка 1', text:'Подписка 1'},
        ]; 
        const activitySelect = [
            {id: 1, value:'All', text: 'Все'},
            {id: 2, value:'Art', text: 'Живопись'},
            {id: 3, value:'Photography', text: 'Фотография'},
            {id: 4, value:'Music', text: 'Музыка'},
            {id: 5, value:'Blog', text: 'Блог'},
            {id: 6, value:'Writing', text: 'Писательство'},
        ];
        return (
            <form ref={this._form} id="post_form">
                <div className="form__inputs">
                    <div className="form-input input-title">
                        <Input label="Заголовок" type={Input.types.text} name="title" placeholder="Добавьте заголовок"/>
                    </div>
                    <div className="form-input input-description">
                        <Input label="Содержание" type={Input.types.textarea} name="description" placeholder="Напишите что-нибудь..."/>
                    </div>
                    <div className="form-input input-file">
                        <Input label="Загрузите файл" type={Input.types.file} name="file" id="file-input" onAction={this.handleSendFile}/>
                    </div>
                </div>

                <div className="form__controls">
                    <div className="form-control control-button">    
                        <Button text="Опубликовать" type={Button.types.submit} isDisabled={this.state.isDisabled} onAction={this.handleCreatePostClick}/>
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
        if (event.target[event.target.selectedIndex].value !== "One time") {
            this.setState({showSubscriptions: true});
        } else {
            this.setState({showSubscriptions: false});
        } 
    }

    handleSendFile() {
        const form = this._form.current;
        const reqBody = form.file ? form.file.files[0] : null;
        if (reqBody) {
            this.setState({isDisabled: Input.startLoader()});
            const data = new FormData();
            data.append('image', reqBody, reqBody.name);  
            AjaxModule.post(RouterStore.api.posts.file.new, data, 'multipart/form-data')
                .then((response) => {
                    this.setState((prevState => ({
                        postIDs: [...prevState.postIDs, response]
                      })));
                    this.setState({isDisabled: Input.finishLoader()});
                });
        }
    }

    handleCreatePostClick(event) {
        event.preventDefault();

        const form = this._form.current;
        let reqBody = {
            title: form.title.value,
            description: form.description.value,
            subscription_category_id: form.subscriptionCategory ? parseInt(form.subscriptionCategory.options[form.subscriptionCategory.selectedIndex].id, 10) : null,
            visible_type_id: parseInt(form.visibleTypes.options[form.visibleTypes.selectedIndex].id, 10),
            file_ids: this.state.postIDs,
            activity_id: parseInt(form.activity.options[form.activity.selectedIndex].id, 10),
        };

        AjaxModule.post(RouterStore.api.posts.new, reqBody);
    }
}

export default BlockPostForm;
