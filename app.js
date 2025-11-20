// URL de tu API de tareas
const API = "https://api-tareas-production.up.railway.app/api/tareas";

// Cargar tareas
async function cargarTareas() {
    const res = await fetch(API);
    const data = await res.json();

    let html = "";
    data.forEach(t => {
        html += `
        <div class="item">
            <div class="info">
                <b>${t.titulo}</b><br>
                ${t.descripcion || ''}<br>
                <small>Estado: ${t.estado}</small>
            </div>

            <button onclick="eliminarTarea(${t.id})">Eliminar</button>
        </div>
        `;
    });

    document.getElementById("tareas").innerHTML = html;
}

// Crear tarea
async function crearTarea() {
    const body = {
        titulo: document.getElementById("titulo").value,
        descripcion: document.getElementById("descripcion").value,
        estado: document.getElementById("estado").value
    };

    await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
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
