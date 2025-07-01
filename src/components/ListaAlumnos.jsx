import React from 'react';

function getApreciacion(promedio) {
  if (promedio < 4) return { texto: 'Deficiente', clase: 'deficiente' };
  if (promedio <= 5.5) return { texto: 'Con mejora', clase: 'con-mejora' };
  if (promedio <= 6.4) return { texto: 'Buen trabajo', clase: 'buen-trabajo' };
  return { texto: 'Destacado', clase: 'destacado' };
}

function ListaAlumnos({ alumnos, onEditar, onEliminar }) {
  return (
    <div className="lista">
      <h2>Evaluaciones Guardadas</h2>
      {alumnos.map((alumno) => {
        const apreciacion = getApreciacion(alumno.promedio);
        return (
          <div className="alumno-card" key={alumno.id}>
            <div className="alumno-info">
              <p><strong>Alumno:</strong> {alumno.nombre}</p>
              <p><strong>Asignatura:</strong> {alumno.asignatura}</p>
              <p><strong>Promedio:</strong> {alumno.promedio}</p>
              <span className={`etiqueta ${apreciacion.clase}`}>
                {apreciacion.texto}
              </span>
            </div>
            <div className="acciones">
              <button className="btn-editar" onClick={() => onEditar(alumno)}>Editar</button>
              <button className="btn-eliminar" onClick={() => onEliminar(alumno.id)}>Eliminar</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ListaAlumnos;