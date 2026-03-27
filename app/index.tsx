import { Link } from "expo-router";
import { LayoutDashboard } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import HomeScreen from "../src/screens/HomeScreen.js";

interface Pokemon {
  name: string;
  image: string;
  imageBack: string;
  types: PokemonType[];
}

interface PokemonType {
  type: {
    name: string;
    url: string;
  };
}

const colorsByType = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#c4e4d5",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

export default function Index() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?limit=20",
      );
      const data = await response.json();

      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          return {
            name: pokemon.name,
            image: details.sprites.front_default,
            imageBack: details.sprites.back_default,
            types: details.types,
          };
        }),
      );

      setPokemons(detailedPokemons);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{
        gap: 16,
        padding: 16,
      }}
    >
      <LayoutDashboard size={20} />
      <HomeScreen />
      {pokemons.map((pokemon) => (
        <Link
          key={pokemon.name}
          href={{ pathname: "/details", params: { name: pokemon.name } }}
          style={{
            // @ts-ignore
            backgroundColor: colorsByType[pokemon.types[0].type.name],
            borderRadius: 20,
            padding: 20,
            textAlign: "center",
          }}
        >
          <View>
            <Text style={style.name}>{pokemon.name}</Text>
            <Text style={style.type}>{pokemon.types[0].type.name}</Text>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Image
                source={{ uri: pokemon.image }}
                style={{
                  width: 100,
                  height: 100,
                }}
              />

              <Image
                source={{ uri: pokemon.imageBack }}
                style={{
                  width: 100,
                  height: 100,
                }}
              />
            </View>
          </View>
        </Link>
      ))}
    </ScrollView>
  );
}

const style = StyleSheet.create({
  name: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
  },
  type: {
    fontSize: 20,
    color: "gray",
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
  },
});
