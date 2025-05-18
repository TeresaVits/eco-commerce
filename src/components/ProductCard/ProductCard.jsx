import { Col } from "react-bootstrap";
import "./product-card.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../app/features/cart/cartSlice";

const ProductCard = ({ title, productItem }) => {
  const dispatch = useDispatch();
  const router = useNavigate();
  const cartList = useSelector((state) => state.cart.cartList);

  const handelClick = () => {
    router(`/shop/${productItem.id}`);
  };

  const handelAdd = (productItem) => {
    const productInCart = cartList.find((item) => item.id === productItem.id);

    if (productInCart) {
      toast.error("Product is already in the cart!");
    } else {
      dispatch(addToCart({ product: productItem, num: 1 }));
      toast.success("Product has been added to cart!");
    }
  };

  return (
    <Col md={3} sm={5} xs={10} className="product mtop">
      {title === "Big Discount" ? (
        <span className="discount">{productItem.discount}% Off</span>
      ) : null}
      <img
        loading="lazy"
        onClick={() => handelClick()}
        src={productItem.imgUrl}
        alt=""
      />
      <div className="product-details">
        <h3 onClick={() => handelClick()}>{productItem.productName}</h3>
        <div className="price">
          <h4>${productItem.price}</h4>
          <button
            aria-label="Add"
            type="submit"
            className="add"
            onClick={() => handelAdd(productItem)}
          >
            <ion-icon name="add"></ion-icon>
          </button>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
