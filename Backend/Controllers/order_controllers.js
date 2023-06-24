const Order = require("../Models/Order");
const User = require("../Models/User");
const Product = require("../Models/Product");
const shoppingCart = require("../Models/shoppingCart");
const cron = require("node-cron");
const moment = require('moment');

async function createOrder(userID, Delivery) {
  try {
    // Crear una instancia del modelo Order con los datos de la orden de compra
    const user = await User.findOne({ _id: userID });
    const cart = await shoppingCart.findOne({ User: user.email });

    //validar carrito
    for (const item of cart.items) {
      const isProduct = await Product.findOne({ title: item.TitleProduct }); //identifico el producto
      if (isProduct) {
        //producto
        const stockItem = isProduct.stock.find(
          (stock) => stock.size === item.Size
        ); //encuentro el producto de la talla que hay en el carrito
        const available = stockItem.quantity; //stock disponible de la talla
        //carro
        const amount = item.Quantity;
        if (available < amount)
          return res
            .status(400)
            .send({
              msj: "No hay suficiente stock del producto",
              status: "error",
            });
      } else {
        return res
          .status(400)
          .send({
            msj: "Error al encontrar el producto el inventario",
            status: "error",
          });
      }
    }

    const order = new Order({
      User: user,
      Cart: [{"Products" : cart.items}, {"Total": cart.total}],
      Delivery: Delivery,
      Status: "pendingPayment",
    });

    // Guardar la orden de compra en la base de datos
    const newOrder = await order.save();
    return newOrder;
  } catch (error) {
    // Error al crear la orden de compra
    res
      .status(500)
      .send({ message: "Error al crear la orden de compra", error });
  }
}

async function updateOrderStatus(req, res) {
  try {
    const { id } = req.params;
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { Status: "en curso" },
      { new: true }
    );

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error(
      "Error al actualizar el estado de la orden de compra:",
      error
    );
    res
      .status(500)
      .json({ error: "Error al actualizar el estado de la orden de compra" });
  }
}

async function getOrder(req, res) {
  const id = req.params.id;
  Order.findById(id, (error, order) => {
    if (error) {
      return res.status(400).send({ msj: "No se pudo encontrar la orden" });
    } else {
      res.status(200).send(order); // El producto encontrado
    }
  });
}

cron.schedule('0 */12 * * *', async () => {
  try {
    const expirationDate = moment().subtract(12, 'hours').toDate();

    const expiredOrders = await Order.find({
      status: 'pendingPayment',
      createdAt: { $lte: expirationDate }
    }).exec();

    for (const order of expiredOrders) {
      // Elimina la orden
      await order.remove();
    }

    console.log('Órdenes eliminadas:', expiredOrders.length);
  } catch (error) {
    console.error('Error al eliminar las órdenes:', error);
  }
});

module.exports = {
  createOrder,
  updateOrderStatus,
  getOrder,
};
