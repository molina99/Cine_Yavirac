import React, { Component } from "react";
import { Link } from "react-router-native";
import axios from "axios";
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  ScrollView
} from "react-native";

const API = "http://192.168.100.116:5000/film/pelicula";

export default class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peliculas: []
    };
  }

  componentDidMount() {
    axios
      .get(API)
      .then(response => {
        this.setState({ peliculas: response.data.datos });
      })
      .catch(error => {
        console.log(error);
      });
  }

  asyncstorageSave = async idpelicula => {
    try {
      await AsyncStorage.setItem("idpelicula", idpelicula.toString());
    } catch (err) {
      alert(err);
    }
  };

  render() {
    const { peliculas } = this.state;
    return (
      <ImageBackground
        style={styles.container}
        source={require("../../assets/bg.jpg")}
      >
        <View>
          <View>
            <Text style={styles.cartelera}>CARTELERA</Text>
          </View>
          <ScrollView>
            {peliculas.map(element => (
              <Link
                to="/movie_detail"
                key={element.id}
                onPress={() => this.asyncstorageSave(element.id)}
              >
                <View style={styles.menuContainer}>
                  <View style={styles.menuItem}>
                    <View>
                      <Image
                        source={{ uri: `${element.imagen}` }}
                        style={styles.image}
                      ></Image>
                      <Text style={styles.title_movies}>{element.titulo}</Text>
                    </View>
                  </View>
                </View>
              </Link>
            ))}
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%"
  },
  cartelera: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    marginTop: 50,
    marginBottom: 25
  },
  image: {
    width: 300,
    height: 500,
    borderColor: "#fff",
    borderWidth: 2
  },
  menuContainer: {
    marginBottom: 50
  },
  text: {
    color: "#fff"
  },
  menuItem: {
    paddingHorizontal: 50,
    marginBottom: 100
  },
  title_movies: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 30,
    marginTop: 10
  }
});
