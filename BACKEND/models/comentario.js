import mongoose from 'mongoose';

const comentarioSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  contenido: {
    type: String,
    required: true
  },
});

const Comentario = mongoose.model('Comentario', comentarioSchema);

export default Comentario;