import React from 'react';
import { inject } from 'mobx-react';

import CategoryCard from 'components/fragments/category-card/category-card';
import Button from 'components/fragments/button/button';

import ImageCategoryPainting from 'assets/img/index/categories/painting.jpg';
import ImageCategoryBlog from 'assets/img/index/categories/blog.jpg';
import ImageCategoryPhotography from 'assets/img/index/categories/photography.jpg';
import ImageCategoryMusic from 'assets/img/index/categories/music.jpg';
import ImageCategoryPublications from 'assets/img/index/categories/publications.jpg';
import ImageCategorySport from 'assets/img/index/categories/sport.jpg';
import ImageCategoryVideo from 'assets/img/index/categories/video.jpg';
import ImageCategoryEducation from 'assets/img/index/categories/education.jpg';
import ImageCategoryArt from 'assets/img/index/categories/art.jpg';
import ImageCategoryComics from 'assets/img/index/categories/comics.jpg';
import ImageCategoryHandmade from 'assets/img/index/categories/handmade.jpg';
import ImageCategoryPodcasts from 'assets/img/index/categories/podcasts.jpg';
import ImageCategoryGames from 'assets/img/index/categories/games.jpg';
import ImageCategoryBusiness from 'assets/img/index/categories/business.jpg';
import ImageCategoryDevelopment from 'assets/img/index/categories/development.jpg';

import RouteStore from 'store/routes';

import './block-layout-index-slot-categories.scss';

@inject('user')
class BlockLayoutIndexSlotCategories extends React.Component {
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
        const { user } = this.props;
        const link = user.login ? RouteStore.pages.posts.new : RouteStore.pages.user.login;
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
                        to={link}
                        text="Присоединиться"
                    />
                </div>
            </div>
        );
    }
}

export default BlockLayoutIndexSlotCategories;
