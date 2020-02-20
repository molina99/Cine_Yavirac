import React, { Component } from "react";
const imageLogo = require("../assets/logo.png");

class Header extends Component {
  render() {
    return (
      <div className="">
        <div className="mx-auto px-20">
          <div className="flex items-center justify-between py-4">
            <div className="">
              <img src={imageLogo} alt="" className="h-12 xl:h-20" />
            </div>
            <div className="flex">
              <div className="md:block md:flex md:items-center ml-10 ">
                <a
                  className="text-black text-sm mr-1 uppercase hover:text-blue-400 hover:text-xl cursor-pointer"
                  href="http://localhost:3000/"
                >
                  salir
                </a>
              </div>
            </div>
          </div>
        </div>
        <nav class="bg-white px-8 pt-2 shadow-md">
          <div class="-mb-px flex justify-center">
            <a
              class="no-underline border-teal-dark uppercase tracking-wide font-bold text-sm py-3 hover:text-blue-400"
              href="http://localhost:3000/report"
            >
              Home
            </a>
            <a
              class="no-underline border-transparent uppercase tracking-wide font-bold text-sm py-3 ml-20 hover:text-blue-400"
              href="http://localhost:3000/add_movie"
            >
              Películas
            </a>
            <a
              class="no-underline border-transparent uppercase tracking-wide font-bold text-sm py-3 ml-20 hover:text-blue-400"
              href="http://localhost:3000/rooms"
            >
              Salas
            </a>
            <a
              class="no-underline border-transparent uppercase tracking-wide font-bold text-sm py-3 ml-20 hover:text-blue-400"
              href="http://localhost:3000/schedules"
            >
              Horarios
            </a>
            <a
              class="no-underline border-transparent uppercase tracking-wide font-bold text-sm py-3 ml-40 text-red-600 hover:text-blue-400"
              href="http://localhost:3000/films_room_add"
            >
              Asignar Sala Pelicula
            </a>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
