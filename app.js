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
// Datos de ejemplo para los conciertos
const conciertos = [
    { fecha: "15 MAY", ciudad: "Madrid", local: "Wizink Center" },
    { fecha: "22 MAY", ciudad: "Barcelona", local: "Razzmatazz" },
    { fecha: "05 JUN", ciudad: "Valencia", local: "Sala Moon" },
    { fecha: "12 JUN", ciudad: "Sevilla", local: "Antiquarium" }
];

document.addEventListener("DOMContentLoaded", () => {
    // 1. Renderizamos la lista SOLO si el contenedor existe
    const listContainer = document.getElementById("concert-list");
    if (listContainer) {
        renderConcerts(listContainer);
    } else {
        console.warn("GSAP Master Info: No se encontró el id 'concert-list'. Saltando renderizado.");
    }
});

function renderConcerts(container) {
    conciertos.forEach(concierto => {
        const row = document.createElement("div");
        row.className = "concert-row";
        row.innerHTML = `
            <span class="concert-date">${concierto.fecha}</span>
            <span class="concert-city">${concierto.ciudad}</span>
            <span class="concert-site">${concierto.local}</span>
        `;
        container.appendChild(row);
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
    /*
    tl.from(".hanson-title", {
        duration: 1.5,
        y: 100,
        scale: 0.8,
        opacity: 0,
        ease: "expo.out"
    }, "-=1"); // Empieza 1 segundo antes de que termine la anterior
    */
    // 3. Animación de las fechas de conciertos (que ya teníamos)
    tl.from(".concert-row", {
        duration: 0.8,
        opacity: 0,
        x: -20,
        stagger: 0.1,
        ease: "power2.out"
    }, "-=0.5");
});