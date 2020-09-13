import React from 'react';
import {Link} from 'react-router-dom';

import ImageDonutCustomLogo from 'assets/img/donut-custom-logo.png';

import './block-footer.scss';


export default class BlockFooter extends React.Component {
    render() {
        return (
            <div className="block-footer">
                <img className="block-footer__logo" alt="Give Me A Donut" src={ImageDonutCustomLogo}/>
                <div className="block-footer__description">
                    <Link to={'/'} className="block-footer__link">Пользовательское соглашение</Link>
                    <Link to={'/'} className="block-footer__link">Контакты и обратная связь</Link>
                    <Link to={'/'} href="" className="block-footer__link">О компании</Link>
                    <Link to={'/'} className="block-footer__link">Партнерам</Link>
                    <div className="block-footer__copyright">Команда Badgers, 2020. Все права защищены ©</div>
                </div>
            </div>
        );
    }
}
