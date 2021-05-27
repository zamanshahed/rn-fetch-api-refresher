import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";

const dataUrl = "https://reactnative.dev/movies.json";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [movieTitle, setMovieTitle] = useState([]);
  const [description, setDescription] = useState([]);

  useEffect(() => {
    fetch(dataUrl)
      .then((response) => response.json())
      .then((json) => {
        setData(json.movies);
        setMovieTitle(json.title);
        setDescription(json.description);
      })
      .catch((err) => alert(err))
      .finally(() => setIsLoading(false));
  });

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <Text
            style={{
              color: "blue",
              fontSize: 21,
              fontWeight: "bold",
              padding: 22,
            }}
          >
            {movieTitle}
          </Text>
          <Text
            style={{
              color: "green",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {description}
          </Text>
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => {
              return (
                <Text style={{ color: "red", fontSize: 19, marginTop: 22 }}>
                  {item.title} ... {item.releaseYear}
                </Text>
              );
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 41,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
});

export default App;
