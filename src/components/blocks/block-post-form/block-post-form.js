import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import RouterStore from 'store/routes';

import Button from 'components/fragments/button/button';
import Input from 'components/fragments/input/input';
import Select from 'components/fragments/select/select';

import AjaxModule from 'services/ajax';
import { validate, FIELDS_TYPES, FILES_TYPES } from 'services/validation';

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
            showPrice: false, 
            disabledButton: false, 
            redirect: false,
            errors: {
                title: null,
                description: null,
                file: null,
                subscription: null,
                sum: null,
            }
        };
        this.handleSubscription = this.handleSubscription.bind(this);
        this.handleCreatePostClick = this.handleCreatePostClick.bind(this);
        this.handleSendFile = this.handleSendFile.bind(this);
        this._form = React.createRef();
    }

    componentDidMount() {
        AjaxModule.get(RouterStore.api.activities).then((data) => {
            this.setState({ activities: data || [] });
        }).catch((error) => {
            console.error(error.message);
        });

        AjaxModule.get(RouterStore.api.visible_types).then((data) => {
            this.setState({ visibleTypes: data || [] });
        }).catch((error) => {
            console.error(error.message);
        });

        AjaxModule.get(RouterStore.api.subscriptions.my).then((data) => {
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
        const { activities, visibleTypes, subscriptions, redirect, errors } = this.state;

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

        const teaserPlaceholder =  'Напишите тизер, чтобы пользователи, у которых ещё нет доступа к посту, могли понять о чём вы пишите. Используйте это краткое описание для привлечения новых подписчиков...(опционально)';
        
        if (redirect) {
            return <Redirect to={RouterStore.pages.collections} />;
        }
        return (
            <form ref={this._form} id="post_form">
                <div className="form__inputs">
                    <div className="form-input input-title">
                        <Input
                            label="Заголовок"
                            type={Input.types.text}
                            name="title"
                            placeholder="Добавьте заголовок"
                            error={errors.title}
                            isRequired={true}
                        />
                    </div>
                    <div className="form-input input-description">
                        <Input
                            label="Содержание"
                            type={Input.types.textarea}
                            name="description"
                            placeholder="Напишите что-нибудь..."
                            error={errors.description}
                            isRequired={true}
                        />
                    </div>
                    <div className="form-input input-teaser">
                        <Input label="Тизер" type={Input.types.textarea} name="teaser" placeholder={teaserPlaceholder}/>
                    </div>
                    <div className="form-input input-file">
                        <Input
                            label="Загрузите изображение"
                            fileTypes={FILES_TYPES}
                            text="Прикрепить изображение"
                            type={Input.types.file}
                            name="file"
                            id="file-input"
                            onAction={this.handleSendFile}
                            error={errors.file}
                        />
                    </div>
                </div>

                <div className="form__controls">
                    <div className="form-control control-button">    
                        <Button text="Опубликовать" type={Button.types.submit} name="createPost" isDisabled={this.state.isDisabled} onAction={this.handleCreatePostClick}/>
                    </div>
                    <div className="form-control control-select-visible">
                        <Select classValue='form-control__select' label="Уровень приватности поста" name="visibleTypes" actionType={Select.events.change} onAction={this.handleSubscription} values={visibleTypeSelect}/>
                    </div>
                    {errors.subscription && <span className="form-input__error no-subscriptions">{errors.subscription}</span>}
                    {this.state.showPrice && <div className="form-control control-price">
                        <label className='price-label'>Стоимость разовой оплаты поста</label>
                        <div className="control-price__input">
                            <Input
                                label="₽"
                                type={Input.types.number}
                                name="price"
                                min={16}
                                defaultValue={16}
                                error={errors.sum}
                            />
                        </div>
                        {errors.sum && <span className="form-input__error sum-error">{errors.sum}</span>}
                    </div>}
                    {this.state.showSubscriptions && <div className="form-control control-subscription">
                        <Select classValue='form-control__select' label="Выберите подпискy" name="subscription" values={subscriptionSelect}/>
                    </div>}
                    <div className="form-control control-select-activity">
                        <Select classValue='form-control__select' label="Категория деятельности" name="activity" values={activitySelect}/>
                    </div>
                </div>
            </form>
        );
    }

    handleSubscription = (event) => {
        const { subscriptions } = this.state;
        const visibleType = event.target[event.target.selectedIndex].value;
        if ((visibleType === '2' || visibleType === '3') && subscriptions.length === 0) {
            this.setState({
                errors: {
                    subscription: 'У вас нет ни одной подписки. Выбранная приватность сброшена'
                },
                showSubscriptions: true,
                showPrice: false,
            }, () => event.target.selectedIndex = 0);
            return;
        }

        this.setState({
            errors: {
                subscription: null
            }
        });

        if (visibleType !== '4') {
            this.setState({showSubscriptions: true});
        } else {
            this.setState({showSubscriptions: false});
        }

        if (visibleType === '3' || visibleType === '4') {
            this.setState({showPrice: true});
        } else {
            this.setState({showPrice: false});
        } 
    };

    handleSendFile() {
        const form = this._form.current;
        this.setState({
            errors: {
                file: validate(form.file?.files[0], FIELDS_TYPES.FILE),
            }
        }, this._makeFileRequest);
    }

    _makeFileRequest() {
        const { errors } = this.state;
        const form = this._form.current;
        const isFileInvalid = Boolean(errors.file);
        if (!isFileInvalid) {
            const reqBody = form.file.files[0];
            this.setState({isDisabled: Input.startLoader()}, this.checkDisabledButtonStyle);
            const data = new FormData();
            // TODO временно шлем ток картинки
            data.append('image', reqBody, reqBody.name);
            AjaxModule.doAxioPost(RouterStore.api.posts.file.new, data, 'multipart/form-data')
                .then((response) => {
                    if (response.data?.status) {
                        throw new Error(response.data?.message);
                    }
                    this.setState((prevState => ({
                        postIDs: [...prevState.postIDs, response.data]
                    })));
                    this.setState({isDisabled: Input.finishLoader(true)}, this.checkDisabledButtonStyle);
                })
                .catch((error) => {
                    console.log(error);
                    this.setState({
                        isDisabled: Input.finishLoader(),
                        errors: {
                            file: error.message,
                        }
                    }, this.checkDisabledButtonStyle);
                });
        }
    }

    checkDisabledButtonStyle = () => {
        const buttonSubmit = document.querySelector('div.form-control.control-button input');
        if (this.state.isDisabled) {
            buttonSubmit.classList.add('disabled');
        } else {
            buttonSubmit.classList.remove('disabled');
        }
    };

    handleCreatePostClick(event) {
        event.preventDefault();

        const form = this._form.current;
        this.setState({
            errors: {
                title: validate(form.title?.value, FIELDS_TYPES.TITLE),
                description: validate(form.description?.value, FIELDS_TYPES.CONTENT),
                sum: form.price ? validate(form.price?.value, FIELDS_TYPES.SUM) : 0,
            }
        }, this._makeRequest);
    }

    _makeRequest() {
        const { errors } = this.state;
        const form = this._form.current;
        const isFormValid = Array.from(Object.values(errors)).filter(error => Boolean(error)).length === 0;
        if (isFormValid) {
            const body = {
                title: form.title.value,
                description: form.description.value,
                teaser: form.teaser.value,
                subscription_id: form.subscription ?+form.subscription.options[form.subscription.selectedIndex].id : 0,
                sum: form.price ? +form.price.value : 0,
                visible_type_id: +form.visibleTypes.options[form.visibleTypes.selectedIndex].id,
                file_ids: this.state.postIDs,
                activity_id: +form.activity.options[form.activity.selectedIndex].id,
            };

            AjaxModule.doAxioPost(RouterStore.api.posts.new, body).then((response) => {
                if (response.status !== 201) {
                    throw new Error(response.data?.message || 'Не удалось создать пост');
                }
                this.setState({ redirect: true });
            }).catch((error) => {
                // TODO: нотифайку, что не удалось создать пост
                console.error(error.message);
            });
        }
    }
}

export default BlockPostForm;
