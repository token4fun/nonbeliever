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
            "number": { "value": 150 },
            "size": { "value": 3 },
            "color": { "value": "#0ff" },
            "move": { "speed": 2 }
        }
    });

    // Enigma Generator
    const enigmaDisplay = document.getElementById("enigma-text");
    function generateEnigma() {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let enigma = "";
        for (let i = 0; i < 29; i++) {
            enigma += chars[Math.floor(Math.random() * chars.length)];
        }
        enigmaDisplay.textContent = enigma;
    }
    setInterval(generateEnigma, 200);

    // Modal Handlers
    document.getElementById("enigma-btn").addEventListener("click", function() {
        document.getElementById("enigma-modal").style.display = "block";
    });
    
    document.getElementById("close-modal").addEventListener("click", function() {
        document.getElementById("enigma-modal").style.display = "none";
    });
    
    document.getElementById("submit-lead").addEventListener("click", function() {
        alert("Thank you for signing up!");
        document.getElementById("lead-modal").style.display = "none";
    });

    // Loading Animation
    setTimeout(() => {
        document.getElementById("loading-screen").style.display = "none";
    }, 4000);
});
