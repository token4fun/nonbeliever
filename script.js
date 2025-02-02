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
    });

    document.getElementById("submit-lead").addEventListener("click", async function () {
    const enigmaSolution = document.querySelector("#enigma-modal input[type='text']").value;
    const telegramUser = document.querySelector("#enigma-modal input[type='text']:nth-of-type(2)").value;
    const email = document.querySelector("#enigma-modal input[type='email']").value;

    if (enigmaSolution && telegramUser && email) {
        // Substitua pelo link do Google Forms (form-action URL)
        const googleFormsURL = "https://docs.google.com/forms/d/e/SEU_FORM_ACTION_URL/formResponse";

        // Configurar os campos corretos do formulário
        const formData = new FormData();
        formData.append("entry.123456789", enigmaSolution); // ID do campo do Google Forms
        formData.append("entry.987654321", telegramUser);  // ID do campo Telegram
        formData.append("entry.543216789", email); // ID do campo Email

        // Enviar os dados para o Google Forms
        const response = await fetch(googleFormsURL, {
            method: "POST",
            body: formData,
            mode: "no-cors"
        });

        alert("Your enigma submission has been sent!");
        document.getElementById("enigma-modal").style.display = "none";
    } else {
        alert("Please fill in all fields before submitting.");
    }
});

    
    document.getElementById("close-modal").addEventListener("click", function() {
        document.getElementById("enigma-modal").style.display = "none";
    });
    
    document.getElementById("submit-lead").addEventListener("click", function() {
        const enigmaSolution = document.querySelector("#enigma-modal input[type='text']").value;
        const telegramUser = document.querySelector("#enigma-modal input[type='text']:nth-of-type(2)").value;
        const email = document.querySelector("#enigma-modal input[type='email']").value;
        
        if (enigmaSolution && telegramUser && email) {
            const mailtoLink = `mailto:marcelovpessoa@gmail.com?subject=Enigma Submission&body=Enigma: ${enigmaSolution}%0D%0ATelegram: ${telegramUser}%0D%0AEmail: ${email}`;
            window.location.href = mailtoLink;
            alert("Your enigma submission has been sent!");
            document.getElementById("enigma-modal").style.display = "none";
        } else {
            alert("Please fill in all fields before submitting.");
        }
    });
});
