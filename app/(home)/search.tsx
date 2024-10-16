import { View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import UserItem from "@/components/search/UserItem";
import { addFriend, searchUsers, unfriend } from "@/service/api/userService";
import { getAllConversations } from "@/service/api/chatService";
import { searchStyles } from "@/styles/searchStyles";
import SearchBar from "@/components/search/SearchBar";

const Search = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchData, setSearchData] = React.useState([]);

  const searchUser = async () => {
    const data = await searchUsers(searchQuery);
    setSearchData(data);
  };

  useEffect(() => {
    if(searchQuery.length>3){
      searchUser();
    }
  },[searchQuery])

  useEffect(() => {
    getAllConversations();
  },[])

  const renderUsers = ({ item }: any) => {
    return (
      <UserItem
        item={item}
        onUnfriend={async () => {
          await unfriend(item.id);
          searchUser();
          await getAllConversations();
        }}
        onSendRequests={async () => {
          await addFriend(item.id);
          searchUser();
        }}
      />
    );
  };

  return (
    <View style={searchStyles.container} >
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} title="Search" />
      <FlatList 
        data={searchData}
        renderItem={renderUsers}
        keyExtractor={(item: any) => item.id}
        initialNumToRender={5}
        contentContainerStyle={searchStyles.scrollContainer}
      />
    </View>
  );
};

export default Search;
