// NonBeliever Coin JavaScript

document.addEventListener("DOMContentLoaded", function() {
    // Fetch CoinGecko API Data
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin&vs_currencies=usd')
    .then(response => response.json())
    .then(data => {
        document.getElementById("crypto-ticker").innerText = 
            `BTC: $${data.bitcoin.usd} | ETH: $${data.ethereum.usd} | BNB: $${data.binancecoin.usd}`;
    })
    .catch(error => console.error("Error fetching crypto prices:", error));

    // Initialize Particles JS
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 100 },
            "size": { "value": 3 },
            "color": { "value": "#39ff14" },
            "move": { "speed": 2 }
        }
    });

    // Enigma Generator
    const enigmaDisplay = document.getElementById("enigma-text");
    function generateEnigma() {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let enigma = "";
        for (let i = 0; i < 15; i++) {
            enigma += chars[Math.floor(Math.random() * chars.length)];
        }
        enigmaDisplay.textContent = enigma;
    }
    setInterval(generateEnigma, 200);

    // Modal Handlers
    document.getElementById("enigma-btn").addEventListener("click", function() {
        document.getElementById("enigma-modal").style.display = "block";
        document.querySelector("#enigma-modal input[name='enigmaSolution']").value = "";
        document.querySelector("#enigma-modal input[name='telegramUser']").value = "";
        document.querySelector("#enigma-modal input[name='email']").value = "";
    });

    document.getElementById("submit-lead").addEventListener("click", async function (event) {
        event.preventDefault(); // Impede envios múltiplos acidentais

        const enigmaSolution = document.querySelector("#enigma-modal input[name='enigmaSolution']").value;
        const telegramUser = document.querySelector("#enigma-modal input[name='telegramUser']").value;
        const email = document.querySelector("#enigma-modal input[name='email']").value;

        if (!enigmaSolution || !telegramUser || !email) {
            document.getElementById("error-modal").style.display = "block";
            return;
        }

        // Substitua pelo link do Google Forms (form-action URL)
        const googleFormsURL = "https://docs.google.com/forms/d/e/1FAIpQLSen6vXncObDxoAaenRFUfwZm8hSlXb8MQaEdrbzpUAlrgsjnA/formResponse";

        // Configurar os campos corretos do formulário
        const formData = new FormData();
        formData.append("entry.204033581", enigmaSolution); // ID do campo do Google Forms
        formData.append("entry.440389986", telegramUser);  // ID do campo Telegram
        formData.append("entry.903482388", email); // ID do campo Email

        try {
            await fetch(googleFormsURL, {
                method: "POST",
                body: formData,
                mode: "no-cors"
            });

            // Gerar código de envio
            const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(2);
            const submissionCode = `NB-${timestamp}-${Math.floor(1000 + Math.random() * 9000)}`;
            document.getElementById("submission-code").innerText = `Submission Code: ${submissionCode}`;

            // Exibir Modal de Confirmação
            document.getElementById("success-modal").style.display = "block";
            document.getElementById("enigma-modal").style.display = "none";
        } catch (error) {
            console.error("Error submitting form:", error);
            document.getElementById("error-modal").style.display = "block";
        }
    });

    document.getElementById("close-modal").addEventListener("click", function() {
        document.getElementById("enigma-modal").style.display = "none";
    });

    document.getElementById("close-success-modal").addEventListener("click", function() {
        document.getElementById("success-modal").style.display = "none";
    });

    document.getElementById("close-error-modal").addEventListener("click", function() {
        document.getElementById("error-modal").style.display = "none";
    });
});
