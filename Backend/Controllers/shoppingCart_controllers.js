const Product = require("../Models/Product");
const shoppingCart = require("../Models/shoppingCart");

async function createEmpty_shoppingCart(req, res) {
  const Cart = new shoppingCart({
    user:req.params.rut_user,
    items:[],
    total:0
  });
  try{
    const find_cart = await shoppingCart.findOne({ rut: req.params.rut_user });
    if (find_cart) return res.status(200).send({msj:"El carro asociado a este usuario ya existe", status:"warning"});

    const newShoppingCart = await shoppingCart.create(Cart);
    return res.status(200).send({
      create:newShoppingCart
    });
  }catch(error){
    return res.status(400).send({ message: error.message });
  }
}

async function addtoCart(req,res){
  try{
    const user_rut = req.query.rut_user
    const prodID = req.query.product_id
    const quantity = req.query.quantity;

    const Cart = await shoppingCart.findOne({user: user_rut});
    if (!Cart) return res.status(404).send({ message: "Carrito de compras no encontrado" ,status:"error"});
    const product = await Product.findById(prodID);
    if (!product) return res.status(404).send({ message: "Producto no encontrado", status:"error"});
    
    // Verificar si el producto ya existe en el carrito
    const existingItem = Cart.items.find(item => item.product.toString() === prodID);
    if(existingItem){
      existingItem.amount+= quantity;
      existingItem.total_product+=  existingItem.price*quantity ;
    }else{
       
      Cart.items.push({
        product: prodID,
        amount: quantity,
        price: product.price,
        total_product: product.price+quantity,
      });
      Cart.total = calculateTotal(Cart.items);
    }

    const updatedShoppingCart = await Cart.save();
    return res.status(200).send({
      add:updatedShoppingCart,
      status:"success"
    });
  }catch(error){
    return res.status(400).send({ message: error.message });
  }
}
const calculateTotal = (items) => {
  let total = 0;
  for (const item of items) {
    total += item.total_product;
  }
  return total;
};

module.exports = {
  createEmpty_shoppingCart,
  addtoCart,
}