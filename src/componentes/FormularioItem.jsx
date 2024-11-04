import React from 'react';
import { db } from '../firebaseConfig';

const FormularioItem = ({ proyecto }) => {

    const handleDelete = async (id) => {
        await db.collection('proyectos').doc(id).delete()
    }
    return (
        <li>
            <h3>{proyecto.nombre}</h3>
            <p><strong>Descripción:</strong> {proyecto.descripcion}</p>
            {proyecto.datosAdicionales ? (
                <>
                    <p><strong>Datos Adicionales:</strong></p>
                    <p><em>Título:</em> {proyecto.datosAdicionales.title || "No disponible"}</p>
                    <p><em>Contenido:</em> {proyecto.datosAdicionales.body || "No disponible"}</p>
                    </>

            ) : (
                <p>No hay datos adicionales disponibles</p>
            )}
            <button onClick={() => handleDelete(proyecto.id)}>Eliminar</button>
        </li>
    );
};

export default FormularioItem;
