import React from 'react';

import CategoryCard from 'components/fragments/category-card/category-card';
import Button from 'components/fragments/button/button';

import ImageCategoryArt from 'assets/img/index/categories/art.png';

import RouteStore from 'store/routes';

import './block-layout-index-slot-categories.scss';


export default class BlockLayoutIndexSlotCategories extends React.Component {
    categories = [
        {title: 'Живопись', picture: ImageCategoryArt},
        {title: 'Блог', picture: ImageCategoryArt},
        {title: 'Фото', picture: ImageCategoryArt},
        {title: 'Музыка', picture: ImageCategoryArt},
        {title: 'Публицистика', picture: ImageCategoryArt},
        {title: 'Спорт', picture: ImageCategoryArt},
        {title: 'Видео', picture: ImageCategoryArt},
        {title: 'Образование', picture: ImageCategoryArt},
        {title: 'Искусство', picture: ImageCategoryArt},
        {title: 'Комиксы', picture: ImageCategoryArt},
        {title: 'Рукоделие', picture: ImageCategoryArt},
        {title: 'Подкасты', picture: ImageCategoryArt},
        {title: 'Игры', picture: ImageCategoryArt},
        {title: 'Бизнес', picture: ImageCategoryArt},
        {title: 'Разработка', picture: ImageCategoryArt},
    ];

    render() {
        return (
            <div className="block-layout-index-slot-categories">
                <div className="block-layout-index-slot-categories__title">
                    Присоединяйтесь, если вам интересны...
                </div>
                <div className="block-layout-index-slot-categories__category-list">
                    {this.categories.map(({title, picture}, idx) => (
                        <CategoryCard key={idx} title={title} picture={picture}/>
                    ))}
                </div>
                <div className="block-layout-index-slot-categories__secondary-title">
                    или есть что-то, чем хотите поделиться!
                </div>
                <div className="block-layout-index-slot-categories__cta">
                    {/* TODO: Покрыть нужные кейсы по нажатию кнопки */}
                    <Button
                        primary
                        outline
                        type={Button.types.link}
                        to={RouteStore.pages.user.login}
                        text="Присоединиться"
                    />
                </div>
            </div>
        );
    }
}
