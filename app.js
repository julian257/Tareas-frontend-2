const API = "https://api-tareas-production.up.railway.app/api/tareas";

// Cargar tareas
async function cargarTareas() {
    const res = await fetch(API);
    const data = await res.json();

    let html = "";
    data.forEach(t => {
        html += `
            <div>
                <b>${t.titulo}</b> - ${t.descripcion}
                <button onclick="eliminarTarea(${t.id})">Eliminar</button>
            </div>
        `;
    });

    document.getElementById("tareas").innerHTML = html;
}

// Crear tarea
async function crearTarea() {
    const titulo = document.getElementById("titulo").value;
    const descripcion = document.getElementById("descripcion").value;

    await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, descripcion })
    });

    cargarTareas();
}

// Eliminar tarea
async function eliminarTarea(id) {
    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    cargarTareas();
}

cargarTareas();
