import mongoose from 'mongoose';

const pedidoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  productos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Producto',
    required: true
  }],
  total: {
    type: Number,
    required: true
  },
});

const Pedido = mongoose.model('Pedido', pedidoSchema);

export default Pedido;