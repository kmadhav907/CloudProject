import mongoose from 'mongoose';

const encryptionSchema = mongoose.Schema({
  data: {
    type: String,
    required: true
  },
  decryptionMessage: {
    type: String,
    required: true
  },
  encryptedmessage: {
    type: String,
    required: true
  }
});
const Encrypt = mongoose.model('Encrpyt', encryptionSchema);

export default Encrypt;
