import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { chatStyles } from "@/styles/chatStyles";
import ChatHeader from "@/components/chat/ChatHeader";
import Chat from "@/components/chat/Chat";
import SendButton from "@/components/chat/SendButton";

const Page = () => {
  const route = useRoute() as any;
  const item = route?.params;
  const [heightOfMessageBox, setHeightOfMessageBox] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  return (
    <View style={chatStyles.container} >
      <ChatHeader item={item} />
      <Image source={require('@/assets/images/pattern.png')} style={chatStyles.background} />
      <Chat heightOfMessageBox={heightOfMessageBox} messages={[]} onLoadMore={() => {}} loading={false} />
      <SendButton item={item} isTyping={isTyping} setHeightOfMessageBox={setHeightOfMessageBox} setIsTyping={setIsTyping} />
    </View>
  );
};

export default Page;
