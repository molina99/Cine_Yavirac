import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableHighlight,
  TextInput,
  AsyncStorage
} from "react-native";
import { Card } from "react-native-elements";
import { Link } from "react-router-native";
import axios from "axios";

const API = "http://192.168.100.116:5000/film/";

export default class SendTickets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      correo: "",
      sala: "",
      pelicula: "",
      horario: "",
      boletos: ""
    };
  }

  handleCorreo = text => {
    this.setState({ correo: text });
  };

  saveData = () => {
    this.post = {
      correo: this.state.correo,
      sala: this.state.sala,
      pelicula: this.state.pelicula,
      horario: this.state.horario,
      boletos: this.state.boletos
    };

    if (
      this.post.correo === "" ||
      this.post.sala === "" ||
      this.post.pelicula === "" ||
      this.post.horario === "" ||
      this.post.boletos === ""
    ) {
      alert("Complete todos los datos para continuar...");
    } else {
      axios
        .post(API + "send_mail", this.post)
        .then(response => {
          if (response.data.ok === true) {
            alert("Correo Enviado!");
          }
        })
        .catch(error => {
          alert(error);
        });
    }
  };

  asyncstorageGet = async () => {
    try {
      const idpelicula_titulo = await AsyncStorage.getItem("idpelicula_titulo");
      this.setState({ pelicula: idpelicula_titulo });
      const idhorario_hora = await AsyncStorage.getItem("idhorario_hora");
      this.setState({ horario: idhorario_hora });
      const idsala_nombre = await AsyncStorage.getItem("idsala_nombre");
      this.setState({ sala: idsala_nombre });
      const numero_boletos = await AsyncStorage.getItem("numero_boletos");
      this.setState({ boletos: numero_boletos });
    } catch (e) {
      alert(e);
    }
  };

  asyncstorageClear = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      alert(e);
    }
  };

  componentDidMount() {
    this.asyncstorageGet();
  }

  render() {
    return (
      <ImageBackground
        style={styles.container}
        source={require("../../assets/bg.jpg")}
      >
        <View>
          <Text style={styles.header}>Envío de informe</Text>
        </View>
        <View style={styles.card2}>
          <TextInput
            placeholder="user@gmail.com"
            underlineColorAndroid="transparent"
            style={styles.input}
            keyboardType={"default"}
            onChangeText={this.handleCorreo}
          />
          <View style={styles.fixToText}>
            <TouchableHighlight>
              <Link
                to="/"
                style={styles.button1}
                onPress={() => this.asyncstorageClear()}
              >
                <Text style={{ color: "#fff" }}>Cancelar</Text>
              </Link>
            </TouchableHighlight>
            <TouchableHighlight>
              <Link
                to="/"
                style={styles.button2}
                onPress={() => this.saveData()}
              >
                <Text style={{ color: "#fff" }}>Enviar comprobante</Text>
              </Link>
            </TouchableHighlight>
          </View>
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
    height: 170,
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
  input: {
    backgroundColor: "#ffffff2e",
    color: "#000",
    borderRadius: 10,
    paddingHorizontal: 20
  }
});
