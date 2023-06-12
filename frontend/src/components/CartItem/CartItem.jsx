const CartItem = ({ data, delFromCart }) => {
    let { _id, title, price, quantity, imgUrl } = data;
  
    return (
      <div style={{ borderBottom: "thin solid gray" }}>
      <p>HOLA COMO ESTAN</p>
      <img src={imgUrl}></img>
        <h4>{title}</h4>
        <h5>
          ${price}.00 x {quantity} = ${price * quantity}.00
        </h5>
        <button onClick={() => delFromCart(_id)}>Eliminar Uno</button>
        <br />
        <button onClick={() => delFromCart(_id, true)}>Eliminar Todos</button>
        <br />
        <br />
      </div>
    );
  };
  
  export default CartItem;