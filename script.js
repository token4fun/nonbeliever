// NonBeliever Coin JavaScript
document.addEventListener("DOMContentLoaded", function() {
  /* 1. Atualiza o ticker com os preços das criptomoedas */
  fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin&vs_currencies=usd')
    .then(response => response.json())
    .then(data => {
      const tickerEl = document.getElementById("crypto-ticker");
      if (tickerEl) {
        tickerEl.innerText = `BTC: $${data.bitcoin.usd} | ETH: $${data.ethereum.usd} | BNB: $${data.binancecoin.usd}`;
      }
    })
    .catch(error => console.error("Error fetching crypto prices:", error));

  /* 2. Inicializa o ParticlesJS (certifique-se de que a biblioteca esteja carregada antes deste script) */
  if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
      "particles": {
        "number": { "value": 100 },
        "size": { "value": 3 },
        "color": { "value": "#39ff14" },
        "move": { "speed": 2 }
      }
    });
  } else {
    console.error("particlesJS is not defined. Verifique se a biblioteca está corretamente importada.");
  }

  /* 3. Gerador de Enigma (atualiza o texto a cada 200ms) */
  const enigmaDisplay = document.getElementById("enigma-text");
  if (enigmaDisplay) {
    function generateEnigma() {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let enigma = "";
      for (let i = 0; i < 15; i++) {
        enigma += chars[Math.floor(Math.random() * chars.length)];
      }
      enigmaDisplay.textContent = enigma;
    }
    setInterval(generateEnigma, 200);
  }

  /* 4. Referência aos elementos dos modais e botões */
  const enigmaBtn           = document.getElementById("enigma-btn");
  const enigmaModal         = document.getElementById("enigma-modal");
  const submitLead          = document.getElementById("submit-lead");
  const errorModal          = document.getElementById("error-modal");
  const successModal        = document.getElementById("success-modal");
  const submissionCodeEl    = document.getElementById("submission-code");
  const closeModalBtn       = document.getElementById("close-modal");
  const closeSuccessModalBtn = document.getElementById("close-success-modal");
  const closeErrorModalBtn  = document.getElementById("close-error-modal");

  /* 5. Abre o modal de enigma e limpa os campos quando o usuário clica em "Try to solve" */
  if (enigmaBtn && enigmaModal) {
    enigmaBtn.addEventListener("click", function() {
      enigmaModal.style.display = "block";
      // Limpa os inputs dentro do modal
      const enigmaSolutionInput = enigmaModal.querySelector("input[name='enigmaSolution']");
      const telegramUserInput    = enigmaModal.querySelector("input[name='telegramUser']");
      const emailInput           = enigmaModal.querySelector("input[name='email']");
      if (enigmaSolutionInput) enigmaSolutionInput.value = "";
      if (telegramUserInput)    telegramUserInput.value = "";
      if (emailInput)           emailInput.value = "";
    });
  }

  /* 6. Processa o envio do formulário */
  if (submitLead && enigmaModal) {
    submitLead.addEventListener("click", async function(event) {
      event.preventDefault(); // Impede envios múltiplos acidentais

      // Seleciona os inputs dentro do modal
      const enigmaSolutionInput = enigmaModal.querySelector("input[name='enigmaSolution']");
      const telegramUserInput    = enigmaModal.querySelector("input[name='telegramUser']");
      const emailInput           = enigmaModal.querySelector("input[name='email']");

      const enigmaSolution = enigmaSolutionInput ? enigmaSolutionInput.value.trim() : "";
      const telegramUser   = telegramUserInput ? telegramUserInput.value.trim() : "";
      const email          = emailInput ? emailInput.value.trim() : "";

      // Se qualquer campo estiver vazio, exibe o modal de erro
      if (!enigmaSolution || !telegramUser || !email) {
        if (errorModal) errorModal.style.display = "block";
        return;
      }

      // URL do Google Forms (substitua se necessário)
      const googleFormsURL = "https://docs.google.com/forms/d/e/1FAIpQLSen6vXncObDxoAaenRFUfwZm8hSlXb8MQaEdrbzpUAlrgsjnA/formResponse";

      // Configura os campos do formulário (IDs do Google Forms)
      const formData = new FormData();
      formData.append("entry.204033581", enigmaSolution);
      formData.append("entry.440389986", telegramUser);
      formData.append("entry.903482388", email);

      try {
        await fetch(googleFormsURL, {
          method: "POST",
          body: formData,
          mode: "no-cors"  // Usado para evitar erros de CORS; a resposta será opaca
        });

        // Gera um código de envio único
        const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(2);
        const submissionCode = `NB-${timestamp}-${Math.floor(1000 + Math.random() * 9000)}`;
        if (submissionCodeEl) {
          submissionCodeEl.innerText = `Submission Code: ${submissionCode}`;
        }

        // Exibe o modal de sucesso e oculta o modal de enigma
        if (successModal) successModal.style.display = "block";
        enigmaModal.style.display = "none";
      } catch (error) {
        console.error("Error submitting form:", error);
        if (errorModal) errorModal.style.display = "block";
      }
    });
  }

  /* 7. Handlers para fechar os modais */
  if (closeModalBtn && enigmaModal) {
    closeModalBtn.addEventListener("click", function() {
      enigmaModal.style.display = "none";
    });
  }

  if (closeSuccessModalBtn && successModal) {
    closeSuccessModalBtn.addEventListener("click", function() {
      successModal.style.display = "none";
    });
  }

  if (closeErrorModalBtn && errorModal) {
    closeErrorModalBtn.addEventListener("click", function() {
      errorModal.style.display = "none";
    });
  }
});
