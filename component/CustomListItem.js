import { View, Text } from "react-native";
import React from "react";
import { ListItem, Avatar } from "@rneui/themed";

const CustomListItem = ({ id, chatName, enterChat }) => {
  return (
    <ListItem bottomDivider>
      <Avatar
        rounded
        source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>John Doe</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1}>
          President Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;
