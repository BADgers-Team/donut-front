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

        this.state = {
            activities: [], //for select 
            showАctivities: false
        };
        this._form = React.createRef();
        this.handleActivityDisplay = this.handleActivityDisplay.bind(this);
    }

    componentDidMount() {
        AjaxModule.get(RouteStore.api.activities).then((data) => {
            this.setState({ activities: data || [] });
        }).catch((error) => {
            console.error(error.message);
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const form = this._form.current;

        let keys = {};
        if (form.subscritionNumberMin.value !== '') {
            if (!form.freeCheckbox.checked && form.subscritionCheckbox.checked) 
                keys.min_price = form.subscritionNumberMin.value;
        }
        if (form.subscritionNumberMax.value !== '') {
            if (!form.freeCheckbox.checked && form.subscritionCheckbox.checked)
                keys.max_price  = form.subscritionNumberMax.value;
        }
        if (form.postType !== undefined) keys.data_type = form.postType.value;
        keys.text = form.search.value;
        if (form.freeCheckbox.checked && form.subscritionCheckbox.checked) {
            keys.min_price = 0;
            keys.max_price = 2147483647;
        }
        if (form.freeCheckbox.checked && !form.subscritionCheckbox.checked) {
            keys.min_price = 0;
            keys.max_price = 0;
        }
        //TODO activities
        const selectActivities = document.getElementsByClassName('select__activities-items');
        let chosenActivities = '';
        //TODO плохой цикл, наверное можно лучше
        debugger
        for (let i=0; i< selectActivities.length; i++) {
            if (selectActivities[i].checked) {
                chosenActivities += selectActivities[i].id + ',';
            }
        }
        chosenActivities.substring(0, chosenActivities.length - 1);
        console.log(chosenActivities);

        //TODO временная проверка
        if (keys.min_price > keys.max_price) {
            alert('Неверный диапазон цены!');
            return;
        }

        const { onSubmit } = this.props;
        onSubmit && onSubmit(keys);
    };

    handleActivityDisplay() {
        this.setState({showАctivities: !this.state.showАctivities});
    }

    render() {
        const postTypes = [
            {id: 1, value:'all', text:'Везде'},
            {id: 2, value:'posts', text: 'По постам'},
            {id: 3, value:'subscriptions', text: 'По подпискам'},
            {id: 4, value:'authors', text: 'По авторам'},
        ]; 
        const { activities } = this.state;
        const activitiesNodes = activities.map((activity, index) => {
            if (activity.label === 'Все') return;
            return <Input type={Input.types.checkbox} name={activity} key={index} id={index} label={activity.label} classValue="select__activities-items"/>
        });
        return (
            <div className='search'>
                <form ref={this._form} className="search-form">
                    <div className='search__top'>
                        <div className='top__type-selector'>
                            <Select name="postType" values={postTypes} />
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
                            <Input type={Input.types.checkbox} name="freeCheckbox" label="Бесплатно"/>
                        </div>
                        <div className='bottom__subscrition'>
                            <Input type={Input.types.checkbox} name="subscritionCheckbox"/>
                            <label>По подписке от</label>
                            <Input type={Input.types.number} name="subscritionNumberMin" label="₽"/>
                            <label>до</label>
                            <Input type={Input.types.number} name="subscritionNumberMax" label="₽"/>
                        </div>
                        <div className='bottom__select-activity'>
                            <div className='select-activity__default' onClick={this.handleActivityDisplay}>Тематики: ...</div>
                            {this.state.showАctivities && <div className='select-activity__list' name="activities">
                                {activitiesNodes}
                            </div>}
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default BlockSearch;
