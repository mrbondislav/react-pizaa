import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';



function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);
    const { categoryId, sort, currentPage } = useSelector(state => state.filter);
    const status = useSelector(state => state.pizza.status);
    const pizzaItems = useSelector(state => state.pizza.items);
    // const { pizzaItems, status } = useSelector(state => state.pizza);
    const { searchValue } = React.useContext(SearchContext);

    const onClickCategory = (id) => {
        dispatch(setCategoryId(id));
    };
    const onClickPage = (number) => {
        dispatch(setCurrentPage(number));
    };

    const getPizzas = async () => {
        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `search=${searchValue}` : '';

        dispatch(fetchPizzas({
            sortBy,
            order,
            category,
            search,
            currentPage,
        }));

        window.scrollTo(0, 0);
    };

    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage,
            });
            navigate(`?${queryString}`);
        }

        isMounted.current = true;
    }, [categoryId, sort.sortProperty, currentPage]);

    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            const sort = list.find(obj => obj.sortProperty === params.sortProperty);

            dispatch(
                setFilters({ ...params, sort }),
            );
            isSearch.current = true;
        }
    }, []);

    React.useEffect(() => {

        if (!isSearch.current) {
            getPizzas();
        }

        isSearch.current = false;

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
            {status === 'error'
                ? (<div className='content__error-info'>
                    <h2>Произошла ошибка</h2>
                    <p>
                        Не удалось получить пиццы
                    </p>
                </div>)
                : (<div className="content__items">
                    {status === 'loading' ? skeleton : pizzas}
                </div>)
            }


            <Pagination
                currentPage={currentPage}
                onClickPage={onClickPage}
            />

        </div>
    );
};

export default Home;


