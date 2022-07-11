import React from 'react';

type CategoriesProps = {
    categoryId: number;
    onClickCategory: any;
};

const Categories: React.FC<CategoriesProps> = ({ categoryId, onClickCategory }) => {


    const categories = [
        'Все',
        'Мясные',
        'Вегетарианские',
        'Гриль',
        'Острые',
        'Закрытые'
    ];

    return (
        <div className="categories">
            <ul>
                {categories.map((value, index) => (
                    <li
                        key={index}
                        onClick={() => onClickCategory(index)}
                        className={categoryId === index ? 'active' : ''}>
                        {value}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Categories;