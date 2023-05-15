const Product = require("../Models/Product");

function add(req, res) {
  const { title, brand, price, description, sport, category, imgUrl } = req.body;
  const Product = new Product({
    title,
    brand,
    price,
    description,
    sport,
    category,
    imgUrl
  });

  Product.save((error, prodStorage) => {
    if (error) {
      return res.status(400).send({ msj: "Error al crear el usuario, intentar nuevamente" });
    } else {
      res.status(200).send(prodStorage);
    }
  });
}


function remove(req, res) {
  const { id } = req.body;
  Product.deleteOne({ _id: id }, (error) => {
    if (error) {
      return res.status(400).send({ msj: "Error al remove el producto" });
    } else {
      res.status(200).send({ msj: "Producto eliminado exitosamente" });
    }
  });
}

function get(req, res) {
  Product.find({}, (error, Products) => {
    if (error) {
      return res.status(400).send({ msj: "No se pudo encontrar el producto" });
    } else {
      res.status(200).send(Products);
    }
  });
}


module.exports = {
  add,
  remove,
  get,
};
