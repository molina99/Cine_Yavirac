import React, { Component } from "react";
import Header from "../components/header";
import axios from "axios";

const API = "http://localhost:5000/film/horario";

class Schedules extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hora: "",
      horarios: []
    };
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    axios
      .get(API)
      .then(response => {
        this.setState({ horarios: response.data.datos });
      })
      .catch(error => {
        console.log(error);
      });
  }

  registerHorario = e => {
    e.preventDefault();
    this.post = {
      hora: this.state.hora
    };

    if (this.post.hora === "") {
      alert("Obligatorio completar todos los campos");
    } else {
      axios
        .post(API, this.post)
        .then(response => {
          alert("Horario registrado correctamente");
          window.location.assign("http://localhost:3000/schedules");
        })
        .catch(error => {
          alert("Datos Incorrectos");
        });
    }
  };

  deleteData = value => {
    axios.delete(`${API}?id=${value}`, {
      data: { id: value }
    });
    window.location.assign("http://localhost:3000/schedules");
  };

  render() {
    const { horarios, hora } = this.state;
    return (
      <div className="bg-blue-200">
        <Header />
        <div className="bg-white border-t border-b rounded shadow mt-5 mx-16">
          <div className="border-b-2 border-blue-200 px-6">
            <div className="text-center py-5">
              <span className="text-black uppercase text-xl">
                Crear Horario
              </span>
            </div>
          </div>
          <div className="">
            <div className="py-8 my-auto mx-auto">
              <div className="">
                <div className="text-grey-darker mb-2">
                  <div className="px-16 py-5">
                    <form className="" onSubmit={this.registerHorario}>
                      <div className="mt-5 flex">
                        <label className="mr-3 text-xl">Hora:</label>
                        <input
                          className="border-2 border-blue-200 rounded w-full py-1"
                          name="hora"
                          type="text"
                          value={hora}
                          onChange={this.changeHandler}
                        />
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
              </div>
            </div>
            <div className="py-5 border px-10 text-center">
              <span className="text-black uppercase text-xl">
                lista de horarios
              </span>

              <div className="">
                <table className="w-full text-md bg-white shadow-md rounded mb-4 mt-4 text-center">
                  <thead className="border-b">
                    <tr>
                      <th className="p-3 px-5">Número</th>
                      <th className="p-3 px-5">Hora</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className="border-b">
                      <td>
                        {horarios.map(element => (
                          <p className="p-3 px-5">{element.id}</p>
                        ))}
                      </td>
                      <td>
                        {horarios.map(element => (
                          <p className="p-3 px-5">{element.hora}</p>
                        ))}
                      </td>
                      <td>
                        {horarios.map(element => (
                          <p className="p-3 px-5" key={element.id}>
                            <button
                              // onClick={() => this.updateHorario(element.id)}
                              className="hidden text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded-full focus:outline-none focus:shadow-outline"
                            >
                              Editar
                            </button>
                          </p>
                        ))}
                      </td>
                      <td>
                        {horarios.map(element => (
                          <p className="p-3 px-5" key={element.id}>
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
      </div>
    );
  }
}

export default Schedules;
