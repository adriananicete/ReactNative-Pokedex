import { Search, Settings2 } from "lucide-react-native";
import { Text, TextInput, View } from "react-native";

function HomeScreen() {
  return (
    <View style={{}}>
      <Text
        style={{
          fontSize: 30,
          fontFamily: "Poppins_700Bold",
        }}
      >
        Pokedex
      </Text>
      <Text
        style={{
          fontSize: 16,
        }}
      >
        Search for a Pokemon by name or using its National Pokedex number.
      </Text>

      <View
        style={{
          padding: 5,
          backgroundColor: "#ebf3f5",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Search />
        <TextInput
          placeholder="What pokemon are you looking for?"
          style={{
            padding: 10,
          }}
        />

        <View
          style={{
            backgroundColor: "#5d5f7c",
            padding: 10,
          }}
        >
          <Settings2 color={"white"} />
        </View>
      </View>
    </View>
  );
}

export default HomeScreen;
