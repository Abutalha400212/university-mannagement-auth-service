import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { errorlogger, logger } from './Shared/logger';
async function boostrap() {
  try {
    await mongoose.connect(config.database_url as string, {
      dbName: 'University_Mannagent',
    });
    logger.info('🛢 Database is connected Successfully');

    app.listen(config.port, () => {
      logger.info(`⚡ Example app listening on port ${config.port}`);
    });
  } catch (error) {
    errorlogger.error('Failed to connect database', error);
  }
}

boostrap();
