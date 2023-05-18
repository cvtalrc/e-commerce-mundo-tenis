const Product = require("../Models/Product");

function add(req, res) {
  const { title, brand, price, description, size, quantity, sport, category, imgUrl } = req.body;
  const stock = new Map();
  stock.set(size, quantity);

  const product = new Product({
    title,
    brand,
    price,
    description,
    stock,
    sport,
    category,
    imgUrl
  });

  product.save((error, prodStorage) => {
    if (error) {
      return res.status(400).send({ msj: "Error al crear el usuario, intentar nuevamente" });
    } else {
      res.status(200).send(prodStorage);
    }
  });
}

async function modificate(req, res) {
  const {id, titleC, brandC, priceC, descriptionC, sizeC, quantityC, sportC, categoryC, imgUrlC } = req.body;
  stockProduct = await Product.findById(id).select('stock');
  stockC = stockProduct.stock;
  stockC.set(sizeC,quantityC);
  console.log(stockC);

  Product.findByIdAndUpdate(id, {
    title: titleC, 
    brand: brandC, 
    price: priceC, 
    description: descriptionC, 
    stock : stockC,
    sport: sportC, 
    category: categoryC, 
    imgUrl: imgUrlC
    }, function (err, product) {
    if (err){
      return res.status(400).send(err)
    }
    else{
      res.status(200).send("Producto actualizado");
    }
  });
}


function removeAll(req, res) {
  Product.deleteMany({}, (error) => {
    if (error) {
      return res.status(400).send({ msj: "Error al remove el producto" });
    } else {
      res.status(200).send({ msj: "Se eliminaron todos los productos" });
    }
  });
}

function getAll(req, res) {
  Product.find({}, (error, products) => {
    if (error) {
      return res.status(400).send({ msj: "No se pudo encontrar el producto" });
    } else {
      res.status(200).send(products);
    }
  });
}

function getId(req, res) {
  const id = req.params.id;
  Product.findById(id, (error, product) => {
    if (error) {
      return res.status(400).send({ msj: "No se pudo encontrar el producto" });
    } else {
      res.status(200).send(product); // El producto encontrado
    }
  });
}

module.exports = {
  add,
  modificate,
  removeAll,
  getAll,
  getId,
};
