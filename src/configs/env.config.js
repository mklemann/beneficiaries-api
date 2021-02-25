require('dotenv').config({
  path:
    process.env.NODE_ENV === 'test'
      ? `${__dirname}/../environments/.dev.env`
      : `${__dirname}/../environments/.staging.env`,
});

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
