let datos = [];

async function cargarDatos() {
  const response = await fetch("mesas.csv");
  const text = await response.text();

  const filas = text.trim().split("\n").slice(1); // salteo encabezado
  datos = filas.map(fila => {
    const [dni, nombre, mesa] = fila.split(",").map(v => v.trim());
    return { dni, nombre, mesa };
  });
}

async function buscarMesa() {
  if (datos.length === 0) await cargarDatos();

  const dniInput = document.getElementById("dni").value.trim();
  const resultado = document.getElementById("resultado");

  const persona = datos.find(p => p.dni === dniInput);

  if (persona) {
    // buscar todas las personas con la misma mesa
    const companeros = datos.filter(p => p.mesa === persona.mesa);

    resultado.innerHTML = `
      <p style="color:white; font-size:24px;">
        Hola <b>${persona.nombre}</b>, tu mesa es la <b style="color:white;">${persona.mesa}</b>
      </p>
      <p style="color:white; font-size:20px;">Compartís la mesa con:</p>
      <ul style="color:white; font-size:18px; list-style:none; padding:0;">
        ${companeros.map(c => `<li>${c.nombre}</li>`).join("")}
      </ul>
    `;
  } else {
    resultado.innerHTML = `<p style="color:red;">DNI no encontrado. Verificá que esté correcto.</p>`;
  }
}
