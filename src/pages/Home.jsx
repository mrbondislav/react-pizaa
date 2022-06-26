import React from 'react'

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/Skeleton';
import Pagination from '../components/Pagination';

function Home({ searchValue }) {

    const [pizzaItems, setPizzaItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [categoryId, setCategoryId] = React.useState(0);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [sortType, setSortType] = React.useState({
        name: 'популярности',
        sort: 'rating',
    });

    React.useEffect(() => {
        setIsLoading(true);

        const order = sortType.sort.includes('-') ? 'asc' : 'desc';
        const sortBy = sortType.sort.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `search=${searchValue}` : '';

        fetch(
            `https://62b47a99530b26da4cbf8d38.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`
        )
            .then((res) => res.json())
            .then((arrPizza) => {
                setPizzaItems(arrPizza);
                setIsLoading(false);
            });
        window.scrollTo(0, 0);
    }, [categoryId, sortType, searchValue, currentPage]);

    const pizzas = pizzaItems.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
    const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    categoryId={categoryId}
                    onClickCategory={(index) => setCategoryId(index)}
                />
                <Sort
                    sortType={sortType}
                    onClickSort={(index) => setSortType(index)}
                />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading
                        ? skeleton
                        : pizzas
                }
            </div>

            <Pagination
                onClickPage={(number) => setCurrentPage(number)}
            />

        </div>
    );
};

export default Home;