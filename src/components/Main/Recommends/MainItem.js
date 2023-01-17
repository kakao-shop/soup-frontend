const MainItem = (props) => {
  return (
    <li>
      <div>
        <img src={props.img} />
        <strong>{props.name}</strong>
        <p>{props.desc}</p>
        <span>{props.price}</span>
      </div>
    </li>
  );
};

export default MainItem;
