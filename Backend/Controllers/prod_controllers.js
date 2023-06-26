const Product = require("../Models/Product");

async function add(req, res) {
  const {title, brand, price, description, stock, sport, category, imgUrl, sale, percentageSale,} = req.body;

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
    percentageSale,
  });

  await product.save((error, prodStorage) => {
    if (error) {
      return res.status(400).send({ message: "Error al crear el producto, intentar nuevamente", status : "Error" });
    } else {
      res.status(201).send({newProduct: prodStorage, status: "Error"});
    }
  });
}

function update(req, res) {
  const { id } = req.params;
  const {titleC, brandC, priceC, descriptionC, stockC, sportC, categoryC, imgUrlC, saleC, percentageSaleC,} = req.body;

  Product.findByIdAndUpdate(
    id,
    {
      title: titleC,
      brand: brandC,
      price: priceC,
      description: descriptionC,
      stock: stockC,
      sport: sportC,
      category: categoryC,
      imgUrl: imgUrlC,
      sale: saleC,
      percentageSale: percentageSaleC,
    },
    function (err, product) {
      if (err) {
        return res.status(400).send({message: err, status: "error"});
      } else {
        res.status(200).send({message: "Producto modificado con éxito", status: "success"});
      }
    }
  );
}

function removeAll(req, res) {
  Product.deleteMany({}, (error) => {
    if (error) {
      return res.status(400).send({ message: error, status: "error" });
    } else {
      res.status(200).send({ message: "Se eliminaron todos los productos" , status: "success"});
    }
  });
}

function getAll(req, res) {
  Product.find({}, (error, products) => {
    if (error) {
      return res.status(400).send({ message: error, status: "error" });
    } else {
      res.status(200).send({products: products, status: "success"});
    }
  });
}

function getId(req, res) {
  const id = req.params.id;
  Product.findById(id, (error, product) => {
    if (error) {
      return res.status(400).send({ message: "No se pudo encontrar el producto" , status: "error"});
    } else {
      res.status(200).send({product: product, status: "success"}); // El producto encontrado
    }
  });
}

function remove(req, res) {
  const { id } = req.params;
  Product.deleteOne({ _id: id }, (error) => {
    if (error) {
      return res.status(400).send({ message: "Error al remove el producto" , status: "error"});
    } else {
      res.status(200).send({ message: "Producto eliminado exitosamente", status: "success"});
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
