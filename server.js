
/*
const express = require('express');
const path = require('path');
const { spawn } = require('child_process');

const app = express();
const PORT = 3001;

// Servir les fichiers statiques du frontend
app.use(express.static(path.join(__dirname, 'frontend')));

// Route POST pour lancer la reconnaissance vocale
app.post('/speech-to-text', (req, res) => {
  console.log('🟡 Requête reçue à /speech-to-text');

  const pythonProcess = spawn('python', ['-u', 'total_vosk.py'], {
    cwd: __dirname,
    stdio: ['pipe', 'pipe', 'pipe'],
  });

  let result = '';

  pythonProcess.stdout.on('data', (data) => {
    try {
      const message = data.toString();
      console.log('📥 Sortie Python :', message);

      // On traite uniquement les messages JSON
      if (message.trim().startsWith('{')) {
        const result = JSON.parse(message);
        const texteReconnu = result.text;
        console.log('✅ Texte final reconnu :', texteReconnu);

        // Envoi du texte reconnu au client via la réponse HTTP
        res.json({ text: texteReconnu });
      }
    } catch (err) {
      console.error('🔴 Erreur de parsing JSON :', err.message);
    }
  });

  pythonProcess.stderr.on('data', (err) => {
    console.error('🔴 Erreur Python :', err.toString());
  });

  pythonProcess.on('close', (code) => {
    console.log(`✅ Script terminé avec code ${code}`);
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
*/

const express = require('express');
const path = require('path');
const { spawn } = require('child_process');

const app = express();
const PORT = 3001;

app.use(express.static(path.join(__dirname, 'frontend')));

app.post('/speech-to-text', (req, res) => {
  console.log('🟡 Requête reçue à /speech-to-text');

  const pythonProcess = spawn('python', ['-u', 'total_vosk.py'], { cwd: __dirname });

  res.setHeader('Content-Type', 'text/plain');

  pythonProcess.stdout.on('data', (data) => {
    const lines = data.toString().trim().split('\n');
    lines.forEach((line) => {
      if (line.startsWith('status:')) {
        const status = line.split(':')[1];
        console.log(`🔄 Statut reçu du modèle : ${status}`);
        res.write(JSON.stringify({ status }) + '\n');
      } else if (line.startsWith('{')) {
        try {
          const json = JSON.parse(line);
          console.log('✅ Résultat final :', json.text);
          res.write(JSON.stringify(json) + '\n');
        } catch (e) {
          console.error('🔴 JSON invalide :', e.message);
        }
      }
    });
  });

  pythonProcess.stderr.on('data', (err) => {
    console.error('🔴 Erreur Python :', err.toString());
  });

  pythonProcess.on('close', (code) => {
    console.log(`✅ Script terminé avec code ${code}`);
    res.end(); // Important pour terminer la réponse côté client
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
