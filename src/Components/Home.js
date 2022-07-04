import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import { PaginationPages } from './Pagination';
import { Input, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export const Home = () => {
    const [state, setState] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [employeesPerPage] = useState(50);
    
    useEffect(() => {
        axios.get(`http://localhost:3002/information`)
            .then(res => res.data)
            .then(response => setState(response))
    }, []);
    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployee = state.slice(indexOfFirstEmployee, indexOfLastEmployee);
    const totalPagesNumber = Math.ceil(state.length / employeesPerPage);


    const [value, setValue] = useState('');
    const filterEmployee = (e) => {
        setValue(e.target.value)
    }

    return (
        <>
            <div className='clearfix d-flex justify-content-center'>
                <form>
                    <Input placeholder="Search" value={value} onChange={filterEmployee} />
                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </form>
            </div>

            <TableContainer component={Paper}>
                <Table aria-label='table' stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>ID</TableCell>
                            <TableCell align='center'>First Name</TableCell>
                            <TableCell align='center'>Last Name</TableCell>
                            <TableCell align='center'>Email</TableCell>
                            <TableCell align='center'>Phone Number</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentEmployee.filter(index => index.first_name.toLowerCase().includes(value)).map(index => (
                            <TableRow key={index.id} sx={{ '&:last-child td, &:last-child td': { border: 0 } }}>
                                <TableCell align='center'>{index.id}</TableCell>
                                <TableCell align='center'>{index.first_name}</TableCell>
                                <TableCell align='center'>{index.last_name}</TableCell>
                                <TableCell align='center'>{index.email}</TableCell>
                                <TableCell align='center'>{index.phone}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <PaginationPages pages={totalPagesNumber} setCurrentPage={setCurrentPage} />
        </>
    )
}
