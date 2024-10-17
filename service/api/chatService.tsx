import { appAxios } from "./apiInterceptors";
import { useChatStore } from "../chatStore";
import { useState } from "react";


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


export const fetchPaginatedChats = async (conversationId: string, page:number=1) => { 
  try {
    const apiRes = await appAxios.get(`/chat/paginated-chats?conversationId=${conversationId}&page=${page}`);
    return apiRes.data;
  } catch (error) {
    console.log('fetchPaginatedChats ERROR',error);
    return null;
  }
}

const updateChatStore = (conversationId: string, newMessages: any[]) => {
  const {setConversations, conversations} = useChatStore.getState();
  const updatedConversations = conversations.map((convo:any) => {
      if(convo.conversationId === conversationId){

        const existingMessageIds = new Set(convo.messages.map((message:any) => message.id));
        const uniqueNewMessages = newMessages.filter((message:any) => !existingMessageIds.has(message.id));
        const allMessages = [...uniqueNewMessages, ...convo.messages];
        // console.log("usePaginatedChats updateChatStore : ---- ", allMessages);
        const sortedMessages = allMessages.sort((a:any, b:any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        return {...convo, messages: sortedMessages}
      }
      return convo;
  })

  setConversations(updatedConversations);
  
}

export const usePaginatedChats = (conversationId: string) => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMoreChats, setHasMoreChats] = useState(true);

  const loadMoreChats = async () => {
    if (loading || !hasMoreChats) return;
    setLoading(true);
    const data = await fetchPaginatedChats(conversationId, page);
    // console.log("usePaginatedChats : ---- ",data.messages,conversationId, page);
    if(data && data?.messages.length>0){
      updateChatStore(conversationId, data.messages);
      setPage(page+1);
    }else{
      setHasMoreChats(false);
    }
    setLoading(false);
  }

  return {loadMoreChats, loading, hasMoreChats, setLoading};
  
}