import classes from "./MainItem.module.css";

const MainItem = (props) => {
  const item = props.item;

  if (item.imgSrc == null) {
    item.imgSrc = `${process.env.PUBLIC_URL}/assets/no-img.png`;
  }

  return (
    <li className={classes["main-item"]}>
      <div className={classes["item-img"]}>
        <img src={item.imgSrc} alt={item.name} />
      </div>
      <strong className={classes["item-name"]}>{item.prdName}</strong>
      {/* <p>{item.desc}</p> */}
      <span className={classes["item-price"]}>{item.price}</span>
    </li>
  );
};

export default MainItem;
