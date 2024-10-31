const { Alert, Price } = require('./models')
const cron = require('node-cron');
const { fetchAndStorePrice } = require('./services/priceService');
const express = require('express')
const app = express();

cron.schedule('*/5 * * * *', () => {
  // for ethereum token 
  fetchAndStorePrice('0x1');
  // for polygon token
  fetchAndStorePrice('0x89');
});

app.get('/prices/:chain', async (req, res) => {
  const { chain } = req.params;
  const oneDayAgo = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);

  const prices = await Price.findAll({
    where: { chain, timestamp: { [Op.gte]: oneDayAgo } },
    order: [['timestamp', 'DESC']],
  });

  res.json(prices);
});
app.post('/alerts', async (req, res) => {
  const { chain, targetPrice, email } = req.body;
  const alert = await Alert.create({ chain, targetPrice, email });
  res.json(alert);
});

