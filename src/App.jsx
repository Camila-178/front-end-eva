import React, { useState, useEffect } from 'react';
import FormularioAlumno from './components/FormularioAlumno';
import ListaAlumnos from './components/ListaAlumnos';
import './App.css';

function App() {
  // Estado principal que almacena todos los alumnos
  const [alumnos, setAlumnos] = useState([]);

  // Estado para guardar al alumno que se está editando
  const [alumnoEditando, setAlumnoEditando] = useState(null);

  // Cargar datos desde localStorage al iniciar
  useEffect(() => {
    const dataGuardada = JSON.parse(localStorage.getItem('alumnos')) || [];
    setAlumnos(dataGuardada);
  }, []);

  // Guardar datos en localStorage cada vez que cambia el estado
  useEffect(() => {
    localStorage.setItem('alumnos', JSON.stringify(alumnos));
  }, [alumnos]);

  // Función para agregar o actualizar alumno
  const agregarAlumno = (nuevoAlumno) => {
    if (alumnoEditando) {
      // Si se está editando, actualizar el alumno en la lista
      const actualizados = alumnos.map((alumno) =>
        alumno.id === alumnoEditando.id ? nuevoAlumno : alumno
      );
      setAlumnos(actualizados);
      setAlumnoEditando(null);
    } else {
      // Si no se edita, agregar nuevo alumno
      setAlumnos([...alumnos, { ...nuevoAlumno, id: Date.now() }]);
    }
  };

  // Función para seleccionar un alumno y editarlo
  const editarAlumno = (alumno) => {
    setAlumnoEditando(alumno);
  };

  // Función para eliminar un alumno por su ID
  const eliminarAlumno = (id) => {
    if (confirm('¿Estás seguro de eliminar este alumno?')) {
      setAlumnos(alumnos.filter((a) => a.id !== id));
    }
  };

  return (
    <div className="contenedor">
      <h1>Evaluación de Alumnos</h1>

      {/* Formulario para agregar o editar alumnos */}
      <FormularioAlumno
        agregarAlumno={agregarAlumno}
        alumnoEditando={alumnoEditando}
      />

      {/* Tabla con listado de alumnos */}
      <ListaAlumnos
        alumnos={alumnos}
        onEditar={editarAlumno}
        onEliminar={eliminarAlumno}
      />
    </div>
  );
}

export default App;