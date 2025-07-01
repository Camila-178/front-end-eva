import React, { useState, useEffect } from 'react';

function FormularioAlumno({ agregarAlumno, alumnoEditando }) {
  // Estados del formulario
  const [nombre, setNombre] = useState('');
  const [asignatura, setAsignatura] = useState('');
  const [promedio, setPromedio] = useState('');

  // Cuando se edita un alumno, se rellenan los campos del formulario
  useEffect(() => {
    if (alumnoEditando) {
      setNombre(alumnoEditando.nombre);
      setAsignatura(alumnoEditando.asignatura);
      setPromedio(alumnoEditando.promedio);
    }
  }, [alumnoEditando]);

  // Validar y enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    const prom = parseFloat(promedio);
    // Validaciones básicas
    if (!nombre || !asignatura || isNaN(prom) || prom < 1 || prom > 7) {
      alert('Completa los campos correctamente (promedio entre 1.0 y 7.0)');
      return;
    }

    // Llamar a la función de App para agregar o editar
    agregarAlumno({
      id: alumnoEditando?.id || Date.now(),
      nombre,
      asignatura,
      promedio: prom,
    });

    // Limpiar formulario
    setNombre('');
    setAsignatura('');
    setPromedio('');
  };

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <label >Nombre del Alumno:</label>
      <input
        type="text"
        placeholder="Ej: Juan Pérez"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <label >Asignatura:</label>
      <input
        type="text"
        placeholder="Ej: Matemáticas"
        value={asignatura}
        onChange={(e) => setAsignatura(e.target.value)}
      />
      <label >Promedio (0.0 - 7.0):</label>
      <input
        type="number"
        step="0.1"
        placeholder="Ej: 5.5"
        value={promedio}
        onChange={(e) => setPromedio(e.target.value)}
      />
      <button type="submit">{alumnoEditando ? 'Editar Evaluación' : 'Agregar Evaluación'}</button>
    </form>
  );
}

export default FormularioAlumno;
