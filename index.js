const express = require('express');
const cors = require('cors');
const getWord = require('./word');

const app = express();

let PORT = process.env.PORT || 3000; // when no env var set

app.use(cors());

app.get('/word', function (req, res) {
  res.status(200).send(`
      <html>
        <body style="display: flex; flex-direction:column; width:100%; height: auto; align-items: center; justify-content: flex-start;">
          <h1 style="display: flex; justify-content: center;">
            Guess Word
          </h1>
            <div id="output">
              <p style="text-align: center; font-size: 1.5rem; font-family: monospace; letter-spacing: 1; color: orangered;">${getWord()}</p>
            </div>
        </body>
      </html>
  `);
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT);
  console.log(`Server running port: ${PORT}`);
}

module.exports = app;
