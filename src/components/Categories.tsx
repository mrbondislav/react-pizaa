import React from 'react';

type CategoriesProps = {
    categoryId: number;
    onClickCategory: (index: number) => void;
};

const categories = [
    'Все',
    'Мясные',
    'Вегетарианские',
    'Гриль',
    'Острые',
    'Закрытые'
];

const Categories: React.FC<CategoriesProps> = ({ categoryId, onClickCategory }) => {

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