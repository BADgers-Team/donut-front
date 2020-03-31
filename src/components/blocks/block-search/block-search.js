import React, { Component } from 'react';

import AjaxModule from "services/ajax";
import RouteStore from "store/routes";

import ArrowDownIcon from 'assets/img/select-arrow.svg';

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
            freeSubscritionsChecked: false,
            selectedActivities: [],
        };
        this.toggleSubscritionsPrices = this.toggleSubscritionsPrices.bind(this);
        this.toggleFreeSubscritions = this.toggleFreeSubscritions.bind(this);
    }

    getSelectedActivities = (activities) => {
        this.setState({ selectedActivities: activities });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        
        const form = this._form.current;

        let keys = {
            activities: this.state.selectedActivities,
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
        this.setState({ showSubscritionsPrices: !this.state.showSubscritionsPrices}, this.checkCheckboxes);
        
    }

    checkCheckboxes = () => {
        // если нажата галочка "Бесплатно" и "По подписке" одновременно, мин. цену принимает за 0
        const form = this._form.current;
        if (this.state.showSubscritionsPrices && this.state.freeSubscritionsChecked) {
            form.subscritionNumberMin.value = 0;
            form.subscritionNumberMin.disabled = true;
        } else {
            if (form.subscritionNumberMin) {
                form.subscritionNumberMin.value = '';
                form.subscritionNumberMin.disabled = false;                
            }
        }
    }

    toggleFreeSubscritions() {
        this.setState({ freeSubscritionsChecked: !this.state.freeSubscritionsChecked}, this.checkCheckboxes);
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
                            <ActivitiesSelect onChange={this.getSelectedActivities}/>
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
            activities: [],
            selectedActivities: [],
            showАctivities: false,
            showАctivitiesList: false,
        };
        this.handleActivityDisplay = this.handleActivityDisplay.bind(this);
        this.toggleSelectedActivity = this.toggleSelectedActivity.bind(this);
    }

    componentDidMount() {
        AjaxModule.get(RouteStore.api.activities).then((data) => {
            this.setState({ activities: data || [] });
        }).catch((error) => {
            console.error(error.message);
        });
    }

    toggleSelectedActivity(event) {
        let newItem = {
            id: event.target.id,
            name: event.target.name
        };
        let foundItem = this.state.selectedActivities.find(item => item.id === newItem.id);
        let tempArray = this.state.selectedActivities;
        if (!foundItem) {
            tempArray.push(newItem);
        } else {
            let removeIndex = tempArray.map(function(item) { return item.id; }).indexOf(foundItem.id);
            tempArray.splice(removeIndex, 1);
        } 

        this.setState({selectedActivities: tempArray}, () => {
            const { onChange } = this.props;
            onChange && onChange(this.state.selectedActivities);
        });
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
                    <img src={ArrowDownIcon}/>
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