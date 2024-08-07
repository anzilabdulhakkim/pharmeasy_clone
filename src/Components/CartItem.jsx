import React from "react";
import styles from "./CartItem.module.css";

const CartItem = ({ data, setdata }) => {
  const handleClick = (id) => {
    const cartData = JSON.parse(localStorage.getItem("cartitem")) || [];
    const finalData = cartData.filter((ele) => ele._id !== id);
    localStorage.setItem("cartitem", JSON.stringify(finalData));
    setdata(finalData);
  };

  const updateQty = (id, value) => {
    const cartData = JSON.parse(localStorage.getItem("cartitem")) || [];
    const finalData = cartData.map((ele) => {
      if (ele._id === id) {
        return { ...ele, qty: Math.max(Number(value), 1) }; 
      }
      return ele;
    });
    localStorage.setItem("cartitem", JSON.stringify(finalData));
    setdata(finalData);
  };

  return (
    <div className={styles.cartItemsDisplay}>
      <div className={styles.leftCartSection}>
        <div className={styles.imageWrapper}>
          <img
            src={data?.img1}
            alt="cart item"
            className={styles.cartItemImage}
          />
        </div>
      </div>
      <div className={styles.rightCartSection}>
        <div className={styles.itemTitleWrapper}>
          <h1 className={styles.cartItemsTitle}>{data?.name}</h1>
          <div className={styles.deleteButtonWrapper}>
            <button
              className={styles.deleteButton}
              onClick={() => handleClick(data._id)}
            >
              <img
                src="https://assets.pharmeasy.in/web-assets/dist/2fb50086.svg"
                alt="delete"
                className={styles.deleteImage}
              />
            </button>
          </div>
        </div>
        <div className={styles.producerCompany}>By {data?.storename}</div>
        <div className={styles.itemQuantityWrapper}>
          <p className={styles.itemQuantity}></p>
        </div>
        <div className={styles.priceAndQuantityWrapper}>
          <div className={styles.quantityWrapper}>
            <select
              name="quantity"
              className={styles.selectQuantity}
              value={data?.qty} // Set default value
              onChange={(e) => updateQty(data._id, e.target.value)}
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>Qty {num}</option>
              ))}
            </select>
          </div>
          <div className={styles.priceWrapper}>
            <div className={styles.strikedPriceWrapper}>
              <p className={styles.strikedPrice}>₹{data?.price}*</p>
              <p className={styles.offer}>{data?.offpercentage}%</p>
            </div>
            <div className={styles.actualPrice}>₹{data?.offprice}*</div>
          </div>
        </div>
        <div className={styles.arrivalDate}>
          <span className={styles.span1}>Delivery by</span>
          <span className={styles.span2}>
            &nbsp;Tue 4 Oct, before 10:00 AM
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
