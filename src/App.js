import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';
import axios from 'axios';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width:992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`;

const Footer = styled.footer`
  background: linear-gradient(to right, rgba(78, 42, 186, .4), rgba(0, 4, 40, .8)); 
  text-align: center;
  font-size: 20px;
  padding: 1rem;
  border-radius: 12px;
  margin: 1rem auto;
  max-width: 880px;
  color: #fff;
`;

function App() {

  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState('');
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);

  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      //evitamos la ejecucion la primera vez
      if(moneda === '') return;
      
      //consultar la API para obtener la cotizacion
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

      const resultado = await axios.get(url);

      //Mostrar el spinner
      guardarCargando(true);

      //ocultar el spinner y mostrar el resultado
      setTimeout(() => {
        //Cambiar el estado de cargando
        guardarCargando(false);

        //Guardar cotizacion 
        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
      }, 3000);
    }
    cotizarCriptomoneda();
  }, [moneda, criptomoneda]);

  //mostrar spinner o resultado
  const compnente = (cargando) ? <Spinner />: <Cotizacion resultado={resultado} />

  return (
    <div>
      <Contenedor>
      <div>
        <Imagen 
          src={imagen}
          alt="Imagen cripto"
        />
      </div>
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario 
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
        />
        {compnente}
      </div>
    </Contenedor>
      <Footer>Creado por <b>Gregory Morantes</b></Footer>
    </div>
  );
}

export default App;