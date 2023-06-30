import { View, Text } from "react-native";
import React from "react";
import { ListItem, Avatar } from "@rneui/themed";

const CustomListItem = ({ id, data, enterChat }) => {
  return (
    <ListItem bottomDivider onPress={() => enterChat(id, data)}>
      <Avatar
        rounded
        source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {data.chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1}>ABCVC</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;
