const Order = require("../Models/Order");
const User = require("../Models/User");
const Product = require("../Models/Product");
const shoppingCart = require("../Models/shoppingCart");
const cron = require("node-cron");
const moment = require('moment');


async function createOrder(userID, Delivery) {
  try {
    // Crear una instancia del modelo Order con los datos de la orden de compra
    const user = await User.findById(userID).select('-pass');;
    const cart = await shoppingCart.findOne({ User: user });
    let available;
    let amount;
    //validar carrito
    for (const item of cart.items) {
      let isProduct = await Product.findById(item.idProduct); //identifico el producto
      //console.log(isProduct);

      if (isProduct) {
        //producto
        let stockItem = isProduct.stock.find((stock) => stock.size === item.Size); //encuentro el producto de la talla que hay en el carrito
        available = stockItem.quantity; //stock disponible de la talla
        //carro
        amount = item.Quantity;
        if (available < amount)
          throw new Error("No hay suficiente stock del producto");
      } else {
          throw new Error("Error al encontrar el producto en el inventario");
      }
    }

    const order = new Order({
      User: user,
      Cart: [{"cartID": cart._id}, {"Products" : cart.items}, {"Total": cart.total}],
      Delivery: Delivery,
      Status: "pendingPayment",
    });

    // Guardar la orden de compra en la base de datos
    const newOrder = await order.save();
    return newOrder;
  } catch (error) {
    // Error al crear la orden de compra
    throw error;
  }
}

async function updateOrderStatusWebpay(orderID) {
  try {
    //const { id } = req.params;
    const updatedOrder = await Order.findByIdAndUpdate(
      orderID,
      { Status: "En curso" },
      { new: true }
    );
    return updatedOrder;
    //res.status(200).json(updatedOrder);
  } catch (error) {
    throw error;
  }
}

async function updateOrderStatusAmdmin(req, res) {
  const orderID = req.body.orderID
  const status = req.body.status
  try {
    //const { id } = req.params;
    const updatedOrder = await Order.findByIdAndUpdate(
      orderID,
      { Status: status },
      { new: true }
    );
    return res.status(200).send({updateOrder: updatedOrder, status: "success"});
    //res.status(200).json(updatedOrder);
  } catch (error) {
    return res.status(400).send({message: "Error al actualizar el estado de la orden"});
  }
}

function removeAll(req, res) {
  Order.deleteMany({}, (error) => {
    if (error) {
      return res.status(400).send({ msj: "Error al remover ordenes" });
    } else {
      res.status(200).send({ msj: "Se eliminaron todas las ordenes" });
    }
  });
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

async function getAll(req, res){
  Order.find({}, (error, orders) => {
    if (error) {
      return res.status(400).send({ message: "Error al encontrar las ordenes" , status: "Error"});
    } else {
      res.status(200).send({orders: orders, status: "success"}); // El producto encontrado
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
  updateOrderStatusWebpay,
  updateOrderStatusAmdmin,
  getOrder,
  getAll,
  removeAll
};