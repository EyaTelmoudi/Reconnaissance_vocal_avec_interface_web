/*

document.getElementById('start-record').addEventListener('click', () => {
  const status = document.getElementById('status');
  const recognizedText = document.getElementById('recognized-text');
  const chatbotResponse = document.getElementById('chatbot-response');

  status.textContent = '🎙️ Enregistrement en cours...';

  fetch('/speech-to-text', { method: 'POST' })
    .then(res => res.json())
    .then(data => {
      status.textContent = '✅ Reçu !';
      recognizedText.textContent = data.text || '(rien reconnu)';
      chatbotResponse.textContent = generateBotResponse(data.text);
    })
    .catch(err => {
      console.error('Erreur :', err);
      status.textContent = '❌ Erreur lors de la reconnaissance vocale.';
    });
});

function generateBotResponse(text) {
  if (!text) return "Je n'ai pas compris.";
  if (text.includes("bonjour")) return "Bonjour à toi !";
  if (text.includes("temps")) return "Je ne suis pas une météo 😅";
  return "Intéressant ! Tu as dit : " + text;
}

*/

document.getElementById('start-record').addEventListener('click', () => {
  const status = document.getElementById('status');
  const recognizedText = document.getElementById('recognized-text');
  const chatbotResponse = document.getElementById('chatbot-response');

  status.textContent = '🎙️ Initialisation...';
  recognizedText.textContent = '';
  chatbotResponse.textContent = '';

  fetch('/speech-to-text', { method: 'POST' })
    .then(async (response) => {
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.trim().split('\n');

        for (const line of lines) {
          try {
            const data = JSON.parse(line);

            if (data.status === "loading_model") {
              status.textContent = "⏳ Chargement du modèle...";
            } else if (data.status === "ready") {
              status.textContent = "✅ Micro prêt ! Vous pouvez parler.";
            } else if (data.text) {
              status.textContent = "✅ Reconnaissance terminée.";
              recognizedText.textContent = data.text || "(rien reconnu)";
              chatbotResponse.textContent = generateBotResponse(data.text);
            }
          } catch (e) {
            console.warn("⛔ Erreur de parsing JSON :", e);
          }
        }
      }
    })
    .catch((err) => {
      console.error('❌ Erreur :', err);
      status.textContent = '❌ Erreur lors de la reconnaissance vocale.';
    });
});

function generateBotResponse(text) {
  if (!text) return "Je n'ai pas compris.";
  if (text.includes("bonjour")) return "Bonjour à toi !";
  if (text.includes("temps")) return "Je ne suis pas une météo 😅";
  return "Intéressant ! Tu as dit : " + text;
}
