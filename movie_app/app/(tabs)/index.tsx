import { Text, View, Image, ScrollView, ActivityIndicator, FlatList } from "react-native";
import { Link } from "expo-router";
import React from "react";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";

export default function Index() {
    const router = useRouter()

    const { data: movies, loading: moviesloading, error: moviesError } = useFetch(() => fetchMovies( { 
      query: ''
    
    }))

  return (
    <View className = "flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{minHeight: "100%", paddingBottom: 10}}>
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto"/>
        {moviesloading?(
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ): moviesError ? (
          <Text>Error:{moviesError?.message}</Text>
        ) :(

          <View>
            <SearchBar
            onPress={()=> router.push("/search")}
            placeHolder="Search for a movie"
            />
            <>
              <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>
              <FlatList 
                data={movies}
                renderItem={({item}) => (
                  <Text className="text-white text-sm">{item.title}</Text>
                )}
                keyExtractor={(item)=> item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: 'flex-start',
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10
                }}
                className="mt-2 pb-32"
              />
            </>
          </View>
        )
      }
      </ScrollView>
    </View>
  );
}
