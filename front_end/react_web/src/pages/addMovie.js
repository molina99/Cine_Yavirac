/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import Header from "../components/header";
import axios from "axios";

const API = "http://localhost:5000/film/pelicula";

class AddMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peliculas: [],
      titulo: "",
      resumen: "",
      categoria: "",
      valorboleto: "",
      imagen: "",
      estado: true
    };
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  registerPelicula = e => {
    e.preventDefault();
    this.post = {
      titulo: this.state.titulo,
      resumen: this.state.resumen,
      categoria: this.state.categoria,
      valorboleto: this.state.valorboleto,
      imagen: this.state.imagen
    };

    if (
      this.post.titulo === "" ||
      this.post.resumen === "" ||
      this.post.categoria === "" ||
      this.post.valorboleto === "" ||
      this.post.imagen === ""
    ) {
      alert("Obligatorio completar todos los campos");
    } else {
      axios
        .post(API, this.post)
        .then(response => {
          alert("Pelicula registrada correctamente");
          window.location.assign("http://localhost:3000/add_movie");
        })
        .catch(error => {
          alert("Datos Incorrectos");
        });
    }
  };

  encodeImageFileAsURL = e => {
    const reader = new FileReader();
    const file = new Blob([e.target.value], { type: "img/png" });
    this.setState({ imagen: file });
    reader.onloadend = e => {
      this.setState({ imagen: e.target.result });
    };
    reader.readAsDataURL(file);
  };

  onFileChange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      this.setState({ imagen: reader.result });
      console.log(reader.result);
    };
    reader.readAsDataURL(file);
  };

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

  deleteData = value => {
    axios.delete(`${API}?id=${value}`, {
      data: { id: value }
    });
    window.location.assign("http://localhost:3000/add_movie");
  };

  render() {
    const {
      peliculas,
      titulo,
      resumen,
      categoria,
      valorboleto,
      imagen
    } = this.state;
    const imagenDef = require("../assets/pelicula.jpg");
    return (
      <div className="bg-blue-200">
        <Header />
        <div className="bg-white border-t border-b sm:border-l sm:border-r sm:rounded shadow mt-5 mb-5 mx-16">
          <div className="border-b-2 border-blue-200 px-6">
            <div className="text-center py-5">
              <span className="text-black uppercase text-xl">
                Crear Película
              </span>
            </div>
          </div>
          <div className="lg:flex">
            <div className="lg:w-1/2 text-center py-8 mx-auto border-b">
              <div className="lg:border-r">
                <div className="my-5">
                  <label className="text-black uppercase text-xl">
                    Agregar portada
                  </label>
                  <img
                    src={imagenDef}
                    className="w-64 text-center mx-auto mt-5 mb-5 border-t-2 border-r-2 border-b-2 border-l-2"
                  />
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 py-8 my-auto mx-auto">
              <div className="lg:border-r">
                <div className="text-grey-darker mb-2">
                  <div className="px-16 py-5">
                    <form className="" onSubmit={this.registerPelicula}>
                      <div className="flex">
                        <label className="mr-3 text-xl">Título:</label>
                        <input
                          className="border-2 border-blue-200 rounded w-full py-1"
                          name="titulo"
                          type="text"
                          name="titulo"
                          value={titulo}
                          onChange={this.changeHandler}
                          autoComplete="off"
                        />
                      </div>
                      <div className="mt-5">
                        <label className="mr-3 text-xl">Resumen:</label>
                        <textarea
                          className="border-2 border-blue-200 rounded w-full py-1"
                          name="resumen"
                          value={resumen}
                          onChange={this.changeHandler}
                          autoComplete="off"
                        />
                      </div>
                      <div className="flex mt-5">
                        <label className="mr-3 text-xl">Categoría:</label>
                        <select
                          className="border-2 border-blue-200 rounded w-full appearance-none"
                          name="categoria"
                          value={categoria}
                          onChange={this.changeHandler}
                        >
                          <option className="text-sm text-gray-600">
                            Seleccione...
                          </option>
                          <option>Acción</option>
                          <option>Animada</option>
                          <option>Comedia</option>
                          <option>Drama</option>
                          <option>Romántica</option>
                          <option>Terror</option>
                        </select>
                      </div>
                      <div className="mt-5">
                        <label className="mr-3 text-xl">Valor:</label>
                        <input
                          name="valorboleto"
                          min="0"
                          type="number"
                          className="border-2 border-blue-200 rounded py-1"
                          value={valorboleto}
                          onChange={this.changeHandler}
                          autoComplete="off"
                        />
                        <label className="ml-3 text-xl">$</label>
                        <input
                          className="flex-grow h-8 px-2 rounded border border-grey-400 mt-10"
                          type="file"
                          required={true}
                          name="imagen"
                          defaultValue={imagen}
                          onChange={this.onFileChange}
                        />
                        <button
                          className="ml-5 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline"
                          type="submit"
                        >
                          Crear
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="justify-center my-2">
          <h1 className="text-center text-3xl uppercase">Lista de Películas</h1>
        </div>
        <div className="flex flex-wrap items-center justify-center">
          {peliculas.map(element => (
            <div
              className="flex-shrink-0 m-6 bg-black rounded-lg max-w-xs h-auto shadow-lg hover:bg-gray-900"
              key={element.id}
            >
              <div className="relative pt-10 px-10 flex items-center justify-center">
                <img className="relative w-40" src={element.imagen} />
              </div>
              <div className="relative text-white px-6 pb-6 mt-6">
                <div className="text-justify">
                  <div>
                    <label className="text-blue-400">Título:</label>
                    <br />
                    <label>{element.titulo}</label>
                  </div>
                  <div>
                    <label className="text-blue-400">Resumen:</label>
                    <br />
                    <label>{element.resumen}</label>
                  </div>
                  <div>
                    <label className="text-blue-400">Categoría:</label>
                    <br />
                    <label>{element.categoria}</label>
                  </div>
                  <span className="block font-semibold text-lg text-red-700">
                    Valor: {element.valorboleto} $
                  </span>
                  <div className="flex justify-between mt-5">
                    <button
                      // onClick={() => this.deleteSala(element.id)}
                      className="hidden text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded-full focus:outline-none focus:shadow-outline"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => this.deleteData(element.id)}
                      className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded-full focus:outline-none focus:shadow-outline"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default AddMovie;
