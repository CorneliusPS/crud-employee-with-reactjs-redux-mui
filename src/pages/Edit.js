import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Autocomplete, Box, Button, Container, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getSinglePegawai, updatePegawai } from '../redux/action';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
    const [provinces, setProvinces] = useState([]);
    const [kabupatenOptions, setKabupatenOptions] = useState([]);
    const [kecamatanOptions, setKecamatanOptions] = useState([]);
    const [kelurahanOptions, setKelurahanOptions] = useState([]);

    useEffect(() => {
        fetchProvinces();
    }, []);

    const fetchProvinces = async () => {
        try {
            const response = await fetch(
                "https://api.binderbyte.com/wilayah/provinsi?api_key=04c831b8de49a2f879259527a9dc64c8f939b9e4c56299e2711a13e915d8e969"
            );
            const data = await response.json();
            setProvinces(data.value);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    const fetchKabupaten = async (idProvinsi) => {
        try {
            const response = await fetch(
                `https://api.binderbyte.com/wilayah/kabupaten?api_key=04c831b8de49a2f879259527a9dc64c8f939b9e4c56299e2711a13e915d8e969&id_provinsi=${idProvinsi}`
            );
            const data = await response.json();
            setKabupatenOptions(data.value);
        } catch (error) {
            console.error('Error fetching kabupaten data:', error);
        }
    };

    const fetchKecamatan = async (idKabupaten) => {
        try {
            const response = await fetch(
                `https://api.binderbyte.com/wilayah/kecamatan?api_key=04c831b8de49a2f879259527a9dc64c8f939b9e4c56299e2711a13e915d8e969&id_kabupaten=${idKabupaten}`
            );
            const data = await response.json();
            setKecamatanOptions(data.value);
        } catch (error) {
            console.error('Error fetching kecamatan data:', error);
        }
    };

    const fetchKelurahan = async (idKecamatan) => {
        try {
            const response = await fetch(
                `https://api.binderbyte.com/wilayah/kelurahan?api_key=04c831b8de49a2f879259527a9dc64c8f939b9e4c56299e2711a13e915d8e969&id_kecamatan=${idKecamatan}`
            );
            const data = await response.json();
            setKelurahanOptions(data.value);
        } catch (error) {
            console.error('Error fetching kelurahan data:', error);
        }
    };
    const handleProvinsiChange = (selectedProvinsi) => {
        if (selectedProvinsi) {
            const idProvinsi = selectedProvinsi.id;
            fetchKabupaten(idProvinsi);
            handleInputChange({ target: { name: 'provinsi', value: selectedProvinsi.name } });
        } else {
            setKabupatenOptions([]);
            handleInputChange({ target: { name: 'provinsi', value: '' } });
            handleInputChange({ target: { name: 'kabupaten', value: '' } });
        }
    };

    const handleKabupatenChange = (selectedKabupaten) => {
        if (selectedKabupaten) {
            const idKabupaten = selectedKabupaten.id;
            fetchKecamatan(idKabupaten);
            setState({
                ...state,
                kabupaten: selectedKabupaten.name,
                kecamatan: '', 
                kelurahan: '', 
            });
        } else {
            setKecamatanOptions([]);
            setState({
                ...state,
                kabupaten: '',
                kecamatan: '', 
                kelurahan: '', 
            });
        }
    };

    const handleKecamatanChange = (selectedKecamatan) => {
        if (selectedKecamatan) {
            const idKecamatan = selectedKecamatan.id;
            fetchKelurahan(idKecamatan);
            setState({
                ...state,
                kecamatan: selectedKecamatan.name,
                kelurahan: '', 
            });
        } else {
            setKelurahanOptions([]);
            setState({
                ...state,
                kecamatan: '',
                kelurahan: '', 
            });
        }
    };

    const [state, setState] = useState({
        nama: '',
        jalan: '',
        provinsi: '',
        kabupaten: '',
        kecamatan: '',
        kelurahan: ''
    });

    const [error, setError] = useState('');

    const { id } = useParams();

    const { employee } = useSelector((state) => state.data);

    const { nama, jalan, provinsi, kabupaten, kecamatan, kelurahan } = state;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSinglePegawai(id));
    }, [id, dispatch]);

    useEffect(() => {
        if (employee) {
            setState({ ...employee });
        }
    }, [employee]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updatePegawai(state, id));
        navigate('/');
        setError('');

    };

    return (
        <div>
            <Container>
                <h1>Edit Employee</h1>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '50ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >

                    <TextField
                        label="Nama"
                        name="nama"
                        value={nama}
                        onChange={handleInputChange}
                        type="text"
                    />
                    <br />
                    <TextField
                        label="Jalan"
                        name="jalan"
                        value={jalan}
                        onChange={handleInputChange}
                        type="text"
                    />
                    <br />
                    <Autocomplete
                        options={provinces}
                        getOptionLabel={(option) => option.name}
                        value={provinces.find((option) => option.name === provinsi) || null}
                        onChange={(e, newValue) =>
                            handleProvinsiChange(newValue)
                        }
                        renderInput={(params) => <TextField {...params} label="Provinsi" />}
                    />

                    <TextField
                        select
                        label="Kabupaten/Kota"
                        name="kabupaten"
                        value={kabupaten}
                        onChange={(e) => {
                            handleKabupatenChange(
                                kabupatenOptions.find((option) => option.name === e.target.value)
                            );
                        }}
                    >
                        {kabupatenOptions.map((kabupatenOption) => (
                            <MenuItem key={kabupatenOption.id} value={kabupatenOption.name}>
                                {kabupatenOption.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    <br />
                    <TextField
                        select
                        label="Kecamatan"
                        name="kecamatan"
                        value={kecamatan}
                        onChange={(e) => {
                            handleKecamatanChange(
                                kecamatanOptions.find((option) => option.name === e.target.value)
                            );
                        }}
                    >
                        {kecamatanOptions.map((kecamatanOption) => (
                            <MenuItem key={kecamatanOption.id} value={kecamatanOption.name}>
                                {kecamatanOption.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <br />
                    <TextField
                        select
                        label="Kelurahan"
                        name="kelurahan"
                        value={kelurahan}
                        onChange={handleInputChange}
                    >
                        {kelurahanOptions.map((kelurahanOption) => (
                            <MenuItem key={kelurahanOption.id} value={kelurahanOption.name}>
                                {kelurahanOption.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <br />
                    <Button sx={{ mr: 2 }} type="submit" variant="contained" color="primary" onChange={handleInputChange}>
                        Save
                    </Button>
                    <Button type="submit" variant="contained" color="primary" onClick={() => navigate("/")}>
                        Cancel
                    </Button>

                </Box>

            </Container>
        </div >
    );
};

export default Edit;
