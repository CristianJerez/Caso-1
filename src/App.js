import { addDoc, collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import FormularioLista from './componentes/FormularioLista';
import FormularioProyecto from './componentes/FormularioProyecto';
import { db } from './firebaseConfig';

function App() {
  const [proyectos, setProyectos] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    const unsubscribe = db.collection('proyectos').onSnapshot(snapshot => {
      const newData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProyectos(newData);
    });

    return () => unsubscribe(); 
  }, []);

  // Función para agregar un proyecto a Firestore y actualizar el estado
  const agregarProyecto = async (proyecto) => {
    try {
      // Guardar proyecto en Firestore
      const docRef = await addDoc(collection(db, 'proyectos'), {
        nombre: proyecto.nombre,
        descripcion: proyecto.descripcion,
      });

      // Actualizar el estado local de proyectos con el nuevo proyecto
      setProyectos([...proyectos, { id: docRef.id, ...proyecto }]);
      setMostrarFormulario(false); 
    } catch (error) {
      console.error("Error al agregar el proyecto a Firestore:", error);
    }
  };

  return (
    <div className="App">
      <h1>Gestión de Proyectos</h1>

      <button onClick={() => setMostrarFormulario(!mostrarFormulario)}>
        {mostrarFormulario ? 'Cancelar' : 'Agregar Proyecto'}
      </button>

      {mostrarFormulario && <FormularioProyecto onAgregarProyecto={agregarProyecto} />}

      {/* Renderizar la lista de proyectos usando FormularioLista */}
      <FormularioLista proyectos={proyectos} />
    </div>
  );
}

export default App;
