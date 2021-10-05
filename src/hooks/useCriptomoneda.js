import React, { Fragment, useState } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

const Label = styled.label`
  font-family: "Bebas Neue", cursive;
  color: #ffffff;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 2.4rem;
  margin-top: 2rem;
  display: block;
`;

const Select = styled.select`
  width: 100%;
  display: block;
  padding: 1rem;
  -webkit-appearance: none;
  border-radius: 10px;
  border: none;
  font-size: 1rem;
`;

const useCriptomoneda = (label, stateInicial, opciones) => {

  //State para nuestro custom hooks
  const [state, actualizarState] = useState(stateInicial);

  const SelectCripto = () => (
    <Fragment>
      <Label>{label}</Label>
      <Select onChange={(e) => actualizarState(e.target.value)} value={state}>
        <option value=""> --Seleccione -- </option>
        {opciones.map((opcion) => (
          <option key={opcion.CoinInfo.Id} value={opcion.CoinInfo.Name}>{opcion.CoinInfo.FullName}</option>
        ))}
      </Select>
    </Fragment>
  );

  //Retornar state, interfaz (seleccionar) y funcion que modifica el state
  return [state, SelectCripto, actualizarState];
};

useCriptomoneda.propTypes = {
  label: PropTypes.string.isRequired,
  stateInicial: PropTypes.string.isRequired,
  opciones: PropTypes.array.isRequired
};

export default useCriptomoneda;
