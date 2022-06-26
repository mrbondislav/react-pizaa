import React from 'react';
import styles from '../scss/components/notFound.module.scss';

function NotFound() {
    return (
        <div className={styles.root}>
            <h1 >
                <span>😕</span>
                <br />
                Ничего не найдено
            </h1>
            <p className={styles.description}>Данная страница, к сожалению, отсутствует в нашем магазине</p>
        </div>
    );
};

export default NotFound;