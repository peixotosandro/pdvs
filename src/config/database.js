import mongoose from 'mongoose';
import { Mockgoose } from 'mockgoose';

class Database {
  connect() {
    const DB_URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0-dljuu.mongodb.net/pdvs?retryWrites=true&w=majority`;

    if (process.env.NODE_ENV === 'test') {
      const mockgoose = new Mockgoose(mongoose);
      mockgoose.prepareStorage().then(() => {
        mongoose.connect(DB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
      });
    } else {
      mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
  }

  close() {
    return mongoose.disconnect();
  }
}

export default new Database();
