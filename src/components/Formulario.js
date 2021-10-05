import React, {useEffect,useState} from "react";
import styled from "@emotion/styled";
import axios from "axios";
import PropTypes from "prop-types";

import Error from "./Error";
import useMoneda from "../hooks/useMoneda";
import useCriptomoneda from "../hooks/useCriptomoneda";

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #ffffff;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;

const Formulario = ({guardarMoneda, guardarCriptomoneda}) => {

    //State del listado de criptomonedas
    const [listacripto, guardarCriptomonedas] = useState([]);
    //State de error
    const [error, guardarError] = useState(false);

    const MONEDAS = [
      { codigo: "USD", nombre: "El dolar de Estados Unidos" },
      { codigo: "MXN", nombre: "Peso Mexicano" },
      { codigo: "EUR", nombre: "Euro" },
      { codigo: "GBP", nombre: "Libra Esterlina" },
      { codigo: "COP", nombre: "Peso Colombiano" }
    ];

    //Utilizar custom hook useMoneda, que se le envia como parametro, cadenas y objetos
    const [moneda, SelectMonedas] = useMoneda('Elige tu Moneda', '', MONEDAS);

    //Utilizar custom hook useCriptomoneda
    const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu Criptomoneda', '',listacripto);

    //Ejecutar llamado a la API
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);
            guardarCriptomonedas(resultado.data.Data)
        }
        consultarAPI();
    }, []);

    //Cuando se realiza la cotizacion  (cuando se hace submit)
    const cotizarMoneda = (e) => {
        e.preventDefault();

        //Validacion de campos
        if (moneda === '' || criptomoneda === '') {
            guardarError(true);
            return;
        }
        //Pasar los datos al componente principal
        guardarError(false);
        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);

    }

  return (
      <form
        onSubmit={cotizarMoneda}
      >
          {error ? <Error mensaje="Todos los campos son obligatorios"/>: null}
          <SelectMonedas
          />
          <SelectCripto
          />
          <Boton
              type="submit"
              value="Calcular"
          />
    </form>
  );
};

Formulario.propTypes = {
  guardarMoneda: PropTypes.func.isRequired,
  guardarCriptomoneda: PropTypes.func.isRequired

};

export default Formulario;
