export const envConfiguration = () => ({
  enviroment: process.env.NODE_ENV || 'dev',
  mongo_db_cnn: process.env.MONGO_DB_CNN,
  port: process.env.PORT || 3000,
  defaultLimit: +process.env.DEFAULT_LIMIT || 7,
});
