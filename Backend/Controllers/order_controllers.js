const Order = require("../Models/Order");
const User = require("../Models/User");
const Product = require("../Models/Product");
const shoppingCart = require("../Models/shoppingCart");

async function createOrder(req, res) {
  const {email, Delivery, Address} = req.body;
  try {
    // Crear una instancia del modelo Order con los datos de la orden de compra
    const user = await User.findOne({email: email});
    console.log(user.address);
    const cart = await shoppingCart.findOne({ User: email});
    console.log(cart);

    let type = 'delivery'
    let address = user.address;
    if(!Delivery){
        type = 'retiro';
        address = Address
    }

    //validar carrito
    for (const item of cart.items) {
        const isProduct = await Product.findOne({ title: item.TitleProduct}); //identifico el producto
        if (isProduct) {
        //producto
          const stockItem = isProduct.stock.find(stock => stock.size === item.Size); //encuentro el producto de la talla que hay en el carrito
          const available =  stockItem.quantity //stock disponible de la talla
          //carro
          const amount = item.Quantity;
          if (available < amount) return res.status(400).send({msj:"No hay suficiente stock del producto", status:"error"});
        }else{
          return res.status(400).send({msj:"Error al encontrar el producto el inventario", status:"error"});
        }
      }
    const order = new Order({
      user: user,
      cart: cart,
      address : address,
      deliveryType: type, 
      status: "pending" // Puedes establecer un estado inicial para la orden, como "pending"
    });

    // Guardar la orden de compra en la base de datos
    const newOrder = await order.save();

    res.status(200).send({
      message: "Orden de compra creada exitosamente",
      order: newOrder
    });
  } catch (error) {
    // Error al crear la orden de compra
    res.status(500).send({ message: "Error al crear la orden de compra" , error});
  }
}

module.exports = {
  createOrder
};
