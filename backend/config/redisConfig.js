const { Redis } = require("ioredis");
require("dotenv").config();

const redis = new Redis(process.env.URL_REDIS);

module.exports = redis;
