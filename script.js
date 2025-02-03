document.addEventListener("DOMContentLoaded", function() {
  // 1. Atualiza o ticker com os preços das criptomoedas
  fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin&vs_currencies=usd')
    .then(response => response.json())
    .then(data => {
      const cryptoTicker = document.getElementById("crypto-ticker");
      if (cryptoTicker) {
        cryptoTicker.innerText = `BTC: $${data.bitcoin.usd} | ETH: $${data.ethereum.usd} | BNB: $${data.binancecoin.usd}`;
      }
    })
    .catch(error => console.error("Erro ao buscar preços:", error));

  // 2. Inicializa o ParticlesJS
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
    console.error("particlesJS não está definido. Verifique a importação da biblioteca.");
  }

  // 3. Gerador de Enigma (atualiza o texto a cada 200ms)
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

  // 4. Configuração dos modais e dos _event listeners_
  const enigmaBtn            = document.getElementById("enigma-btn");
  const enigmaModal          = document.getElementById("enigma-modal");
  const submitLead           = document.getElementById("submit-lead");
  const successModal         = document.getElementById("success-modal");
  const errorModal           = document.getElementById("error-modal");
  const submissionCodeEl     = document.getElementById("submission-code");
  const closeModalBtn        = document.getElementById("close-modal");
  const closeSuccessModalBtn = document.getElementById("close-success-modal");
  const closeErrorModalBtn   = document.getElementById("close-error-modal");

  // Abre o modal de enigma e limpa os campos quando o usuário clica no botão "Try to solve"
  if (enigmaBtn && enigmaModal) {
    enigmaBtn.addEventListener("click", function() {
      enigmaModal.style.display = "block";
      // Limpa os inputs dentro do modal
      const textInputs = enigmaModal.querySelectorAll("input[type='text']");
      const emailInput = enigmaModal.querySelector("input[type='email']");
      textInputs.forEach(input => input.value = "");
      if (emailInput) emailInput.value = "";
    });
  }

  // Envia os dados para o Google Forms utilizando modais para feedback
  if (submitLead && enigmaModal) {
    submitLead.addEventListener("click", async function(event) {
      event.preventDefault();

      // Seleciona os inputs dentro do modal
      const textInputs = enigmaModal.querySelectorAll("input[type='text']");
      const emailInput = enigmaModal.querySelector("input[type='email']");

      // Assume que:
      // - O primeiro input text é o enigmaSolution
      // - O segundo input text é o telegramUser
      const enigmaSolution = textInputs[0] ? textInputs[0].value.trim() : "";
      const telegramUser   = textInputs[1] ? textInputs[1].value.trim() : "";
      const email          = emailInput ? emailInput.value.trim() : "";

      // Se algum campo estiver vazio, exibe o modal de erro
      if (!enigmaSolution || !telegramUser || !email) {
        if (errorModal) errorModal.style.display = "block";
        return;
      }

      // URL do Google Forms (substitua conforme necessário)
      const googleFormsURL = "https://docs.google.com/forms/d/e/1FAIpQLSen6vXncObDxoAaenRFUfwZm8hSlXb8MQaEdrbzpUAlrgsjnA/formResponse";

      // Configura os dados do formulário
      const formData = new FormData();
      formData.append("entry.204033581", enigmaSolution);
      formData.append("entry.440389986", telegramUser);
      formData.append("entry.903482388", email);

      try {
        // Envia os dados para o Google Forms
        await fetch(googleFormsURL, {
          method: "POST",
          body: formData,
          mode: "no-cors"
        });

        // Gera um código único de submissão
        const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(2);
        const submissionCode = `NB-${timestamp}-${Math.floor(1000 + Math.random() * 9000)}`;
        if (submissionCodeEl) {
          submissionCodeEl.innerText = `Submission Code: ${submissionCode}`;
        }

        // Exibe o modal de sucesso e oculta o modal de enigma
        if (successModal) successModal.style.display = "block";
        enigmaModal.style.display = "none";
      } catch (error) {
        console.error("Erro ao enviar o formulário:", error);
        if (errorModal) errorModal.style.display = "block";
      }
    });
  }

  // 5. Handlers para fechar os modais
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
