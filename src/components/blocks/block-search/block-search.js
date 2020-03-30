import React, { Component } from 'react';

import AjaxModule from "services/ajax";
import RouteStore from "store/routes";

import Button from 'components/fragments/button/button';
import Input from 'components/fragments/input/input';
import Select from 'components/fragments/select/select';


import './block-search.scss';

class BlockSearch extends Component {
    constructor(props) {
        super(props);

        this._form = React.createRef();
        this.state = {
            showSubscritionsPrices: false,
            freeSubscritionsChecked: true,
        };
        this.toggleSubscritionsPrices = this.toggleSubscritionsPrices.bind(this);
        this.toggleFreeSubscritions = this.toggleFreeSubscritions.bind(this);
    }

    updateActivities = () => {
        const activitiesNodes = document.getElementsByClassName('bottom__select-activity')[0].getElementsByTagName('input');
        let activitiesArray = [];
        for (let i=0; i< activitiesNodes.length; i++) {
            if (activitiesNodes[i].checked) {
                activitiesArray.push(activitiesNodes[i].id);
            }
        }
        return activitiesArray;
    } 

    handleSubmit = (event) => {
        event.preventDefault();
        
        const form = this._form.current;

        let keys = {
            activities: this.updateActivities(),
            data_type: form.postType.value,
            text: form.search.value,
        };

        keys.min_price = 0;
        keys.max_price = 0;
        
        if (form.freeCheckbox.checked && form.subscritionCheckbox.checked) {
            keys.min_price = 0;
            keys.max_price = parseInt(form.subscritionNumberMax.value, 10);
        }
        if (!form.freeCheckbox.checked && form.subscritionCheckbox.checked) {
            keys.min_price = parseInt(form.subscritionNumberMin.value, 10);
            keys.max_price = parseInt(form.subscritionNumberMax.value, 10);
        }
        if (form.freeCheckbox.checked && !form.subscritionCheckbox.checked) {
            keys.min_price = 0;
            keys.max_price = 0;
        }
          
        //TODO временная проверка
        if (keys.min_price > keys.max_price) {
            alert('Неверный диапазон цены!');
            return;
        }

        const { onClick } = this.props;
        onClick && onClick(keys);
    };

    toggleSubscritionsPrices() {
        this.setState({ showSubscritionsPrices: !this.state.showSubscritionsPrices});
    }

    toggleFreeSubscritions() {
        this.setState({ freeSubscritionsChecked: !this.state.freeSubscritionsChecked});
        const value = this.state.freeSubscritionsChecked ? 0 : '';
        const form = this._form.current;
        form.subscritionNumberMin.value = value;
        form.subscritionNumberMin.disabled = this.state.freeSubscritionsChecked;
    }

    render() {
        const postTypes = [
            {id: 1, value:'all', text:'Везде'},
            {id: 2, value:'posts', text: 'По постам'},
            {id: 3, value:'subscriptions', text: 'По подпискам'},
            {id: 4, value:'authors', text: 'По авторам'},
        ]; 

        return (
            <div className='search'>
                <form ref={this._form} className="search-form">
                    <div className='search__top'>
                        <div className='top__type-selector'>
                            <Select values={postTypes} classValue='type-selector' id='type-selector' name='postType'/>     
                        </div>
                        <div className='top__search-input'>
                            <Input type={Input.types.text} name="search" placeholder="Я ищу..."/>
                        </div>
                        <div className='top__search-button'>
                            <Button text="Найти" type={Button.types.submit} onAction={this.handleSubmit}/>
                        </div>
                    </div>
                    <div className='search__bottom'>
                        <div className='bottom__free-checkbox'>
                            <Input type={Input.types.checkbox} name="freeCheckbox" label="Бесплатно" material={true} onAction={this.toggleFreeSubscritions}/>
                        </div>
                        <div className='bottom__subscrition'>
                            <Input type={Input.types.checkbox} name="subscritionCheckbox" label='По подписке ' material={true} onAction={this.toggleSubscritionsPrices}/>
                            {this.state.showSubscritionsPrices && <label>от</label>}
                            {this.state.showSubscritionsPrices && <Input type={Input.types.number} name="subscritionNumberMin" label="₽"/>}
                            {this.state.showSubscritionsPrices && <label>до</label>}
                            {this.state.showSubscritionsPrices && <Input type={Input.types.number} name="subscritionNumberMax" label="₽"/>}
                        </div>
                        <div className='bottom__select-activity'>
                            <ActivitiesSelect />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default BlockSearch;

class ActivitiesSelect extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activities: [{"id":0,"label":"Все","title":"Любые категории, любые тематики","subtitle":"Любой опубликованный пост можно найти здесь!"},{"id":1,"label":"Живопись","title":"Изобразительное искусство","subtitle":"Лучшие шедевры живописи можно отыскать тут!"},{"id":2,"label":"Блог","title":"Блогерство","subtitle":"Посты от самых \"залайканных\" блогеров можно увидеть здесь!"},{"id":3,"label":"Фото","title":"Фотография","subtitle":"Невероятно крутые фото от невероятно талантливых фотографов - и все тут!"},{"id":4,"label":"Писательство","title":"Писательство","subtitle":"Рукописями лучших авторов современности можно вдохновиться именно тут!"},{"id":5,"label":"Музыка","title":"Музыка","subtitle":"Музыканты, композиторы и певцы рады поделиться своими лучшими произведениями здесь!"}],
            selectedActivities: [],
            showАctivities: false,
            showАctivitiesList: false,
        };
        this.handleActivityDisplay = this.handleActivityDisplay.bind(this);
        this.toggleSelectedActivity = this.toggleSelectedActivity.bind(this);
    }

    componentDidMount() {
        // AjaxModule.get(RouteStore.api.activities).then((data) => {
        //     this.setState({ activities: data || [] });
        // }).catch((error) => {
        //     console.error(error.message);
        // });

    }

    toggleSelectedActivity(event) {
        let newItem = {
            id: event.target.id,
            name: event.target.name
        };
        let foundItem = this.state.selectedActivities.find(item => item.id === newItem.id);
        if (!foundItem) {
            this.setState((prevState => ({
                selectedActivities: [...prevState.selectedActivities, newItem]
            })));
        } else {
            let tempArray = [...this.state.selectedActivities];
            let removeIndex = tempArray.map(function(item) { return item.id; }).indexOf(foundItem.id);
            tempArray.splice(removeIndex, 1);
            this.setState({selectedActivities: tempArray});
        } 
    }

    handleActivityDisplay() {
        this.setState({showАctivities: !this.state.showАctivities});
    }

    render() {
        const { activities, selectedActivities } = this.state;
        const activitiesNodes = activities.map((activity, index) => {
            if (activity.label === 'Все') return;
            return <Input type={Input.types.checkbox} onAction={this.toggleSelectedActivity} material={true} name={activity.label} key={index} id={activity.id} label={activity.label} classValue="select__activities-items"/>
        });

        const selectedActivitiesNodes = selectedActivities.map((activity, index) => {
            return <SelectedActivity activity={activity.name} id={activity.id} key={index}/>;
        });

        let roundBorders = this.state.selectedActivities.length !== 0 && !this.state.showАctivities? 'round-borders' : '';

        return (
            <>
                {(!this.state.showАctivities && this.state.selectedActivities.length === 0) && <div className='select-activity__default' onClick={this.handleActivityDisplay}>
                    Выберите тематики 
                </div>}
                {(this.state.showАctivities || this.state.selectedActivities.length !== 0) && 
                <div 
                    className={ `select-activity__list-title ${roundBorders}` }
                    name="activities" onClick={this.handleActivityDisplay}>
                    Тематики: {selectedActivitiesNodes}
                </div>}
                <div className='select-activity__list' name="activities" style={{visibility: !this.state.showАctivities ? 'hidden' : 'visible'}}>
                    {activitiesNodes}
                </div>
            </>
        );
    }
}


class SelectedActivity extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActivity: true,
        }
    }

    // closeActivity = () => {
    //     this.setState({ showActivity: false});
    // }

    render() {
        const { activity, id } = this.props;
        return (
            <>
                { this.state.showActivity && <div className="selected-activity" id={id}>
                    {activity}
                    {/* TODO fix - remove from arrayActivities */}
                    {/* <span id='close' style={{marginLeft: '10px'}} onClick={this.closeActivity}>x</span> */}
                </div>}
            </>
        );
    }
}