import { useLocalSearchParams } from "expo-router";
import { ArrowLeft, Heart, Home } from "lucide-react-native";
import { ScrollView, Text } from "react-native";

export default function Details() {
  const params = useLocalSearchParams();
  const { name } = useLocalSearchParams();

  console.log(params);

  const capitalPokemonName = (params: string) => {
    return params.toUpperCase();
  };
  return (
    <>
      <ScrollView
        contentContainerStyle={{
          gap: 16,
          padding: 16,
          borderRadius: 20,
        }}
      >
        <Home size={24} color="black" />
        <Heart size={24} color="red" />
        <ArrowLeft size={24} color="black" />
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          {capitalPokemonName(params.name as string)}
        </Text>
      </ScrollView>
    </>
  );
}
