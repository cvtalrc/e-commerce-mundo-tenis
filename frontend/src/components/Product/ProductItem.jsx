import { Button } from "@mui/material"

const ProductItem = ({ data, addToCart }) => {
    let {_id, title, imgUrl, price, stock} = data
    return ( 
    <>
        <div> 
        <img src={imgUrl}></img> 
        <h4>{title}</h4>
        <h5>${price}</h5>
        <h5>{_id}</h5>
        </div>
    </>
    )
}

export default ProductItem