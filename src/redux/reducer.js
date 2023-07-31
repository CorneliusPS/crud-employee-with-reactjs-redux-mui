import {
    createContext,
    useContext
} from 'react';

import * as types from './actionTypes'

const initialState = {
    employees: [],
    employee: {},
    provinces: [],
    loading: true,
}

const context = createContext(initialState);

export const useValue = () => {
    return useContext(context)
}

const employeeReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_PEGAWAI:
            return {
                ...state,
                employees: action.payload,
                loading: false,
            }
        case types.GET_SINGLE_PEGAWAI:
            return {
                ...state,
                employee: action.payload,
                loading: false,
            }
        case types.GET_PROVINSI:
            return {
                ...state,
                provinces: action.payload,
                loading: false,
            }
        case types.CREATE_PEGAWAI:
        case types.DELETE_PEGAWAI:
        default:
            return state
    }
}

export default employeeReducers