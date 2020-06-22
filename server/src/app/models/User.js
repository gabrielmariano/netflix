import { Schema, model } from 'mongoose';

/* Schema padrão do mongoose */

const useSchema = new Schema(
  {
    usuario: {
      type: String, // campo do tipo string
      required: true, // campo obrigatório
      maxlength: 50, // tamanho maximo de 50 caracteres
    },
    senha: {
      type: String,
      required: true,
      maxlength: 10,
    },
    email: {
      type: String,
      unique: true, // campo único -- não pode existir mais de um email
      required: true, // campo obrigatório
      maxlength: 50,
    },
  },
  {
    timestamps: true, // timestamps para criar um registro DATE
    // para inserção e atualização de todo e qualquer elemento no banco de dados
  }
);

export default model('user', useSchema);
