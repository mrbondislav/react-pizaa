import React from 'react';
import CartEmptyImg from '../assets/img/empty-cart.png';
import { Link } from "react-router-dom";

const CartEmpty: React.FC = () => {
    return (
        <>
            <div className="cart cart--empty">
                <h2>Корзина пуста</h2>
                <p>
                    Вероятней всего, вы ещё не добавили пиццу.<br />
                    Для того, чтобы заказать пиццу, перейди на главную страницу.
                </p>
                <img src={CartEmptyImg} alt="Empty cart" />
                <Link to="/" className="button button--black">
                    <span>Вернуться назад</span>
                </Link>
            </div>
        </>
    )
}

export default CartEmpty;