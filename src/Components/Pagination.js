import React from 'react';
import { useState, useEffect } from 'react';

export const PaginationPages = ({ pages, setCurrentPage }) => {
    const [currentButton, setCurrentButton] = useState(1);
    const numberOfPages = [];
    for (let i = 1; i <= pages; i++) {
        numberOfPages.push(i)
    };
    useEffect(() => {
        setCurrentPage(currentButton)
    }, [currentButton, setCurrentPage])
    return (
        <div className='clearfix d-flex justify-content-center'>
            <ul className='pagination p-3'>
                <li className={` ${currentButton === 1 ? 'page-item disabled' : 'page-item'} `}>
                    <a href='#!' className='page-link' onClick={() => setCurrentButton((prev) => prev === 1 ? prev : prev - 1)}>Previous</a>
                </li>
                {
                    numberOfPages.map((page, index) => {
                        return (
                            <li key={index} className={` ${currentButton === page ? 'page-item active' : 'page-item'} `}>
                                <a href='#!' className='page-link' onClick={() => setCurrentButton(page)}>{page}</a>
                            </li>
                        )
                    })
                }
                <li className={` ${currentButton === numberOfPages.length ? 'page-item disabled' : 'page-item'} `}>
                    <a href='#!' className='page-link' onClick={() => setCurrentButton((prev) => prev === numberOfPages.length ? prev : prev + 1)}>Next</a>
                </li>
            </ul>
        </div>
    )
}
