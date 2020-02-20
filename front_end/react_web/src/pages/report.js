import React, { Component } from "react";
import Header from "../components/header";
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import axios from "axios";

const API = "http://localhost:5000/film/raw4";

// Resolves charts dependancy
charts(FusionCharts);

export default class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table_header: {
        pelicula: "Película",
        boletos: "Número de Boletos",
        precio: "Valor Unitario",
        total: "Total"
      },
      reporte: []
    };
  }

  componentDidMount() {
    axios
      .get(API)
      .then(response => {
        this.setState({ reporte: response.data.datos });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { reporte } = this.state;
    const datos = {
      chart: {
        caption: "Reporte de Compras",
        subcaption: `Películas más aceptadas por los usuario`,
        showpercentvalues: "1",
        aligncaptionwithcanvas: "0",
        captionpadding: "0",
        decimals: "1",
        plottooltext: "<h1>$percentValue</h1> recaudado por <h1>$label</h1>",
        theme: "fusion",
        baseFont: "Verdana",
        baseFontSize: "15",
        baseFontColor: "#0066cc"
      },
      data: this.state.reporte
    };

    const chartConfigs = {
      type: "doughnut2d",
      dataSource: datos,
      width: "800",
      height: "500"
    };
    // return (<ReactFusioncharts {...chartConfigs} />);
    return (
      <div>
        <Header />,
        <div className="">
          <table className="w-full text-md bg-white rounded mb-4 mt-4 text-center">
            <thead className="border-b">
              <tr>
                <th className="p-3 px-5">Pelicula</th>
                <th className="p-3 px-5">Valor Unitario</th>
                <th className="p-3 px-5">Número de boletos</th>
                <th className="p-3 px-5">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {reporte.map(element => (
                    <p className="p-2 px-5" key={element.id}>
                      {" "}
                      {element.label}{" "}
                    </p>
                  ))}
                </td>
                <td>
                  {reporte.map(element => (
                    <p className="p-2 px-5" key={element.id}>
                      {" "}
                      {element.valor_unit}{" "}
                    </p>
                  ))}
                </td>
                <td>
                  {reporte.map(element => (
                    <p className="p-2 px-5" key={element.id}>
                      {" "}
                      {element.value}{" "}
                    </p>
                  ))}
                </td>
                <td>
                  {reporte.map(element => (
                    <p className="p-2 px-5" key={element.id}>
                      {" "}
                      {element.recaudado}{" "}
                    </p>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="ml-64">
          <hr />
          <div className="my-8">
            <div className="w-full px-4">
              <ReactFusioncharts {...chartConfigs} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
