/*
window.onload = () => {
    console.log("GSAP Master: Los scripts se han cargado.");

    const bg = document.querySelector(".hero-bg");
    
    if (bg) {
        gsap.from(bg, {
            duration: 2.5,
            opacity: 0,
            scale: 1.1,
            ease: "power2.out"
        });
    } else {
        console.error("Error: No se encontró el elemento .hero-bg");
    }
};
*/

//conf de la api

const API_KEY = "AIzaSyC0OTt-c93msl-QG-fZo_UXxmkmbiU4iTI";
const SHEET_ID = "1jwIjYgeDJpivqor3nXVOGkJLnmLaxQEHW15Yae-CngU";
const RANGE = "Fechas"; 

async function obtenerConciertos() {
    // Construimos la URL dinámica
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;

    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        
        console.log("Datos recibidos de Google:", datos);
        
        if(datos.values){
            console.log("Datos de conciertos:", datos.values);
            renderConcerts(datos.values);
        } else{
            console.warn("GSAP Master Info: No hay datos disponibles para mostrar.");
        }
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    obtenerConciertos();
    
    // (Tu código de la línea de tiempo de GSAP que ya tenías puede seguir aquí abajo)
});


function renderConcerts(fila) {
    
    const container = document.getElementById("concert-list");
    if (!container) return;

    container.innerHTML = "";

    //saltamos la primera fila que es el encabezado
    const datosReales = fila.slice(1);

    datosReales.forEach(fila => {
        const row = document.createElement("div");
        row.className = "concert-row";
        row.innerHTML = `
            <span class="concert-date">${fila[0]}</span>
            <span class="concert-city">${fila[1]}</span>
            <span class="concert-site">${fila[2]}</span>
        `;
        container.appendChild(row);
    });
    animarConciertos();
}

function animarConciertos() {
    gsap.from(".concert-row", {
        duration: 0.8,
        y: 30,                 // Aparecen desde 30px más abajo
        opacity: 0,            // Pasan de transparentes a opacos
        stagger: 0.2,          // Retraso de 0.2 segundos entre la aparición de cada fila
        ease: "back.out(1.7)", // Añade un ligero rebote fluido al terminar
        delay: 1.5             // Esperamos un poco para que termine la animación del título principal
    });
}



document.addEventListener("DOMContentLoaded", () => {
    const tl = gsap.timeline();

    // 1. Entrada del fondo y el sujeto (escalando juntos)
    tl.from([".layer-bg", ".layer-subject"], {
        duration: 2,
        scale: 1.1,
        opacity: 1,
        ease: "power3.inOut"
    });

    // 2. El texto Hanson aparece desde atrás (un poco más pequeño y subiendo)
    /**/
    tl.from(".hanson-title", {
        duration: 2,
        y: 100,
        scale: 0.8,
        opacity: 0,
        ease: "expo.Out"
    }, "-=1"); // Empieza 1 segundo antes de que termine la anterior
    
});