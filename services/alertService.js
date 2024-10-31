const nodemailer = require('nodemailer');
const { Alert, Price } = require('../models');

const checkPriceAlerts = async () => {
  const alerts = await Alert.findAll();
  for (const alert of alerts) {
    const latestPrice = await Price.findOne({
      where: { chain: alert.chain },
      order: [['timestamp', 'DESC']],
    });

    if (latestPrice && parseFloat(latestPrice.price) >= parseFloat(alert.targetPrice)) {
      await sendEmail(alert.email, alert.chain, latestPrice.price);
    }
  }
}

const sendEmail = async (to, chain, price) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password',
    },
  });

  await transporter.sendMail({
    from: 'no-reply@price-tracker.com',
    to: 'hyperhire_assignment@hyperhire.in',
    subject: `${chain} Price Alert`,
    text: `${chain} has reached the target price of $${price}`,
  });
}

module.exports = { checkPriceAlerts };
