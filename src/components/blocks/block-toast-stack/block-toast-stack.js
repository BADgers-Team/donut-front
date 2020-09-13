import React from 'react';

import Toast, {TOAST_TYPES} from 'components/fragments/toast/toast';

import './block-toast-stack.scss';

const DEFAULT_ERROR_TEXT = 'Произошла неизвестная ошибка';

export default class BlockToastStack extends React.Component {
    state = {
        stack: [],
    }

    nextId = 0;

    getToast(params) {
        const {type, text} = params;

        // Если явно передан тип ERROR, у нас есть для него дефолтный текст
        if (type && type === TOAST_TYPES.ERROR) {
            return {
                text: DEFAULT_ERROR_TEXT,
                ...params,
            };
        }

        // Если тип не выставлен или выставлен другой тип, важно, чтобы текст был указан
        if (text) {
            return {
                type: TOAST_TYPES.DEFAULT,
                ...params,
            };
        }

        // Если тип не выставлен, и текста нет, то мы не знаем, что рисовать
        return null;
    }

    add = (params) => {
        this.nextId += 1;
        const id = this.nextId;

        const timeoutId = setTimeout(this.remove, 5000, id);

        const toast = this.getToast({...params, id, timeoutId});
        if (toast === null) {
            return;
        }

        this.setState(({stack}) => ({
            stack: [...stack, toast]
        }));
    }

    remove = (id, timeoutId) => {
        const {stack} = this.state;

        if (timeoutId) {
            window.clearTimeout(timeoutId);
        }

        const toastIdx = stack.findIndex((toast) => toast.id === id);

        this.setState(({stack: prevStack}) => {
            const stack = [...prevStack];
            stack.splice(toastIdx, 1);
            return {stack};
        });
    }

    componentWillUnmount() {
        const {stack} = this.state;
        stack.forEach((toast) => window.clearTimeout(toast.timeoutId));
    }

    render() {
        const {stack} = this.state;

        return (
            <div className="block-toast-stack">
                { stack.map((toast) => (
                    <div key={toast.id} className="block-toast-stack__item">
                        <Toast {...toast} onClose={this.remove.bind(this, toast.id, toast.timeoutId)}/>
                    </div>
                )) }
            </div>
        );
    }
}
