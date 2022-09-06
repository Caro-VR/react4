import React, { useState, useEffect } from 'react';

// Mi componente principal <MiApi>
const MiApi = () => {

    //Defino y guardo el estado info del valor inicial de la lista que tengo (es mi hook)
    const [info, setInfo] = useState([]);
    const [listaFeriados, setListaFeriados] = useState([])

    //Función para buscar feriado (ordenando el array mapeado que contiene los valores reducidos)
    const buscarFeriado = (e) => {
        console.log('pasa por aquí');
        setInfo(listaFeriados.filter((feriado) => {
          if (e === '') {
            return true //retorno
          } else {
            return feriado.title.toLowerCase().includes(e.toLowerCase())
          }
        }))
    }

    // Utilizo useEffect para ejecutar la función que consume a la API al momento de montar el componente
    useEffect(() => {
        getFeriados()
    },[]);

    const getFeriados = async () => {

        const url = 'https://api.victorsanmartin.com/feriados/en.json';
        const response = await fetch(url);
        const data = await response.json();
        setInfo(data.data);

        // Ejecuto la lista feriados y la ordeno con sort (nombre del feriado ya que por defecto la página viene con las fehas ordenadas)
        let feriados = data.data.sort(function(a, b){
            if(a.title < b.title) { return -1; }
            if(a.title > b.title) { return 1; }
            return 0;
        })

        // Actualizo el estado con la nueva lista ya ordenada
        setListaFeriados(feriados);
    }
    
  //Vuelco el contenido del estado list
  return (
    <div className='container-fluid'>
        <div className="row navbar">
            <h1>"FERIADOS LEGALES EN CHILE"</h1>
        </div>
        <div className="row formulario">
            <div className="buscador-feriado mt-3 col-6 offset-3 text-center">
              <input type="text" name="nombre" placeholder="Ingrese el nombre del feriado" className="buscador-control w-50" onChange={(e) => buscarFeriado(e.target.value)} />
              <button className="btn btn-secondary ml-1" type="submit">Buscar</button>
            </div>
        </div>
        <div>
            <h3>Feriados de carácter general (Aplican a todas las personas a nivel nacional)</h3>
            <hr />
        </div>
        <div className="row tabla"> 
            {info.map(f => 
                <div className="card col-3" key={f.date}>
                    <p>{f.date}</p>
                    <p>{f.title}</p>
                    <p>{f.extra}</p>
                </div>
            )}
        </div>   
    </div> 
  );
  }
export default MiApi;