import React from 'react'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { deletePegawai, getPegawai } from '../redux/action';
import { Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
    const dispatch = useDispatch();
    const { employees } = useSelector(state => state.data)

    useEffect(() => {
        dispatch(getPegawai());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus data pegawai?')) {
            dispatch(deletePegawai(id));
        }
    };

    return (
        <div>
            <Container>
                <h1>Employee Management System</h1>
                <Link><Button
                    variant="contained"
                    color="success"
                    component={Link}
                    to={`add`}
                >
                    Add Employee
                </Button></Link>
                <TableContainer component={Paper} sx={{ mt: 3 }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Nama</TableCell>
                                <TableCell align="center">Jalan</TableCell>
                                <TableCell align="center">Provinsi</TableCell>
                                <TableCell align="center">Kabupaten</TableCell>
                                <TableCell align="center">Kecamatan</TableCell>
                                <TableCell align="center">Kelurahan</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employees.map((employee) => (
                                <TableRow
                                    key={employee.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center">{employee.nama}</TableCell>
                                    <TableCell align="center">{employee.jalan}</TableCell>
                                    <TableCell align="center">{employee.provinsi}</TableCell>
                                    <TableCell align="center">{employee.kabupaten}</TableCell>
                                    <TableCell align="center">{employee.kecamatan}</TableCell>
                                    <TableCell align="center">{employee.kelurahan}</TableCell>
                                    <Button sx={{ mr: 1.5 }}
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => handleDelete(employee.id)}
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        component={Link}
                                        to={`/edit/${employee.id}`}
                                    >
                                        Edit
                                    </Button>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </div >
    )
}

export default Home