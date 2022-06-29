import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from '../scss/components/pagination.module.scss';

function Pagination({ onClickPage, currentPage }) {
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            previousLabel="<"
            nextLabel=">"
            onPageChange={event => onClickPage(event.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={3}
            forcePage={currentPage - 1}
            renderOnZeroPageCount={null}
        />
    )
}

export default Pagination;
