import actionTypes from "./actionType";
import { apiRegister, apiLogin } from "../../services/auth";
import axios from 'axios';

export const  register = (payload) => async (dispatch) =>{
    try {
      const response = await apiRegister(payload) 
      // console.log(response)
      if(response?.data.err === 0){
        dispatch({
            type: actionTypes.REGISTER_SUCCESS,
            data:  response.data.token
        })
      }else{
        dispatch({
            type: actionTypes.REGISTER_FAIL,
            data: response.data.msg
        })
      }
    } catch (error) {
        dispatch({
            type: actionTypes.REGISTER_FAIL,
            data: null
        })
    }
}
// /////////////////////////////////////////////////////////////////////////

// export const  login = (payload) => async (dispatch) =>{
//   try {
//     const response = await apiLogin(payload) 
//     console.log(response.data)
//     if(response?.data.err === 0){
//       dispatch({
//           type: actionTypes.LOGIN_SUCCESS,
//           data:  response.data.token
//       })
//     }else{
//       dispatch({
//           type: actionTypes.LOGIN_FAIL,
//           data: response.data.msg
//       })
//     }
//   } catch (error) {
//       dispatch({
//           type: actionTypes.LOGIN_FAIL,
//           data: null
//       })
//   }
// }

export const login = (payload) => async (dispatch) => {
  try {
      const response = await apiLogin(payload);
      // console.log('Response from server:', response.data); // Log response

      if (response?.data.err === 0) {
          dispatch({
              type: actionTypes.LOGIN_SUCCESS,
              data: response.data.token,
          });
      } else {
          dispatch({
              type: actionTypes.LOGIN_FAIL,
              data: response.data.mgs || 'Login failed. Please try again.', // Sử dụng đúng key 'mgs'
          });
      }
  } catch (error) {
      console.error('Login error:', error); // Log lỗi nếu có
      dispatch({
          type: actionTypes.LOGIN_FAIL,
          data: 'Login failed. Please try again.', // Thêm fallback message
      });
  }
};


export const logout  = () => ({
  type: actionTypes.LOGOUT
})
