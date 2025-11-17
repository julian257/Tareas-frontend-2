const API = "https://api-tareas-production.up.railway.app/api/tareas";

// Cargar tareas
async function cargarTareas() {
    const res = await fetch(API);
    const data = await res.json();

    let html = "";
    data.forEach(t => {
        html += `
            <div>
                <div class="task-text">
                    <strong>${t.titulo}</strong>
                    <span>${t.descripcion}</span>
                </div>
                <button onclick="eliminarTarea(${t.id})" class="delete-btn">Eliminar</button>
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

    document.getElementById("titulo").value = "";
    document.getElementById("descripcion").value = "";

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
