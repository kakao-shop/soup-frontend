const Banner = (props) => {
  const BannerList = [
    { id: 1, path: "/Banner/다이어트.png", title: "다이어트 테마" },
    // { id: 2, path: "/Banner/밀키트.png" },
    // { id: 3, path: "/Banner/빵.png" },
    // { id: 4, path: "/Banner/음료.png" },
    // { id: 5, path: "/Banner/카페.png" },
  ].map((banner) => (
    <img
      src={`${process.env.PUBLIC_URL}/assets` + banner.path}
      alt={banner.title}
      key={banner.id}
      style={{ width: "100%" }}
    />
  ));

  return <div>{BannerList}</div>;
};

export default Banner;
