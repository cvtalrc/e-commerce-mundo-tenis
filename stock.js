//vaciar carrito

for (const item of cart.items) {
    const isProduct = await Product.findOne({ title: item.TitleProduct }); //identifico el producto
    if (isProduct) {
      const stockItem = isProduct.stock.find(stock => stock.size === item.stock.size); //encuentro el stock actual del producto
      if (stockItem) {
        const newQuantity = stockItem.quantity += item.stock.quantity; //
        const index = await isProduct.stock.findIndex(stock => stock.size===item.size);
        await isProduct.updateOne({$set: { [`stock.${index}.quantity`]: newQuantity }});
      }else{
        return res.status(400).send({msj:"Carrito no encontrado", status:"error"});
      }
      await isProduct.save();
    }else{
      return res.status(400).send({msj:"Error al encontrar el producto el inventario", status:"error"});
    }
  }