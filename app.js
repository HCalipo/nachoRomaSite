//animación de carga de página

document.addEventListener("DOMContentLoaded", () => {
    const tl = gsap.timeline();

    // 1. Entrada del fondo y el sujeto (escalando juntos)
    tl.from([".capa-bg", ".capa-nacho"], {
        duration: 2,
        scale: 1.1,
        ease: "power3.inOut"
    });

    // 2. El texto Hanson aparece desde atrás (un poco más pequeño y subiendo)
    /**/
    tl.from(".letras-nacho", {
        duration: 2,
        y: 100,
        scale: 0.8,
        opacity: 0,
        ease: "expo.Out"
    }, "-=1"); // Empieza 1 segundo antes de que termine la anterior
    
});


//conf de la api
const API_KEY = "AIzaSyC0OTt-c93msl-QG-fZo_UXxmkmbiU4iTI";
const SHEET_ID = "1jwIjYgeDJpivqor3nXVOGkJLnmLaxQEHW15Yae-CngU";
const RANGE = "Fechas"; 

async function obtenerEventos() {
    // Construimos la URL dinámica
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;

    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        
        console.log("Datos recibidos de Google:", datos);
        
        if(datos.values){
            console.log("Datos de eventos:", datos.values);
            cargarEventos(datos.values);
        } else{
            console.warn("GSAP Master Info: No hay datos disponibles para mostrar.");
        }
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    obtenerEventos();
    
    // (Tu código de la línea de tiempo de GSAP que ya tenías puede seguir aquí abajo)
});

/**/
function cargarEventos(fila) {
    
    const container = document.getElementById("listaEventos");
    if (!container) return;

    container.innerHTML = "";

    //saltamos la primera fila que es el encabezado
    const datosReales = fila.slice(1);

    datosReales.forEach(fila => {
        date = fila[0];
        city = fila[1];
        site = fila[2];

        const row = document.createElement("div");
        row.className = "evento-row";
        row.innerHTML = `
            <span class="evento-date">${date}</span>
            <span class="evento-city">${city}</span>
            <span class="evento-site">${site}</span>
        `;
        container.appendChild(row);
    });
    //animarEventos();
}

function animarEventos() {
    gsap.from(".evento-row", {
        duration: 0.8,
        y: 30,                 // Aparecen desde 30px más abajo
        opacity: 0,            // Pasan de transparentes a opacos
        stagger: 0.2,          // Retraso de 0.2 segundos entre la aparición de cada fila
        ease: "back.out(1.7)", // Añade un ligero rebote fluido al terminar
        delay: 1.5             // Esperamos un poco para que termine la animación del título principal
    });
}



