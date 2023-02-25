import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import useProfilePicture from "../hooks/useProfilePicture";
import { createUser } from "../utils/accounts";

export default TestComponent = () => {
  return (
    <View>
      <Text
        onPress={() => {
          createUser("hello@email.com", "fuck_mom");
        }}
      >
        Fuck
      </Text>
    </View>
  );
};
