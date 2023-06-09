const Product = require("../Models/Product");
const guestShoppingCart = require("../Models/guestShoppingCart");

//CREAR CARRO VACIO
async function createEmpty_shoppingCart(user) {
  try {
    const Cart = new guestShoppingCart({
      User: user,
      items: [],
      total: 0,
    });
    // const find_cart = await guestShoppingCart.findOne({ User: user });
    // if (find_cart) throw new Error("Ya existe un carro asociado al usuario");

    await guestShoppingCart.create(Cart);
  } catch (error) {
    throw error;
  }
}

//AGREGAR PRODUCTO AL CARRO
async function addtoCart(req, res) {
  const sessionID = req.sessionID;
  const TitleProduct = req.body.TitleProduct;
  const Size = req.body.Size;
  const Quantity = req.body.Quantity;
  try {
    //Buscar si el producto esta en la bdd
    const isProduct = await Product.findOne({ title: TitleProduct });
    if (!isProduct)
      return res
        .status(400)
        .send({ msj: "Producto no encontrado", status: "error" });
    //revisa que exista stock

    const stockItem = isProduct.stock.find((item) => item.size === Size);
    if (stockItem == null) return res.status(400).send({ msj: "No existe esa talla", status: "error" });
    if (stockItem.quantity < Quantity) return res.status(400).send({ msj: "No hay stock suficiente", status: "error" });

    //Buscar el carro asociado al usuario
    let cart = await guestShoppingCart.findOne({ sessionID: sessionID });
    //Si no existe el carro, se crea asociado al usuario
    if (!cart) {
      cart = new guestShoppingCart({
        sessionID: sessionID,
        items: [],
        total: 0,
      });
    }

    //Verificacion de si el producto esta en el carro
    const existItem = await cart.items.find(
      (item) => item.TitleProduct === TitleProduct && item.Size === Size
    );
    //const existSize = await cart.items.find(item => item.Size===Size);
    if (existItem) {
      //Se suma la cantidad al producto asociado en el carritp
      existItem.Quantity += Quantity;
    } else {
      //Se agrega el producto como nuevo
      let price = isProduct.price;
      if(isProduct.sale){
        price = Math.floor((isProduct.price-(isProduct.price*(isProduct.percentageSale/100))));
      }
      cart.items.push({
        TitleProduct: TitleProduct,
        Size: Size,
        Quantity: Quantity,
        price: price,
      });
    }
    //calcular el total en este instante
    if (cart.items.length > 0) {
      cart.total = calculateTotal(cart.items);
    } else {
      cart.total = 0;
    }
    await cart.save((error, cartUpdate) => {
      if (error) {
        return res
          .status(400)
          .send({ msj: "Error al crear el producto, intentar nuevamente" });
      } else {
        res.status(200).send(cartUpdate);
      }
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({
        msj: "Ha ocurrido un error al agregar el producto al carro",
        status: "error",
      });
  }
}

//CALCULO DEL TOTAL DEL CARRO
const calculateTotal = (items) => {
  let total = 0;
  items.forEach((item) => {
    total += item.price * item.Quantity;
  });
  return total;
};

//ELIMINACION DE PRODUCTOS DEL CARRO
async function removeFromCart(req, res) {
  const User = req.body.User;
  const TitleProduct = req.body.TitleProduct;
  const Size = req.body.Size;
  const Quantity = req.body.Quantity;
  try {
    //Buscar el carro asociado al usuario
    const cart = await guestShoppingCart.findOne({ sessionID: sessionID });
    if (!cart)
      return res
        .status(400)
        .send({ msj: "El carro no existe", status: "error" });

    //Buscar el producto en el carro
    const ItemIndex = cart.items.findIndex(
      (item) => item.TitleProduct === TitleProduct && item.Size === Size
    );
    if (ItemIndex == -1)
      return res
        .status(400)
        .send({ msj: "El producto no existe en el carro", status: "error" });

    //Item actual
    const currenItem = cart.items[ItemIndex];

    if (Quantity <= currenItem.Quantity) {
      currenItem.Quantity -= Quantity;
      if (currenItem.Quantity === 0) {
        cart.items.splice(ItemIndex, 1);
      }
    } else {
      return res
        .status(400)
        .send({
          msj: "La cantidad a eliminar es mayor a la que este en el carro",
          status: "error",
        });
    }

    //Calcular total actualizado
    if (cart.items.length > 0) {
      cart.total = calculateTotal(cart.items);
    } else {
      cart.total = 0;
    }
    //Guardar el carro actualizado
    await cart.save();
    res
      .status(200)
      .send({
        msj: "Producto eliminado del carrito con exito",
        status: "success",
      });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ msj: "Error al eliminar el producto", status: "error" });
  }
}

//OBTENER EL CONTENIDO DEL CARRO
async function getCart(req, res) {
  const sessionID = req.sessionID; //0|| req.sessionID;
  try {
    const cart = await guestShoppingCart.findOne({ sessionID: sessionID });
    if (!cart) return res.status(400).send({ msj: "Carrito no encontrado", status: "error" });
    //revisar stock
    res.status(200).send({ data: cart, status: "success" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msj: "Error al obtener el carro", status: "error" });
  }
}

//VACIAR EL CARRITO
async function emptyCart(req, res) {
  const sessionID = req.sessionID;
  try {
    const cart = await guestShoppingCart.findOne({ sessionID: sessionID });
    if (!cart) return res.status(400).send({ msj: "Carrito no encontrado", status: "error" });
    cart.items = [];
    cart.total = 0;
    await cart.save();
    res.status(200).send({ msj: "Carrito vaciado", status: "success" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msj: "Error al vaciar el carro", status: "error" });
  }
}

async function emptyAll(req, res) {
  try {
    const carts = await guestShoppingCart.find(); // Obtener todos los carritos
    if (carts.length === 0) {
      return res
        .status(400)
        .send({ msj: "No se encontraron carritos", status: "error" });
    }

    for (let i = 0; i < carts.length; i++) {
      const cart = carts[i];
      cart.items = [];
      cart.total = 0;
      await cart.save();
    }

    return res
      .status(200)
      .send({ msj: "Todos los carritos han sido vaciados", status: "success" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ msj: "Error al vaciar los carritos", status: "error" });
  }
}
// Tarea programada para vaciar el carrito cada 24 horas
// cron.schedule("25 20 * * *", async () => {
//   emptyAll();
// });

module.exports = {
  createEmpty_shoppingCart,
  addtoCart,
  removeFromCart,
  getCart,
  emptyCart,
  emptyAll
};
