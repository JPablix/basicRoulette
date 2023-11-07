const ruleta = document.getElementById('ruleta');
const botonGirar = document.getElementById('girar');
const imagenes = [
    'imagen1.png',
    'imagen2.png',
    'imagen3.png',
    'imagen4.png',
    'imagen5.png',
    'imagen6.png',
    'imagen7.png',
    
];
const probabilidades = [20, 13, 4, 6, 13, 20, 10]
const gradosPorProbabilidad = probabilidades.map(p => (360 * p) / 100);

let anguloActual = 0;
let giroEnProgreso = false;

gradosPorProbabilidad.forEach((grados, index) => {
    const sector = document.createElement('div');
    sector.className = 'sector';
    sector.style.backgroundImage = `url('imagenes/${imagenes[index]}')`;
    sector.style.transform = `rotate(${anguloActual}deg)`;
    anguloActual += grados;
    ruleta.appendChild(sector);
});

function girarRuleta() {
    if (!giroEnProgreso) {
        giroEnProgreso = true;
        botonGirar.textContent = "BUENA SUERTE";
        let sumaProbabilidades = 0;
        const resultadoRandom = Math.random() * 100;
        let anguloFinal = 0;

        for (let i = 0; i < probabilidades.length; i++) {
            sumaProbabilidades += probabilidades[i];
            if (resultadoRandom <= sumaProbabilidades) {
                anguloFinal = gradosPorProbabilidad.slice(0, i + 1).reduce((a, b) => a + b, 0);
                break;
            }
        }

        anguloFinal += 360 * (Math.floor(Math.random() * 3) + 2);

        ruleta.style.transition = 'transform 4s ease-out';
        ruleta.style.transform = `rotate(${anguloActual + anguloFinal}deg)`;

        setTimeout(() => {
            ruleta.style.transition = 'none';
            anguloActual = (anguloActual + anguloFinal) % 360;
            ruleta.style.transform = `rotate(${anguloActual}deg)`;
            giroEnProgreso = false; 
            botonGirar.textContent = "GIRAR AHORA";
        }, 4000);
    }
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        girarRuleta();
    }
});
