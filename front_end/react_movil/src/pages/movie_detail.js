import React, { Component } from "react";
import {
  AsyncStorage,
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  TouchableHighlight
} from "react-native";
import axios from "axios";
import { Link } from "react-router-native";
import { RadioButton } from "react-native-paper";

const API = "http://192.168.100.116:5000/film/";

export default class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: "",
      pelicula: [],
      sala_peliculas: [],
      //
      idpelicula: ""
    };
  }

  getData = () => {
    axios
      .get(`${API}pelicula?id=${this.state.idpelicula}`)
      .then(response => {
        this.setState({ pelicula: response.data.datos });
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get(`${API}raw2?idpelicula=${this.state.idpelicula}`)
      .then(response => {
        this.setState({ sala_peliculas: response.data.datos });
      })
      .catch(error => {
        console.log(error);
      });
  };

  asyncstorageSave_idsala_peliculas = async id => {
    try {
      await AsyncStorage.setItem("idsala_peliculas", id.toString());
    } catch (err) {
      alert(err);
    }
  };

  asyncstorageSave_idpelicula_titulo = async item => {
    try {
      await AsyncStorage.setItem("idpelicula_titulo", item.toString());
    } catch (err) {
      alert(err);
    }
  };

  asyncstorageSave_idhorario_hora = async item => {
    try {
      await AsyncStorage.setItem("idhorario_hora", item.toString());
    } catch (err) {
      alert(err);
    }
  };

  asyncstorageSave_idsala_nombre = async item => {
    try {
      await AsyncStorage.setItem("idsala_nombre", item.toString());
    } catch (err) {
      alert(err);
    }
  };

  asyncstorageGet = async () => {
    try {
      const idfilm = await AsyncStorage.getItem("idpelicula");
      this.setState({ idpelicula: idfilm });
      this.getData();
    } catch (e) {
      alert(e);
    }
  };

  asyncstorageClear = async () => {
    try {
      await AsyncStorage.clear();
      this.setState({ idpelicula: "" });
    } catch (e) {
      alert(e);
    }
  };

  componentDidMount() {
    this.asyncstorageGet();
  }

  render() {
    const { pelicula, sala_peliculas, checked } = this.state;
    return (
      <ImageBackground
        style={styles.container}
        source={require("../../assets/bg.jpg")}
      >
        <View>
          <Text style={styles.header}>DETALLE PELÍCULA</Text>
        </View>
        <ScrollView>
          {pelicula.map(element => (
            <View style={styles.card} key={element.id}>
              <Text style={styles.title}>{element.titulo}</Text>
              <Image
                source={{ uri: `${element.imagen}` }}
                style={styles.image}
              ></Image>
              <View style={{ marginTop: 20 }}>
                <View key={element.id}>
                  <View>
                    <Text style={styles.text}>
                      Resumen:{" "}
                      <Text style={{ color: "#fff" }}>{element.resumen}</Text>
                    </Text>
                    <Text style={styles.text}>
                      Categoría:{" "}
                      <Text style={{ color: "#fff" }}>{element.categoria}</Text>
                    </Text>
                    <Text style={styles.text}>
                      Valor:{" "}
                      <Text style={{ color: "#fff" }}>
                        {element.valorboleto} $
                      </Text>
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
          <View style={styles.card}>
            <Text style={styles.title}>Horarios Disponibles</Text>
            {sala_peliculas.map(element => (
              <View key={element.id} style={styles.card_horarios}>
                <Text>Horario: {element.idhorario_hora}</Text>
                <Text>Sala: {element.idsala_nombre}</Text>
                <RadioButton
                  value={element.id}
                  status={checked === element.id ? "checked" : "unchecked"}
                  onPress={() => {
                    this.setState({ checked: element.id }),
                      this.asyncstorageSave_idsala_peliculas(element.id),
                      this.asyncstorageSave_idpelicula_titulo(
                        element.idpelicula_titulo
                      ),
                      this.asyncstorageSave_idhorario_hora(
                        element.idhorario_hora
                      ),
                      this.asyncstorageSave_idsala_nombre(
                        element.idsala_nombre
                      );
                  }}
                />
              </View>
            ))}

            <View style={styles.fixToText}>
              <TouchableHighlight>
                <Link
                  to="/"
                  style={styles.button1}
                  onPress={() => this.asyncstorageClear()}
                >
                  <Text style={{ color: "#fff" }}>Volver</Text>
                </Link>
              </TouchableHighlight>
              <TouchableHighlight>
                <Link to="/buy_tickets" style={styles.button2}>
                  <Text style={{ color: "#fff" }}>Comprar</Text>
                </Link>
              </TouchableHighlight>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%"
  },
  card: {
    width: 350,
    height: 560,
    backgroundColor: "#307cb1a3",
    // opacity: 0.8,
    left: 25,
    borderRadius: 10,
    padding: 20,
    marginBottom: 30
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    marginTop: 50,
    marginBottom: 25
  },
  image: {
    left: 70,
    width: 170,
    height: 300,
    borderRadius: 10
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 25,
    color: "#fff",
    marginBottom: 20
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#30b1a5"
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50
  },
  button1: {
    borderRadius: 100,
    backgroundColor: "#32a58a",
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  button2: {
    borderRadius: 100,
    backgroundColor: "#4bcde2",
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  card_horarios: {
    backgroundColor: "#ffffffa3",
    borderRadius: 10,
    padding: 20,
    marginBottom: 10
  }
});
