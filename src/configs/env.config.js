require('dotenv').config({ path: `${__dirname}/../environments/.dev.env` });

module.exports = {
  mongodb: {
    USER: process.env.USER_MONGODB,
    HOST: process.env.HOST_MONGODB,
    PASS: process.env.PASS_MONGODB,
    DATABASE: process.env.DATABASE_MONGODB,
  },
  server: {
    PORT: process.env.PORT_SERVER,
  },
};
