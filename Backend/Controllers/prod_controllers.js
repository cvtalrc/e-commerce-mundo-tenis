const Product = require("../Models/Product");

function add(req, res) {
  const { title, brand, price, description, stock, sport, category, imgUrl, sale, percentageSale } = req.body;

  const product = new Product({
    title,
    brand,
    price,
    description,
    stock,
    sport,
    category,
    imgUrl,
    sale,
    percentageSale
  });

  product.save((error, prodStorage) => {
    if (error) {
      return res.status(400).send({ msj: "Error al crear el producto, intentar nuevamente" });
    } else {
      res.status(200).send(prodStorage);
    }
  });
}

function update(req, res) {
  const {_id, titleC, brandC, priceC, descriptionC, stockC, sportC, categoryC, imgUrlC, saleC, percentageSaleC } = req.body;

  Product.findByIdAndUpdate(_id, {
    title: titleC, 
    brand: brandC, 
    price: priceC, 
    description: descriptionC, 
    stock : stockC,
    sport: sportC, 
    category: categoryC, 
    imgUrl: imgUrlC,
    sale: saleC,
    percentageSale: percentageSaleC
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
      return res.status(400).send({ msj: "No existen productos" });
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


function remove(req, res) {
  const { id } = req.params;
  Product.deleteOne({ _id: id }, (error) => {
    if (error) {
      return res.status(400).send({ msj: "Error al remove el producto" });
    } else {
      res.status(200).send({ msj: "Producto eliminado exitosamente" });
    }
  });
}

module.exports = {
  add,
  update,
  removeAll,
  getAll,
  getId,
  remove,
};
