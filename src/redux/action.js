import axios from 'axios';
import {
    GET_PEGAWAI,
    UPDATE_PEGAWAI,
    DELETE_PEGAWAI,
    CREATE_PEGAWAI,
    GET_SINGLE_PEGAWAI,
    GET_PROVINSI,
} from './actionTypes';

const API_BASE_URL = 'https://61601920faa03600179fb8d2.mockapi.io/pegawai';

const PROVINCE_BASE_URL = 'https://api.binderbyte.com/wilayah/provinsi?api_key=04c831b8de49a2f879259527a9dc64c8f939b9e4c56299e2711a13e915d8e969';

export const getProvinsi = () => async (dispatch) => {
    try {
        const response = await axios.get(PROVINCE_BASE_URL);
        dispatch({ type: GET_PROVINSI, payload: response.value });
    } catch (error) {
        console.error('Error while fetching data:', error);
    }
};

export const getPegawai = () => async (dispatch) => {
    try {
        const response = await axios.get(API_BASE_URL);
        dispatch({ type: GET_PEGAWAI, payload: response.data });
    } catch (error) {
        console.error('Error while fetching data:', error);
    }
};

export const getSinglePegawai = (id) => async (dispatch) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        dispatch({ type: GET_SINGLE_PEGAWAI, payload: response.data });
    } catch (error) {
        console.error('Error while fetching data:', error);
    }
};

export const updatePegawai = (employee, id) => async (dispatch) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${id}`, employee);
        dispatch({ type: UPDATE_PEGAWAI, payload: response.data });
    } catch (error) {
        console.error('Error while updating data:', error);
    }
};

export const deletePegawai = (id) => async (dispatch) => {
    try {
        await axios.delete(`${API_BASE_URL}/${id}`);
        dispatch({ type: DELETE_PEGAWAI, payload: id });
        dispatch(getPegawai())
    } catch (error) {
        console.error('Error while deleting data:', error);
    }
};

export const addPegawai = (employee) => async (dispatch) => {
    try {
        const response = await axios.post(API_BASE_URL, employee);
        dispatch({ type: CREATE_PEGAWAI, payload: response.data });
        dispatch(getPegawai())
    } catch (error) {
        console.error('Error while creating data:', error);
    }
};
