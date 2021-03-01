const request = require('supertest');
const app = require('./index.js');
const $ = require('jquery');

let PORT = process.env.PORT || 3000;

let server, agent, response;
beforeAll((done) => {
  server = app.listen(PORT, async (err) => {
    if (err) return done(err);
    agent = request.agent(server);
    response = await agent.get('/word');
    done();
  });
});

describe('GET/word', () => {
  test('server responds with status 200', async () => {
    await expect(response.statusCode).toBe(200);
  });

  test('response should contain heading "Guess Word"', async () => {
    const txtData = $(response.text).text();
    await expect(txtData).toContain('Guess Word');
  });

  test('response should be a five-letter word', async () => {
    document.documentElement.innerHTML = response.text;
    let word = $('#output').text().trim();
    await expect(word.length).toBe(5);
  });
});
