import React from 'react';
import FormularioItem from './FormularioItem';


const FormularioLista = ({ proyectos }) => {


    return (
        <div>
            {proyectos.length === 0 ? (
                <p>No hay proyectos</p>
            ) : (
                <ul>
                    {proyectos.map((proyecto, index) => (
                        <FormularioItem key={index} proyecto={proyecto} />
                    ))}
                    
                </ul>
            )}
        </div>
    );
};

export default FormularioLista;



