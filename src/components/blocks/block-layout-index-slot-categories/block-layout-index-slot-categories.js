import React from 'react';

import CategoryCard from 'components/fragments/category-card/category-card';
import Button from 'components/fragments/button/button';

import ImageCategoryPainting from 'assets/img/index/categories/painting.png';
import ImageCategoryBlog from 'assets/img/index/categories/blog.png';
import ImageCategoryPhotography from 'assets/img/index/categories/photography.png';
import ImageCategoryMusic from 'assets/img/index/categories/music.png';
import ImageCategoryPublications from 'assets/img/index/categories/publications.png';
import ImageCategorySport from 'assets/img/index/categories/sport.png';
import ImageCategoryVideo from 'assets/img/index/categories/video.png';
import ImageCategoryEducation from 'assets/img/index/categories/education.png';
import ImageCategoryArt from 'assets/img/index/categories/art.png';
import ImageCategoryComics from 'assets/img/index/categories/comics.png';
import ImageCategoryHandmade from 'assets/img/index/categories/handmade.png';
import ImageCategoryPodcasts from 'assets/img/index/categories/podcasts.png';
import ImageCategoryGames from 'assets/img/index/categories/games.png';
import ImageCategoryBusiness from 'assets/img/index/categories/business.png';
import ImageCategoryDevelopment from 'assets/img/index/categories/development.png';

import RouteStore from 'store/routes';

import './block-layout-index-slot-categories.scss';


export default class BlockLayoutIndexSlotCategories extends React.Component {
    categories = [
        {title: 'Живопись', picture: ImageCategoryPainting},
        {title: 'Блог', picture: ImageCategoryBlog},
        {title: 'Фото', picture: ImageCategoryPhotography},
        {title: 'Музыка', picture: ImageCategoryMusic},
        {title: 'Публицистика', picture: ImageCategoryPublications},
        {title: 'Спорт', picture: ImageCategorySport},
        {title: 'Видео', picture: ImageCategoryVideo},
        {title: 'Образование', picture: ImageCategoryEducation},
        {title: 'Искусство', picture: ImageCategoryArt},
        {title: 'Комиксы', picture: ImageCategoryComics},
        {title: 'Рукоделие', picture: ImageCategoryHandmade},
        {title: 'Подкасты', picture: ImageCategoryPodcasts},
        {title: 'Игры', picture: ImageCategoryGames},
        {title: 'Бизнес', picture: ImageCategoryBusiness},
        {title: 'Разработка', picture: ImageCategoryDevelopment},
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
