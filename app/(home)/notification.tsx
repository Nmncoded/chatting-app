import { View, Text, FlatList, RefreshControl } from 'react-native'
import React, { useEffect } from 'react'
import { useUserStore } from '@/service/userStore'
import NotificationItem from '@/components/search/NotificationItem';
import { getAllFriendRequests, onHandleRequest } from '@/service/api/userService';
import { getAllConversations } from '@/service/api/chatService';
import { searchStyles } from '@/styles/searchStyles';
import SearchBar from '@/components/search/SearchBar';
import CustomText from '@/components/ui/CustomText';

const Notification = () => {
  const {requests} = useUserStore();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isRefreshing, setIsRefreshing] = React.useState(false);


  useEffect(() => {
    getAllFriendRequests();
  },[])

  const refreshHandler = async () => {
    setIsRefreshing(true);
    await getAllFriendRequests();
    setIsRefreshing(false);
  };


  const renderUsers = ({ item }: any) => {
    return (
      <NotificationItem
        item={item}
        onRejectRequest={async () => {
          await onHandleRequest(item._id,'REJECT');
          getAllFriendRequests();
        }}
        onAcceptRequest={async () => {
          await onHandleRequest(item._id,'ACCEPT');
          getAllFriendRequests();
          getAllConversations();
        }}
      />
    );
  };

  return (
    <View style={searchStyles.container} >
    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} title="Notifications" />
    <FlatList 
      data={requests}
      ListEmptyComponent={<CustomText>No new requests!</CustomText>}
      renderItem={renderUsers}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refreshHandler} />}
      keyExtractor={(item: any) => item.id}
      initialNumToRender={5}
      contentContainerStyle={searchStyles.scrollContainer}
    />
  </View>
  )
}

export default Notification