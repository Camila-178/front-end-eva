import React from 'react';
// Función que recibe un promedio y devuelve un objeto con el texto y clase CSS correspondiente según el valor
function getApreciacion(promedio) {
  if (promedio < 4) return { texto: 'Deficiente', clase: 'deficiente' };
  if (promedio <= 5.5) return { texto: 'Con mejora', clase: 'con-mejora' };
  if (promedio <= 6.4) return { texto: 'Buen trabajo', clase: 'buen-trabajo' };
  return { texto: 'Destacado', clase: 'destacado' }; // Para promedios mayores a 6.4
}

// Componente funcional ListaAlumnos que recibe una lista de alumnos y funciones para editar y eliminar
function ListaAlumnos({ alumnos, onEditar, onEliminar }) {
  return (
    <div className="lista">
      {/* Título de la sección */}
      <h2>Evaluaciones Guardadas</h2>

      {/* Itera sobre cada alumno en la lista */}
      {alumnos.map((alumno) => {
        // Obtiene la apreciación en base al promedio del alumno
        const apreciacion = getApreciacion(alumno.promedio);

        return (
          // Cada tarjeta de alumno tiene una key única basada en su ID
          <div className="alumno-card" key={alumno.id}>
            <div className="alumno-info">
              {/* Muestra el nombre, asignatura y promedio del alumno */}
              <p><strong>Alumno:</strong> {alumno.nombre}</p>
              <p><strong>Asignatura:</strong> {alumno.asignatura}</p>
              <p><strong>Promedio:</strong> {alumno.promedio}</p>

              {/* Muestra la etiqueta de apreciación con una clase dinámica para aplicar estilos */}
              <span className={`etiqueta ${apreciacion.clase}`}>
                {apreciacion.texto}
              </span>
            </div>

            {/* Botones de acción: Editar y Eliminar */}
            <div className="acciones">
              {/* Al hacer clic se llama a la función onEditar pasando el alumno como argumento */}
              <button className="btn-editar" onClick={() => onEditar(alumno)}>Editar</button>

              {/* Al hacer clic se llama a la función onEliminar pasando el ID del alumno */}
              <button className="btn-eliminar" onClick={() => onEliminar(alumno.id)}>Eliminar</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Exporta el componente para que pueda ser usado en otros archivos
export default ListaAlumnos;
