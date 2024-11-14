import axios from "axios";

export const getUser = (id) => async (dispatch) => {
    try {
        const {data} = await axios.get(`https://ferretodo.onrender.com/user/profile/${id}`, { withCredentials: true })
        return dispatch({type: 'GET_USER', payload: data})
    } catch (error) {
        throw new Error({msg: 'Usuario no encontrado'})
    }
}

export const updateUser = (id, changes) => async (dispatch) => {
    try {
        const {data} = await axios.put(`https://ferretodo.onrender.com/user/profile/${id}`, changes, { withCredentials: true })
        return dispatch({type: 'UPDATE_USER', payload: dispatch(getUser(id))})
    } catch (error) {
        throw new Error({msg: 'Ups'})
    }
}