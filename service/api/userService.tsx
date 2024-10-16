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

export const searchUsers = async (searchQuery:string) => { 
  try {
    const apiRes = await appAxios.get(`/user/search/${searchQuery}`);
    console.log('searchUsers',apiRes.data);
    return apiRes.data;
  } catch (error) {
    console.log('searchUsers ERROR',error);
    return [];
  }
}

export const addFriend = async (receiverId:string) => { 
  try {
    const apiRes = await appAxios.post(`/request/send`,{receiverId});
    return true;
  } catch (error) {
    console.log('addFriend ERROR',error);
    throw error;
  }
}

export const unfriend = async (friendId:string) => { 
  try {
    const apiRes = await appAxios.post(`/request/unfriend`,{friendId});
    return true;
  } catch (error) {
    console.log('unfriend ERROR',error);
    throw error;
  }
}

export const connectedFriends = async () => { 
  try {
    const apiRes = await appAxios.get(`/user/connected`);
    return apiRes.data;
  } catch (error) {
    console.log('connectedFriends ERROR',error);
    return [];
  }
}

export const onHandleRequest = async (requestId:string, action : 'ACCEPT' | 'REJECT') => { 
  try {
    const apiRes = await appAxios.post(`/request/handle`,{requestId, action});
    return true;
  } catch (error) {
    console.log('onHandleRequest ERROR',error);
    throw error;
  }
}