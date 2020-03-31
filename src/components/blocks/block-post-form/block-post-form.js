import React, { Component } from 'react';
import RouteStore from 'store/routes';

import Button from 'components/fragments/button/button';
import Input from 'components/fragments/input/input';
import Select from 'components/fragments/select/select';

import AjaxModule from 'services/ajax';

import './block-post-from.scss';

class BlockPostForm extends Component {
    constructor(props) {
        super(props);
      
        this.state = { 
            postIDs: [], 
            activities: [],
            subscriptions: [],
            visibleTypes: [],
            showSubscriptions: true, 
            disabledButton: false 
        };
        this.handleSubscription = this.handleSubscription.bind(this);
        this.handleCreatePostClick = this.handleCreatePostClick.bind(this);
        this.handleSendFile = this.handleSendFile.bind(this);
        this._form = React.createRef();
    }

    componentDidMount() {
        AjaxModule.get(RouteStore.api.activities).then((data) => {
            this.setState({ activities: data || [] });
        }).catch((error) => {
            console.error(error.message);
        });

        AjaxModule.get(RouteStore.api.visible_types).then((data) => {
            this.setState({ visibleTypes: data || [] });
        }).catch((error) => {
            console.error(error.message);
        });

        AjaxModule.get(RouteStore.api.subscriptions.my).then((data) => {
            let tempData = data || [];
            const defaultItem = {
                id: 0, value:'0', title:'Без подписки'
            };
            tempData.splice(0, 0, defaultItem);
            this.setState({ subscriptions: tempData });
        }).catch((error) => {
            console.error(error.message);
        });
    }
    
    render() {
        const { activities, visibleTypes, subscriptions } = this.state;

        const visibleTypeSelect = visibleTypes.map((type) => {
            return {
                id: type.id,
                value: type.id.toString(),
                text: type.title,
            };
        });
        const subscriptionSelect = subscriptions.map((subscription) => {
            return {
                id: subscription.id,
                value: subscription.id.toString(),
                text: subscription.title,
            };
        });
        const activitySelect = activities.map((activity) => {
            return {
                id: activity.id,
                value: activity.id.toString(),
                text: activity.label,
            };
        });

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
                        <Input label="Загрузите изображение" text="Прикрепить изображение" type={Input.types.file} name="file" id="file-input" onAction={this.handleSendFile}/>
                    </div>
                </div>

                <div className="form__controls">
                    <div className="form-control control-button">    
                        <Button text="Опубликовать" type={Button.types.submit} isDisabled={this.state.isDisabled} onAction={this.handleCreatePostClick}/>
                    </div>
                    <div className="form-control control-select-visible">
                        <Select label="Уровень приватности поста" name="visibleTypes" actionType={Select.events.change} onAction={this.handleSubscription} values={visibleTypeSelect}/>
                    </div>
                    {this.state.showSubscriptions && <div className="form-control control-subscription">
                        <Select label="Выберите подпискy" name="subscription" values={subscriptionSelect}/>
                    </div>}
                    <div className="form-control control-select-activity">
                        <Select label="Категория деятельности" name="activity" values={activitySelect}/>
                    </div>
                </div>
            </form>
        );
    }

    handleSubscription(event) {
        if (event.target[event.target.selectedIndex].value !== "4") {
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
                    console.log(this.state.postIDs);
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
            subscription_id: form.subscription ? parseInt(form.subscription.options[form.subscription.selectedIndex].id, 10) : null,
            visible_type_id: parseInt(form.visibleTypes.options[form.visibleTypes.selectedIndex].id, 10),
            file_ids: this.state.postIDs,
            activity_id: parseInt(form.activity.options[form.activity.selectedIndex].id, 10),
        };

        AjaxModule.post(RouterStore.api.posts.new, reqBody);
    }
}

export default BlockPostForm;
