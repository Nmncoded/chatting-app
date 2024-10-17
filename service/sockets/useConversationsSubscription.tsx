import { useEffect } from "react";
import { useChatStore } from "../chatStore";
import { useWS } from "./WSProvider";
import { useAuthStore } from "../authStore";

export const useConversationsSubscription = () => {
  const socketService = useWS();
  const {conversations, setConversations} = useChatStore();

  useEffect(() => {
    if(!socketService)return

    const conversationIds = conversations.map(convo => convo.conversationId);
    if(conversationIds.length > 0){
      socketService.emit('subscribeToConversations',conversationIds);
    }

    const handleNewMessage = ({message,conversationId}: any) => { 
      const updatedConversations = conversations.map(convo => {
        if(convo.conversationId === conversationId){
          return {
            ...convo,
            messages: [message,...convo.messages]
          }
        }
        return convo
      });
      // console.log('handleNewMessage socket', message, conversationId, updatedConversations[0].messages[updatedConversations[0].messages?.length-1]?.content,  updatedConversations[0].messages[0]?.content,  updatedConversations[0].messages[1]?.content);
      setConversations(updatedConversations);
    }

    const handleMessageSeen = ({messageId,conversationId, userId}: any) => { 
      const updatedConversations = conversations.map(convo => {
        if(convo.conversationId === conversationId){
          return {
            ...convo,
            messages: convo.messages.map((message:any) => {
              if(message.id === messageId){
                return {
                  ...message,
                  is_seen: true
                }
              }
              return message
            })
          }
        }
        return convo
      });
      setConversations(updatedConversations);
    }

    const handleTypingStatus = ({isTyping,conversationId, userId}: any) => { 
      const {user} = useAuthStore.getState();
      const updatedConversations = conversations.map(convo => {
        if(convo.conversationId === conversationId){
          if(isTyping){
            const existingTypingMessage = convo.messages.find((message:any) => message.isTyping && message.sender === userId);
            if(!existingTypingMessage){
              const typingMessage = {
                sender: userId,
                type: 'TEXT',
                content:'',
                isTyping: true,
                id: conversations?.length +1,
                is_seen: false,
                is_delivered: false,
                isDeleted: false,
                deletedFor: [],
                createdAt: new Date(),
              }
              convo.is_typing = true;
              convo.messages.unshift(typingMessage);
            }
          }else{
            convo.is_typing = false;
            convo.messages = convo.messages.filter(
              (message:any) => !(message.isTyping && message.sender === userId)
            )
          }
        }
        return convo;
      });
      setConversations(updatedConversations);
    }

    socketService.on('NEW_MESSAGE',handleNewMessage);
    socketService.on('MESSAGE_SEEN',handleMessageSeen);
    socketService.on('TYPING_STATUS',handleTypingStatus);

    return ( ) => {
      socketService.off('NEW_MESSAGE');
      socketService.off('MESSAGE_SEEN');
      socketService.off('TYPING_STATUS');
    }

  },[conversations, socketService, setConversations])
}