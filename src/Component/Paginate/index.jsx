import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import './style.scss';

const Paginate = ({ setCurrentItems, itemsPerPage, arrContent }) => {

    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;

        if (arrContent.length > 0) {
            setCurrentItems(arrContent.slice(itemOffset, endOffset));
        }

        setPageCount(Math.ceil(arrContent.length / itemsPerPage));

    }, [itemOffset, itemsPerPage, arrContent]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % arrContent.length;

        setItemOffset(newOffset);
    };

    return (
        <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
            className="flex items-center justify-between"
            pageLinkClassName="pageHover"
            activeLinkClassName="pageActive"
            previousLinkClassName="previousLink"
            nextLinkClassName="nextLink"
        />
    )
}

export default Paginate;