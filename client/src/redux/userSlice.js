import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
      isAuthenticated: false,
      token: ''
      
    }, 
    reducers: {
        saveUser: (state, action) =>{
            state.token = action.payload
            state.isAuthenticated = true
        }
    }
})

export const sendRegistrDataThunk = (email, password) => {
    return () => {
        axios.post(`http://localhost:5000/auth/register`, {email, password})
    }
}

export const sendLoginDataThunk = (email, password) => {
    return async (dispatch) => {
       
        const response = await axios.post (`http://localhost:5000/auth/login`, {email, password})
      
        dispatch(saveUser(response.data.token))
       

    }
}
 
export const {saveUser} = userSlice.actions
export default userSlice.reducer