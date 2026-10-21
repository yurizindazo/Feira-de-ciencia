
 // CIARTEC — Interatividade da página Direitos

// 1. PRINCÍPIOS INTERATIVOS
const cardsPrincipio = document.querySelectorAll(".card-principio");
const tituloPrincipio = document.getElementById("principio-titulo");
const textoPrincipio = document.getElementById("principio-texto");

if (cardsPrincipio.length && tituloPrincipio && textoPrincipio) {
    cardsPrincipio.forEach((card) => {
        card.addEventListener("click", () => {
            cardsPrincipio.forEach((item) => {
                item.classList.remove("selecionado");
                item.setAttribute("aria-pressed", "false");
            });

            card.classList.add("selecionado");
            card.setAttribute("aria-pressed", "true");

            tituloPrincipio.textContent = card.dataset.titulo || "";
            textoPrincipio.textContent = card.dataset.texto || "";
        });
    });
}

// 2. LINHA DO TEMPO
const marcos = document.querySelectorAll(".marco");
const anoMarco = document.getElementById("marco-ano");
const tituloMarco = document.getElementById("marco-titulo");
const textoMarco = document.getElementById("marco-texto");

if (marcos.length && anoMarco && tituloMarco && textoMarco) {
    marcos.forEach((marco) => {
        marco.addEventListener("click", () => {
            marcos.forEach((item) => {
                item.classList.remove("ativo");
                item.setAttribute("aria-pressed", "false");
            });

            marco.classList.add("ativo");
            marco.setAttribute("aria-pressed", "true");

            anoMarco.textContent = marco.dataset.ano || "";
            tituloMarco.textContent = marco.dataset.titulo || "";
            textoMarco.textContent = marco.dataset.texto || "";
        });
    });
}

// 3. GRÁFICO HISTÓRICO
// 3. GRÁFICO HISTÓRICO
const canvas = document.getElementById("grafico-direitos");
const seletor = document.getElementById("tipo-grafico");

if (canvas && seletor && typeof Chart !== "undefined") {
    const anos = [
        "2016", "2017", "2018", "2019", "2020",
        "2021", "2022", "2023", "2024", "2025"
    ];

    const valores = [
        64.17, 67.90, 72.56, 78.38, 81.49,
        88.23, 107.22, 116.36, 123.25, 117.83
    ];

    const formatarValor = (valor) =>
        `${valor.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })} milhões`;

    const grafico = new Chart(canvas, {
        type: seletor.value === "bar" ? "bar" : "line",

        data: {
            labels: anos,
            datasets: [{
                label: "Pessoas deslocadas à força",
                data: valores,
                borderWidth: 3,
                tension: 0.3,
                fill: false,
                pointRadius: 4,
                pointHoverRadius: 7
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    display: true
                },
                tooltip: {
                    callbacks: {
                        label: (context) =>
                            ` ${formatarValor(context.parsed.y)}`
                    }
                }
            },

            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "Milhões de pessoas"
                    }
                }
            }
        }
    });

    seletor.addEventListener("change", () => {
        if (seletor.value !== "line" && seletor.value !== "bar") {
            return;
        }

        grafico.config.type = seletor.value;
        grafico.update();
    });
}

// CIARTEC — Ajustes de segurança do gráfico
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("grafico-direitos");
    const seletor = document.getElementById("tipo-grafico");

    if (!canvas || !seletor) return;

    seletor.addEventListener("change", () => {
        const grafico = Chart.getChart(canvas);

        if (!grafico) return;

        const tipoSelecionado = seletor.value;

        if (tipoSelecionado === "bar" || tipoSelecionado === "line") {
            grafico.config.type = tipoSelecionado;
            grafico.update();
        }
    });
});