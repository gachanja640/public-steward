const express = require('express');
const cors = require('cors');
const cheerio = require('cheerio');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/api/rules', async (req, res) => {
  try {
    const { data } = await axios.get('https://www.fia.com/documents');
    const $ = cheerio.load(data);
    const rules = [];

    $('div.views-row').each((i, el) => {
      const title = $(el).find('.file-title a').text().trim();
      const url = 'https://www.fia.com' + $(el).find('.file-title a').attr('href');
      const date = $(el).find('.date-display-single').text().trim();

      if (title.toLowerCase().includes('regulations') || title.includes('International Sporting Code')) {
        rules.push({ title, url, date });
      }
    });

    res.json(rules);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch FIA rules.' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));