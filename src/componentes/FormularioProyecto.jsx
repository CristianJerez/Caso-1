import axios from 'axios';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { db } from '../firebaseConfig';

const FormularioProyecto = ({ onAgregarProyecto }) => {
    const [nombreP, setNombre] = useState('');
    const [descripcionP, setDescripcion] = useState('');
    const [mensaje, setMensaje] = useState('');
    const validator = new SimpleReactValidator();

    const handleNombreChange = (e) => setNombre(e.target.value);
    const handleDescripcionChange = (e) => setDescripcion(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validator.allValid()) {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
                const additionalData = response.data;

                const proyecto = {
                    nombreP,
                    descripcionP,
                    datosAdicionales: additionalData
                };
                // const proyectoDB = {nombre: nombreP, descripcion: descripcionP};
                // db.collection('proyectos').add(proyectoDB).then(()=> {});
                await addDoc(collection(db, 'proyectos'), {
                    nombre: nombreP,
                    descripcion: descripcionP,
                });

                await onAgregarProyecto(proyecto); // Llama a la función para agregar el proyecto
                setMensaje(`Proyecto "${nombreP}" agregado exitosamente.`);

                // Limpiar los campos
                setNombre('');
                setDescripcion('');
            } catch (error) {
                console.error("Error al obtener datos adicionales:", error);
                setMensaje("Hubo un error al agregar el proyecto.");
            }
        } else {
            validator.showMessages();
        }
    };

    return (
        <React.Fragment>
            <h2>Agregar Proyecto</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre del Proyecto:</label>
                    <input type="text" value={nombreP} onChange={handleNombreChange} />
                    {validator.message('nombre', nombreP, 'required')}
                </div>
                <div>
                    <label>Descripción:</label>
                    <textarea value={descripcionP} onChange={handleDescripcionChange} />
                    {validator.message('descripcion', descripcionP, 'required|min:10')}
                </div>
                <button type="submit">Agregar Proyecto</button>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </React.Fragment>
    );
};

export default FormularioProyecto;
