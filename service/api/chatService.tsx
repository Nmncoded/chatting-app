import { appAxios } from "./apiInterceptors";
import { useChatStore } from "../chatStore";


export const getAllConversations = async () => { 
  try {
    const apiRes = await appAxios.get('/chat');
    const {setConversations} = useChatStore.getState();
    setConversations(apiRes.data) 
  } catch (error) {
    console.log('getAllConversations',error);
    return null;
  }
}