import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableHighlight,
  ScrollView,
  TextInput,
  AsyncStorage
} from "react-native";
import { Link } from "react-router-native";
import axios from "axios";

const API = "http://192.168.100.116:5000/film/";

export default class BuyTickets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pelicula: [],
      idpelicula: "",
      idsala_peliculas: "",
      numero_boletos: ""
    };
  }

  handleNumeroBoletos = text => {
    this.setState({ numero_boletos: text });
  };

  getData = () => {
    axios
      .get(`${API}pelicula?id=${this.state.idpelicula}`)
      .then(response => {
        this.setState({ pelicula: response.data.datos });
      })
      .catch(error => {
        console.log(error);
      });
  };

  saveData = () => {
    this.post = {
      idsala_peliculas: this.state.idsala_peliculas,
      numero_boletos: this.state.numero_boletos
    };

    if (this.post.idsala_peliculas === "" || this.post.numero_boletos === "") {
      alert("Complete todos los datos para continuar...");
    } else {
      axios
        .post(API + "compra", this.post)
        .then(response => {
          if (response.data.ok === true) {
            alert(
              "Compra exito, por favor ingrese su correo electrónico para enviar su comprobante"
            );
          }
        })
        .catch(error => {
          alert(error);
        });
    }
  };

  asyncstorageGet = async () => {
    try {
      const idfilm = await AsyncStorage.getItem("idpelicula");
      this.setState({ idpelicula: idfilm });
      const idroom_movies = await AsyncStorage.getItem("idsala_peliculas");
      this.setState({ idsala_peliculas: idroom_movies });
      this.getData();
    } catch (e) {
      alert(e);
    }
  };

  asyncstorageSave = async item => {
    try {
      await AsyncStorage.setItem("numero_boletos", item.toString());
    } catch (err) {
      alert(err);
    }
  };

  asyncstorageClear = async () => {
    try {
      await AsyncStorage.clear();
      this.setState({ idpelicula: "", idsala_peliculas: "" });
    } catch (e) {
      alert(e);
    }
  };

  componentDidMount() {
    this.asyncstorageGet();
  }

  render() {
    const { pelicula } = this.state;
    return (
      <ImageBackground
        style={styles.container}
        source={require("../../assets/bg.jpg")}
      >
        <View>
          <View>
            <Text style={styles.header}>COMPRAR BOLETOS</Text>
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
                        <Text style={{ color: "#fff" }}>
                          {element.categoria}
                        </Text>
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
            <View style={styles.card2}>
              <Text style={styles.title}>Número de boletos</Text>
              <TextInput
                placeholder="Ingrese el número de boletos que desea"
                underlineColorAndroid="transparent"
                style={styles.input}
                keyboardType={"numeric"}
                onChangeText={this.handleNumeroBoletos}
              />
              <View style={styles.fixToText}>
                <TouchableHighlight>
                  <Link
                    to="/movie_detail"
                    style={styles.button1}
                    onPress={() => this.asyncstorageClear()}
                  >
                    <Text style={{ color: "#fff" }}>Volver</Text>
                  </Link>
                </TouchableHighlight>
                <TouchableHighlight>
                  <Link
                    to="/send_tickets"
                    style={styles.button2}
                    onPress={() => {
                      this.asyncstorageSave(this.state.numero_boletos),
                        this.saveData();
                    }}
                  >
                    <Text style={{ color: "#fff" }}>Confirmar</Text>
                  </Link>
                </TouchableHighlight>
              </View>
            </View>
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
  card2: {
    width: 350,
    height: 200,
    backgroundColor: "#307cb1a3",
    // opacity: 0.8,
    left: 25,
    borderRadius: 10,
    padding: 20,
    marginBottom: 140
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
    marginTop: 20
  },
  button1: {
    borderRadius: 100,
    backgroundColor: "#32a58a",
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  button2: {
    borderRadius: 100,
    backgroundColor: "#eacc30b3",
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  input: {
    backgroundColor: "#ffffff2e",
    color: "#000",
    borderRadius: 10,
    paddingHorizontal: 20
  }
});
