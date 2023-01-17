const ThemeList = (props) => {
  // const ThemeItems = props.ThemeItems.map((theme) => <li>{theme.title}</li>);
  const ThemeItems = [
    { id: "1", title: "테마1" },
    { id: "2", title: "테마2" },
  ].map((theme) => (
    <li theme={theme} key={theme.id}>
      {theme.title}
    </li>
  ));

  return <ul>{ThemeItems}</ul>;
};

export default ThemeList;
