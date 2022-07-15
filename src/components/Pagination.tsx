import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from '../scss/components/pagination.module.scss';

type PaginationProps = {
    onClickPage: (page: number) => void;
    currentPage: number;
};

const Pagination: React.FC<PaginationProps> = ({ onClickPage, currentPage }) =>
    <ReactPaginate
        className={styles.root}
        breakLabel="..."
        previousLabel="<"
        nextLabel=">"
        onPageChange={event => onClickPage(event.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        forcePage={currentPage - 1}
    />

export default Pagination;
