const API = "https://api-tareas-production.up.railway.app/api/contactos";

// Cargar contactos
async function cargarContactos() {
    const res = await fetch(API);
    const data = await res.json();

    let html = "";
    data.forEach(c => {
        html += `
        <div class="item">
            <img src="${c.foto_url || 'https://via.placeholder.com/60'}" alt="foto">
            
            <div class="info">
                <b>${c.nombre}</b><br>
                ${c.correo}<br>
                ${c.telefono || ''}<br>
                ${c.empresa || ''}
                <br>
                <a href="${c.enlace_externo}" target="_blank">Ver más</a>
            </div>

            <button onclick="eliminarContacto(${c.id})">Eliminar</button>
        </div>
        `;
    });

    document.getElementById("contactos").innerHTML = html;
}

// Crear contacto
async function crearContacto() {
    const body = {
        nombre: document.getElementById("nombre").value,
        correo: document.getElementById("correo").value,
        telefono: document.getElementById("telefono").value,
        empresa: document.getElementById("empresa").value,
        foto_url: document.getElementById("foto_url").value,
        enlace_externo: document.getElementById("enlace_externo").value
    };

    await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    cargarContactos();
}

// Eliminar contacto
async function eliminarContacto(id) {
    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    cargarContactos();
}

cargarContactos();
