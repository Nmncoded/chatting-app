import axios from "axios";
import { BASE_URL } from "../config";
import { resetAndNavigate } from "@/utils/LibraryHelpers";
import { tokenStorage } from "../storage";

export const appAxios = axios.create({
  baseURL: BASE_URL,
  // headers: {
  //   'Content-Type': 'application/json',
  // },
})
export const refresh_tokens = async () => {
  try {
    const refreshToken = tokenStorage.getString('refreshToken');
    const response = await axios.post(`${BASE_URL}/oauth/refresh-token`, {refresh_token: refreshToken}); 
    
    const new_access_token = response.data.access_token;
    const new_refresh_token = response.data.refresh_token;
    tokenStorage.set('accessToken', new_access_token);
    tokenStorage.set('refreshToken', new_refresh_token);
    return new_access_token;
    
  } catch (error) {
    console.log('REFRESH TOKEN ERROR', error);
    tokenStorage.clearAll();
    resetAndNavigate('/(auth)/signin')
  }
}

appAxios.interceptors.request.use(
  async (config) => {
    const token = tokenStorage.getString('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

appAxios.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.response) {
      try {
        const newToken = await refresh_tokens();
        if(newToken){
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axios(originalRequest);
        }
      } catch (error) {
        console.log('REFRESH TOKEN ERROR', error);
        tokenStorage.clearAll();
        resetAndNavigate('/(auth)/signin')
      }
    }
    if(error.response.status !== 401 && error.response){
      return Promise.reject(error.response);
    }
  }
)