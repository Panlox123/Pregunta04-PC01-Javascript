// Definición de la clase Estudiante
class Estudiante {
    constructor(nombre, calificaciones) {
        this.nombre = nombre;
        this.calificaciones = calificaciones;
    }

    obtenerPromedio(){
        const suma = this.calificaciones.reduce((acc, calificacion) => acc + calificacion, 0);
        return suma / this.calificaciones.length;
    }
}

// Arreglo de estudiantes inicial
let estudiantes = [
    new Estudiante('Ana', [8, 9, 7, 6]),
    new Estudiante('Luis', [5, 6, 7, 8]),
    new Estudiante('María', [9, 10, 10, 8]),
    new Estudiante('Juan', [4, 5, 6, 7]),
    new Estudiante('Carlos', [10, 9, 6, 7]),
    new Estudiante('Pamela', [11, 13, 6, 7]),
    new Estudiante('Fernanda', [4, 12, 10, 7]),
    new Estudiante('Daniel', [7, 9, 10, 7]),
    new Estudiante('Brenda', [3, 15, 14, 8]),
    new Estudiante('Leonardo', [6, 9, 11, 12])
];

// Función para agregar un nuevo estudiante
function agregarEstudiante() {
    const nombre = document.getElementById('nombreEstudiante').value;
    const calificacionesStr = document.getElementById('calificaciones').value; //"8, 9, 7, 6"
    
    if (nombre && calificacionesStr) {
        const calificaciones = calificacionesStr.split(',').map(num => parseFloat(num.trim())); //["8", " 9", " 7", " 6"] - " 9" -> "9"
        if (calificaciones.every(num => !isNaN(num))) { //False: "8", "9", "7", "seis"
            estudiantes.push(new Estudiante(nombre, calificaciones));
            document.getElementById('nombreEstudiante').value = '';
            document.getElementById('calificaciones').value = '';
            alert('Estudiante agregado...!!!');
        } else {
            alert('Por favor, ingrese las calificaciones separadas por comas como se muestra...!!!');
        }
    } else {
        alert('Por favor, complete todos los campos...!!!');
    }
}

// Función para calcular el promedio general de todos los estudiantes
function calcularPromedioGeneral() {
    const promedioGeneral = estudiantes.reduce((acc, estudiante) => acc + estudiante.obtenerPromedio(), 0) / estudiantes.length;
    document.getElementById('resultados').innerHTML = `Promedio general de todos los estudiantes: ${promedioGeneral.toFixed(2)}`;
}

// Función para obtener estudiantes con calificaciones superiores al promedio general
function obtenerEstudiantesPorEncimaDelPromedio(promedioGeneral) {
    return estudiantes.filter(estudiante => estudiante.obtenerPromedio() > promedioGeneral);
}

// Función para mostrar estudiantes destacados y estudiantes con las notas más bajas
function mostrarEstudiantes() {
    const promedioGeneral = estudiantes.reduce((acc, estudiante) => acc + estudiante.obtenerPromedio(), 0) / estudiantes.length;
    
    // Filtrar estudiantes con promedio superior al promedio general
    let estudiantesDestacados = obtenerEstudiantesPorEncimaDelPromedio(promedioGeneral);
    
    // Ordenar los estudiantes destacados por promedio de mayor a menor
    estudiantesDestacados.sort((a, b) => b.obtenerPromedio() - a.obtenerPromedio());
    
    // Limitar el número de estudiantes destacados a 5
    estudiantesDestacados = estudiantesDestacados.slice(0, 5);

    // Filtrar estudiantes con promedio inferior al promedio general
    let estudiantesBajos = estudiantes.filter(estudiante => estudiante.obtenerPromedio() <= promedioGeneral);
    
    // Ordenar los estudiantes con bajo promedio de menor a mayor
    estudiantesBajos.sort((a, b) => a.obtenerPromedio() - b.obtenerPromedio());
    
    // Limitar el número de estudiantes con bajo promedio a 5
    estudiantesBajos = estudiantesBajos.slice(0, 5);

    // Mostrar los estudiantes destacados
    let resultadoDiv = `Estudiantes con promedio superior al promedio general (${promedioGeneral.toFixed(2)}): <br><br>`;
    estudiantesDestacados.forEach(estudiante => {
        resultadoDiv += `${estudiante.nombre} - Promedio: ${estudiante.obtenerPromedio().toFixed(2)}<br>`;
    });

    // Mostrar los estudiantes con promedio más bajo
    resultadoDiv += `<br> Estudiantes con promedio inferior al promedio general (${promedioGeneral.toFixed(2)}):<br><br>`;
    estudiantesBajos.forEach(estudiante => {
        resultadoDiv += `${estudiante.nombre} - Promedio: ${estudiante.obtenerPromedio().toFixed(2)} <br>`;
    });

    document.getElementById('resultados').innerHTML = resultadoDiv;
}


// Función para mostrar la lista completa de estudiantes
function mostrarLista() {
    const listaEstudiantes = document.getElementById('listaEstudiantes');
    listaEstudiantes.innerHTML = ''; // Limpiar la lista antes de volver a renderizarla

    estudiantes.forEach(estudiante => {
        const li = document.createElement('li');
        li.textContent = `${estudiante.nombre} - Promedio: ${estudiante.obtenerPromedio().toFixed(2)}`;
        listaEstudiantes.appendChild(li);
    });

    // Mostrar el contenedor de la lista de estudiantes
    document.getElementById('contenedor-estudiante').style.display = 'block';
}

// Función para reiniciar el formulario a su estado inicial
function reiniciarFormulario2() {
    // Limpiar los campos de entrada
    document.getElementById('nombreEstudiante').value = '';
    document.getElementById('calificaciones').value = '';

    // Limpiar los resultados
    document.getElementById('resultados').innerHTML = '';

    // Limpiar la lista de estudiantes y ocultar el contenedor
    const listaEstudiantes = document.getElementById('listaEstudiantes');
    listaEstudiantes.innerHTML = '';
    document.getElementById('contenedor-estudiante').style.display = 'none';
}