import React from 'react';

import Text from 'components/fragments/text/text';
import Button from 'components/fragments/button/button';

import ImageAbstract from 'assets/img/index/landing/abstract.jpg';
import ImageHandmade from 'assets/img/index/landing/handmade.jpg';

import RouteStore from 'store/routes';

import './block-layout-index-slot-landing.scss';


export default class BlockLayoutIndexSlotLanding extends React.Component {
    render() {
        return (
            <div className="block-layout-index-slot-landing">
                <div className="block-layout-index-slot-landing__content">
                    <div className="block-layout-index-slot-landing__picture-cards">
                        <img
                            className="block-layout-index-slot-landing__picture"
                            alt="Картинка 2"
                            src={ImageHandmade}
                            style={{top: 0, right: 0}}
                        />
                        <img
                            className="block-layout-index-slot-landing__picture"
                            alt="Картинка 1"
                            src={ImageAbstract}
                            style={{bottom: 0, left: 0}}
                        />
                    </div>
                    <div className="block-layout-index-slot-landing__text">
                        <div className="block-layout-index-slot-landing__title">
                            Место, где таланты помогают талантам
                        </div>
                        <div className="block-layout-index-slot-landing__description">
                            <div>
                                Никогда еще не было так приятно делиться своими успехами! <Text primary>Ваш талант</Text> может вдохновить многих, не забывайте об этом!
                            </div>
                            <div>
                                Делитесь <Text primary>своими успехами</Text> с другими участниками, а они будут делиться с вами <Text primary>пончиками!</Text>
                            </div>
                        </div>
                        {/* TODO: Покрыть нужные кейсы по нажатию кнопки */}
                        <Button
                            primary
                            outline
                            wide
                            type={Button.types.link}
                            to={RouteStore.pages.user.login}
                            text="Попробовать"
                        />
                    </div>
                </div>
            </div>
        );
    }
}
