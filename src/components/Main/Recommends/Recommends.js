import MainItems from "./MainItems";
import MainItemTitle from "./MainItemTitle";

const Recommends = (props) => {
  return (
    <div>
      <MainItemTitle />
      <MainItems recommendResult={props.recommendResult} />
    </div>
  );
};

export default Recommends;
