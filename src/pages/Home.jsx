import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { setCategoryId } from '../redux/slices/filterSlice';


function Home() {

    const dispatch = useDispatch();
    const { categoryId, sort } = useSelector(state => state.filter);

    const { searchValue } = React.useContext(SearchContext);
    const [pizzaItems, setPizzaItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [currentPage, setCurrentPage] = React.useState(1);


    const onClickCategory = (id) => {
        dispatch(setCategoryId(id));
    }

    React.useEffect(() => {
        setIsLoading(true);

        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
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
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);

    const pizzas = pizzaItems.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
    const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    categoryId={categoryId}
                    onClickCategory={onClickCategory}
                />
                <Sort />
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