import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FullPizza: React.FC = () => {
    const { id } = useParams();
    const [pizza, setPizza] = React.useState<{
        imageUrl: string;
        title: string;
        price: number;
    }>();
    const navigate = useNavigate();

    React.useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get('https://62b47a99530b26da4cbf8d38.mockapi.io/items/' + id);
                setPizza(data);
            } catch (error) {
                alert('что-то пошло не так')
                navigate('/')
            }
        }

        fetchPizza();
    }, []);

    if (!pizza) {
        return <>Загрузка...</>;
    }

    return (
        <div className='container'>
            <img src={pizza.imageUrl} alt="pizza" />
            <h2>{pizza.title}</h2>
            <p>desc</p>
            <h4>{pizza.price} р.</h4>
        </div>
    )
}

export default FullPizza;

