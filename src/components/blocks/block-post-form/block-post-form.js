import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
import {EditorState, convertToRaw, convertFromRaw} from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';

import Button from 'components/fragments/button/button';
import Input from 'components/fragments/input/input';
import Select from 'components/fragments/select/select';
import { TOAST_TYPES } from 'components/fragments/toast/toast';
import { Embedded, Content } from './block-media';
import { MusicToolbarButton } from './block-music-editor-butt';

import AjaxModule from 'services/ajax';
import { validate, FIELDS_TYPES, FILES_TYPES, ERROR_TYPES } from 'services/validation';
import { getRouteWithID } from 'services/getRouteWithId';
import RouterStore from 'store/routes';

import embeddedIcon from 'assets/img/video.svg';

import './block-post-from.scss';

@inject('post')
@observer
class BlockPostForm extends Component {
    constructor(props) {
        super(props);

        const editorState = props.editingPost && props.editingPost.raw
            ? EditorState.createWithContent(convertFromRaw(JSON.parse(props.editingPost.raw)))
            : EditorState.createEmpty();

        this.state = { 
            fileIDs: [], 
            postID: 0, 
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
            },
            editorState,
            fileLoaded: null,
            fileContent: null
        };
        this.handleSubscription = this.handleSubscription.bind(this);
        this.handleCreatePostClick = this.handleCreatePostClick.bind(this);
        this.handleSendFile = this.handleSendFile.bind(this);
        this._form = React.createRef();
    }

    uploadImageCallBack = (file) => {
        return new Promise(
            (resolve, reject) => {
                const reader = new FileReader();
                reader.onload = e => resolve({ data: { link: e.target.result } });
                reader.onerror = e => reject(e);
                reader.readAsDataURL(file);
            });
    };

    YouTubeGetID = (url) => {
        let ID = '';
        url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);

        if(url[2] !== undefined) {
            ID = url[2].split(/[^0-9a-z_]/i);
            ID = ID[0];
        }
        else {
            ID = url;
        }

        return ID;
    };

    componentDidMount() {
        const { history, showToast } = this.props;
        const editingPost = history.location.state?.editing;

        AjaxModule.get(RouterStore.api.activities).then((data) => {
            this.setState({ activities: data || [] });
        }).catch((error) => {
            showToast({ type: TOAST_TYPES.ERROR });
            console.error(error.message);
        });

        if (!editingPost) {
            AjaxModule.get(RouterStore.api.visible_types).then((data) => {
                this.setState({ visibleTypes: data || [] });
            }).catch((error) => {
                showToast({ type: TOAST_TYPES.ERROR });
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
                showToast({ type: TOAST_TYPES.ERROR });
                console.error(error.message);
            });
        }
    }

    onEditorStateChange = (editorState) => {
        this.setState({editorState});
    };

    mediaBlockRenderer = (block) => {
        if (block.getType() === 'atomic') {

            const contentState = this.state.editorState.getCurrentContent();
            const entityKey = block.getEntityAt(0);
            if (entityKey) {
                const entity = contentState.getEntity(entityKey);
                if (entity
                && (entity.type === 'EMBEDDED_LINK')
                ) {
                    return {
                        component: Embedded,
                        editable: false
                    };
                }
            }    

            return {
                component: this.Media,
                editable: false,
            };
        }
      
        return null;
    };

    Media = (props) => {
        const entity = props.contentState.getEntity(
            props.block.getEntityAt(0)
        );
        const type = entity.getType().toLowerCase();
        const { editingPost, match: { params } } = this.props;
        const postId = editingPost ? params.id : null;

        return (
            <Content
                editor={props}
                postId={postId}
                type={type}
                showToast={props.showToast}
            />
        );
    };
    
    render() {    
        const { activities, visibleTypes, subscriptions, redirect, errors, postID, editorState } = this.state;

        const { editingPost } = this.props;

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
        const postRoute = getRouteWithID(RouterStore.api.posts.id, postID);
        const buttonText = editingPost ? 'Сохранить' : 'Опубликовать';
        if (redirect) {
            return <Redirect to={postRoute} />;
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
                            defaultValue={editingPost?.title || ''}
                            isRequired={true}
                        />
                    </div>
                    <div className="form-input input-description">
                        <label className="textarea-label">Содержание<span style={{color: 'red'}}> *</span></label>
                        <Editor
                            blockRendererFn={this.mediaBlockRenderer}
                            editorState={editorState}
                            wrapperClassName={`form-input input-description ${Boolean(errors.description) ? 'input-error' : ''}`}
                            editorClassName="input-description__editor"
                            onEditorStateChange={this.onEditorStateChange}
                            placeholder = 'Напишите что-нибудь...'
                            toolbar={{
                                options: ['emoji', 'link', 'embedded', 'image', 'history'],
                                image: { 
                                    uploadCallback: this.uploadImageCallBack, 
                                    previewImage: true,
                                    urlEnabled: false, 
                                    inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',   
                                    defaultSize: {
                                        height: 'auto',
                                        width: '100%',
                                    },
                                },
                                link: {
                                    linkCallback: params => ({ ...params }),
                                    options: ['link'],
                                },
                                embedded: {
                                    icon: embeddedIcon,  
                                    embedCallback: link => {
                                        if (link.match('https://vimeo.com/')) {
                                            let videoID = link.split('https://vimeo.com/');
                                            videoID = videoID[1].split('#')[0];
                                            return 'https://player.vimeo.com/video/' + videoID;
                                        }

                                        if (link.indexOf('youtube') >= 0 || link.indexOf('youtu.be') >= 0){
                                            // link = link.replace('watch?v=','embed/');
                                            // link = link.replace('/watch/', '/embed/');
                                            // link = link.replace('youtu.be/','youtube.com/embed/');
                                            // link = link.replace('&feature=youtu.be','');

                                            let video_id = this.YouTubeGetID(link);
                                            link = 'https://www.youtube.com/embed/' + video_id;
                                        }

                                        return link;
                                    }
                                }
                                
                            }}
                            localization={{
                                locale: 'ru',
                            }}

                            toolbarCustomButtons={[<MusicToolbarButton onChange={this.setEditorState}/>]}
                        /> 
                    </div>
                    {errors && <span className="form-input__error">{errors.description}</span>}                      
                    <div className="form-input input-teaser">
                        <Input
                            label="Тизер"
                            type={Input.types.textarea}
                            name="teaser"
                            placeholder={teaserPlaceholder}
                            defaultValue={editingPost?.teaser || ''}
                        />
                    </div>
                    <div className="form-input input-file">
                        <Input
                            label="Загрузите файл"
                            fileTypes={FILES_TYPES}
                            text="Прикрепить файл"
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
                        <Button text={buttonText} type={Button.types.submit} name="createPost" isDisabled={this.state.isDisabled} onAction={this.handleCreatePostClick}/>
                    </div>
                    {visibleTypeSelect.length > 0 && (
                        <div className="form-control control-select-visible">
                            <Select
                                classValue='form-control__select'
                                label="Уровень приватности поста"
                                name="visibleTypes"
                                actionType={Select.events.change}
                                onAction={this.handleSubscription}
                                values={visibleTypeSelect}
                            />
                        </div>
                    )}
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
                    {this.state.showSubscriptions && subscriptionSelect.length > 0 && (
                        <div className="form-control control-subscription">
                            <Select classValue='form-control__select' label="Выберите подпискy" name="subscription" values={subscriptionSelect}/>
                        </div>
                    )}
                    <div className="form-control control-select-activity">
                        <Select classValue='form-control__select' label="Категория деятельности" name="activity" values={activitySelect} selected={editingPost?.activity}/>
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
        const { post } = this.props;
        const { errors } = this.state;
        const form = this._form.current;
        const isFileInvalid = Boolean(errors.file);
        if (!isFileInvalid) {
            const reqBody = form.file.files[0];
            this.setState({isDisabled: Input.startLoader()}, this.checkDisabledButtonStyle);
            const data = new FormData();
            data.append('image', reqBody, reqBody.name);
            AjaxModule.doAxioPost(RouterStore.api.posts.file.new, data, 'multipart/form-data')
                .then((response) => {
                    if (response.data?.status) {
                        throw new Error(response.data?.message);
                    }
                    const filesIDS = post.file_ids && post.file_ids.length > 0 ? post.file_ids : [];
                    filesIDS.push(response.data.id);

                    const obj = {
                        file_ids: filesIDS,
                    };
                    post.update(obj);
                    
                    this.setState((prevState => ({
                        fileIDs: [...prevState.fileIDs, response.data]
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

    setEditorState = (state) => {
        this.setState({ editorState: state });
    };

    handleCreatePostClick(event) {
        event.preventDefault();
        const editorState = this.state.editorState;
        const { history } = this.props;
        const editingPost = history.location.state?.editing;

        const blocks = convertToRaw(editorState.getCurrentContent()).blocks;

        const form = this._form.current;
        // let rawFull = convertToRaw(editorState.getCurrentContent()); 
        // Object.keys(rawFull.entityMap).filter(key => rawFull.entityMap[key].type === 'audio').forEach(key => rawFull.entityMap[key].data.src = '');
        form.raw = JSON.stringify(convertToRaw(editorState.getCurrentContent()));

        form.description = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
        this.setState({
            errors: {
                title: validate(form.title?.value, FIELDS_TYPES.TITLE),
                // description: validate(form.description, FIELDS_TYPES.CONTENT),
                description: !validate(form.description.trim(), FIELDS_TYPES.CONTENT) || editorState.getCurrentContent().hasText() ? null : ERROR_TYPES.REQUIRED,
                sum: form.price ? validate(form.price?.value, FIELDS_TYPES.SUM) : null,
            }
        }, editingPost ? this._makePatchRequest : this._makeCreateRequest);
    }

    _makeCreateRequest() {
        const { errors } = this.state;
        const { post, showToast } = this.props;
        const form = this._form.current;
        const isFormValid = Array.from(Object.values(errors)).filter(error => Boolean(error)).length === 0;
        if (isFormValid) {
            const body = {
                title: form.title.value,
                description: form.description,
                teaser: form.teaser.value,
                subscription_id: form.subscription ?+form.subscription.options[form.subscription.selectedIndex].id : 0,
                sum: form.price ? +form.price.value : 0,
                visible_type_id: +form.visibleTypes.options[form.visibleTypes.selectedIndex].id,
                file_ids: toJS(post.file_ids),
                activity_id: +form.activity.options[form.activity.selectedIndex].id,
                raw: form.raw,
            };

            AjaxModule.doAxioPost(RouterStore.api.posts.new, body).then((response) => {
                if (response.status !== 201) {
                    throw new Error(response.data?.message || 'Не удалось создать пост');
                }
                this.setState({ postID: response.data.id });
                post.delete();
                this.setState({ redirect: true });
            }).catch((error) => {
                showToast({ type: TOAST_TYPES.ERROR });
                console.error(error.message);
            });
        }
    }

    _makePatchRequest() {
        const { errors } = this.state;
        const { post, showToast } = this.props;
        const form = this._form.current;
        const isFormValid = Array.from(Object.values(errors)).filter(error => Boolean(error)).length === 0;
        if (isFormValid) {
            const body = {
                title: form.title.value,
                description: form.description,
                teaser: form.teaser.value,
                file_ids: toJS(post.file_ids),
                activity_id: +form.activity.options[form.activity.selectedIndex]?.id,
                raw: form.raw,
            };

            const { id } = this.props.match.params;
            const path = getRouteWithID(RouterStore.api.posts.id, id);
            AjaxModule.doAxioPatch(path, body).then((response) => {
                if (response.status !== 200) {
                    throw new Error(response.data?.message || 'Не удалось сохранить пост');
                }
                this.setState({ postID: response.data.id });
                this.setState({ redirect: true });
            }).catch((error) => {
                showToast({ type: TOAST_TYPES.ERROR });
                console.error(error.message);
            });
        }
    }
}


export default withRouter(BlockPostForm);