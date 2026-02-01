import {createAsyncThunk} from '@reduxjs/toolkit';
import * as api from './authApi';

export const register=createAsyncThunk('auth/register',
    async(data,{rejectWithValue})=>{
    try{
        const response=await api.registerApi(data);
        return response.data;
    }catch(error){
        return rejectWithValue(error.response?.data?.message || error.message);
    }
})

export const login=createAsyncThunk('auth/login',
    async(data,{rejectWithValue})=>{
    try{
        const response=await api.loginApi(data);
        return response.data;
    }catch(error){
        return rejectWithValue(error.response?.data?.message || error.message);
    }
})

export const resetPassword=createAsyncThunk('auth/resetPassword',
    async(data,{rejectWithValue})=>{
    try{
        const response=await api.resetPasswordApi(data);
        return response.data;
    }catch(error){
        return rejectWithValue(error.response?.data?.message || error.message);
    }
})

export const profile=createAsyncThunk('auth/profile',
    async(data,{rejectWithValue})=>{
    try{
        const response=await api.profileApi();
        return response.data;
    }catch(error){
        return rejectWithValue(error.response?.data?.message || error.message);
    }
})
