const config = {
  production: {
    ssl: true,
    port: 443,
    hostname: "example.com"
  },
  development: {
    ssl: false,
    port: 4000,
    hostname: "localhost",
    database: {
      host: "ds243897.mlab.com",
      port: 43897,
      name: "flashcards"
    }
  }
};

module.exports = config;