/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import Header from "../components/header";
import axios from "axios";

const API = "http://localhost:5000/film/";
const API_RAW = "http://localhost:5000/film/raw3";
const API_DELETE = "http://localhost:5000/film/sala_pelicula";

class FilmsRoomAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      salas: [],
      peliculas: [],
      horarios: [],
      idsala: "",
      idpelicula: "",
      idhorario: "",
      sala_peliculas: []
    };
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    axios
      .get(API + "sala")
      .then(response => {
        this.setState({ salas: response.data.datos });
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get(API + "pelicula")
      .then(response => {
        this.setState({ peliculas: response.data.datos });
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get(API + "horario")
      .then(response => {
        this.setState({ horarios: response.data.datos });
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get(API_RAW)
      .then(response => {
        this.setState({ sala_peliculas: response.data.datos });
      })
      .catch(error => {
        console.log(error);
      });
  }

  registerSalaPelicula = e => {
    e.preventDefault();
    this.post = {
      idsala: this.state.idsala,
      idpelicula: this.state.idpelicula,
      idhorario: this.state.idhorario
    };

    if (
      this.post.idsala === "" ||
      this.post.idpelicula === "" ||
      this.post.idhorario === ""
    ) {
      alert("Obligatorio completar todos los campos");
    } else {
      axios
        .post(API + "sala_pelicula", this.post)
        .then(response => {
          alert("SalaPelicula registrada correctamente");
          window.location.assign("http://localhost:3000/films_room_add");
        })
        .catch(error => {
          alert("Datos Incorrectos");
        });
    }
  };

  deleteData = value => {
    axios.delete(`${API_DELETE}?id=${value}`, {
      data: { id: value }
    });
    window.location.assign("http://localhost:3000/films_room_add");
  };

  render() {
    const {
      salas,
      peliculas,
      sala_peliculas,
      horarios,
      idsala,
      idpelicula,
      idhorario
    } = this.state;
    return (
      <div className="bg-blue-200">
        <Header />
        <div className="mt-5 bg-white border-t rounded shadow mx-16">
          <div className="border px-6">
            <div className="text-center py-5">
              <span className="uppercase text-xl font-medium">
                Asignación Salas ~ Películas
              </span>
            </div>
          </div>

          <div className="py-8 mx-10">
            <form className="" onSubmit={this.registerSalaPelicula}>
              <div className="flex items-center">
                <label className="mr-3 text-xl">Película:</label>
                <select
                  className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
                  name="idpelicula"
                  value={idpelicula}
                  onChange={this.changeHandler}
                >
                  <option className="text-sm text-gray-600">
                    Seleccione pelicula....
                  </option>
                  {peliculas.map(element => (
                    <option key={element.id} value={element.id}>
                      {" "}
                      {element.titulo}{" "}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center mt-5">
                <label className="mr-3 text-xl">Sala:</label>
                <select
                  className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
                  name="idsala"
                  value={idsala}
                  onChange={this.changeHandler}
                >
                  <option className="text-sm text-gray-600">
                    Seleccione salas....
                  </option>
                  {salas.map(element => (
                    <option key={element.id} value={element.id}>
                      {" "}
                      {element.nombre}{" "}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center mt-5">
                <label className="mr-3 text-xl">Horario:</label>
                <select
                  className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
                  name="idhorario"
                  value={idhorario}
                  onChange={this.changeHandler}
                >
                  <option className="text-sm text-gray-600">
                    Seleccione horario....
                  </option>
                  {horarios.map(element => (
                    <option key={element.id} value={element.id}>
                      {" "}
                      {element.hora}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-5">
                <button
                  className="mx-auto bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Crear
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="flex-grow container mx-auto sm:px-4 pt-6 pb-8">
          <div className="bg-white border-t border-b sm:border-l sm:border-r sm:rounded shadow mb-6">
            <div className="border-b-2 px-6">
              <div className="text-center py-5">
                <span className="uppercase text-xl font-medium">
                  Lista de salas ~ películas asignadas
                </span>
              </div>
            </div>
            <div className="">
              <table className="w-full text-md bg-white rounded mb-4 mt-4 text-center">
                <thead className="border-b">
                  <tr>
                    <th className="p-3 px-5 uppercase">Película</th>
                    <th className="p-3 px-5 uppercase">Sala</th>
                    <th className="p-3 px-5 uppercase">Horario</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>
                      {sala_peliculas.map(element => (
                        <p className="p-2 px-5" key={element.id}>
                          {" "}
                          {element.idpelicula_titulo}{" "}
                        </p>
                      ))}
                    </td>
                    <td>
                      {sala_peliculas.map(element => (
                        <p className="p-2 px-5" key={element.id}>
                          {" "}
                          {element.idsala_nombre}{" "}
                        </p>
                      ))}
                    </td>
                    <td>
                      {sala_peliculas.map(element => (
                        <p className="p-2 px-5" key={element.id}>
                          {" "}
                          {element.idhorario_hora}{" "}
                        </p>
                      ))}
                    </td>
                    <td>
                      {sala_peliculas.map(element => (
                        <p className="p-3 px-5" key={element.id}>
                          <button
                            // onClick={() => this.deleteSala(element.id)}
                            className="hidden text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded-full focus:outline-none focus:shadow-outline"
                          >
                            Editar
                          </button>
                        </p>
                      ))}
                    </td>
                    <td>
                      {sala_peliculas.map(element => (
                        <p className="text-left p-3 px-5" key={element.id}>
                          <button
                            onClick={() => this.deleteData(element.id)}
                            className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-4 rounded-full focus:outline-none focus:shadow-outline"
                          >
                            Eliminar
                          </button>
                        </p>
                      ))}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FilmsRoomAdd;
