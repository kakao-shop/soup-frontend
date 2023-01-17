import MainItem from "./MainItem";

const MainItems = (props) => {
  const items = [
    {
      id: 1,
      img: "./no-img.png",
      name: "호두과자",
      desc: "천안 명물",
      price: "3000",
    },
    {
      id: 2,
      img: "./no-img.png",
      name: "돌게장",
      desc: "여수 명물",
      price: "50000",
    },
  ];

  return (
    <ul>
      {items.map((item) => (
        <MainItem item={item} key={item.id} />
      ))}
    </ul>
  );
};

export default MainItems;
