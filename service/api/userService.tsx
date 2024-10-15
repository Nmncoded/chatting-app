import axios from "axios";
import { appAxios } from "./apiInterceptors";
import { BASE_URL } from "../config";
import { useUserStore } from "../userStore";


export const getAllFriendRequests = async () => { 
  try {
    // const URL = `${BASE_URL}/request/list`;
    const apiRes = await appAxios.get('/request/list');
    const {setRequests} = useUserStore.getState();
    setRequests(apiRes.data) 
  } catch (error) {
    console.log('getAllFriendRequests',error);
    return null;
  }
}