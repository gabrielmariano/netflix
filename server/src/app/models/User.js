import { Schema, model } from 'mongoose';

const useSchema = new Schema(
  {
    usuario: {
      type: String,
      required: true,
      maxlength: 50,
    },
    senha: {
      type: String,
      required: true,
      maxlength: 10,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      maxlength: 50,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('user', useSchema);
