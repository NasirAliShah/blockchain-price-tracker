const axios = require('axios');
const Moralis = require('moralis').default;
const dotenv = require('dotenv').config();  // Initialize dotenv
const { Price } = require('../models');

const initializeMoralis = async () => {
  try {
    await Moralis.start({
      apiKey: process.env.MORALIS_API_KEY
    });
    console.log("Moralis initialized successfully.");
  } catch (error) {
    console.error("Error initializing Moralis:", error);
  }
};

// Call this function once during app initialization
initializeMoralis();
const fetchAndStorePrice = async (chain) => {
  try {
    const response = await Moralis.EvmApi.token.getTokenPrice({
      chain: chain,
      include: "percent_change",
      address: chain === '0x89'
        ? "0x1C954E8fe737F99f68Fa1CCda3e51ebDB291948C"
        : "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0"
    });

    const price = response.raw.usdPrice;
    await Price.create({ chain, price });
  } catch (error) {
    console.error(`Error fetching price for ${chain}:`, error);
  }
};

module.exports = {
  fetchAndStorePrice
};
