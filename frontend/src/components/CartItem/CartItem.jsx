const CartItem = ({ data, delFromCart }) => {
    let { _id, TitleProduct, price, quantity, Size } = data;
  
    return (
      <div style={{ borderBottom: "thin solid gray" }}>
      <p>HOLA COMO ESTAN</p>
        <h4>{TitleProduct}</h4>
        <h5>
          ${price}.00 x {quantity} = ${price * quantity}.00
        </h5>
        <h6>Talla {Size}</h6>
        <button onClick={() => delFromCart(_id)}>Eliminar Uno</button>
        <br />
        <button onClick={() => delFromCart(_id, true)}>Eliminar Todos</button>
        <br />
        <br />
      </div>
    );
  };
  
  export default CartItem;