// URL de tu API en Railway
const API = "https://api-tareas-production.up.railway.app/api/tareas";

// Cargar todas las tareas
async function cargarTareas() {
    try {
        const res = await fetch(API);
        if (!res.ok) throw new Error("Error al cargar tareas");

        const data = await res.json();

        let html = "";
        data.forEach(t => {
            html += `
            <div class="item">
                <div class="info">
                    <b>${t.titulo}</b><br>
                    ${t.descripcion || ''}<br>
                    <small>${t.fecha || ''}</small>
                </div>

                <button onclick="eliminarTarea(${t.id})">Eliminar</button>
            </div>
            `;
        });

        document.getElementById("tareas").innerHTML = html;

    } catch (error) {
        console.error(error);
        alert("Error cargando tareas");
    }
}

// Crear nueva tarea
async function crearTarea() {
    const body = {
        titulo: document.getElementById("titulo").value,
        descripcion: document.getElementById("descripcion").value,
        fecha: document.getElementById("fecha").value
    };

    try {
        await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        cargarTareas();

    } catch (error) {
        console.error(error);
        alert("Error creando tarea");
    }
}

// Eliminar tarea
async function eliminarTarea(id) {
    try {
        await fetch(`${API}/${id}`, { method: "DELETE" });
        cargarTareas();

    } catch (error) {
        console.error(error);
        alert("Error eliminando tarea");
    }
}

// Inicializar
cargarTareas();
