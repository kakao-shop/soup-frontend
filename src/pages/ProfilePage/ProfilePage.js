import { Fragment, useState } from "react";
import { Route } from "react-router-dom";
import ModifyInfo from "../../components/Profile/ModifyInfo";
import PwCheck from "../../components/Profile/PwCheck";

const ProfilePage = (props) => {
  const [pwCorrect, setPwCorrect] = useState(false);

  const handlePwCheck = (isCorrect) => {
    setPwCorrect(isCorrect);
  };

  return (
    <Fragment>
      {!pwCorrect && <PwCheck onCheckPw={handlePwCheck} />}
      {pwCorrect && <ModifyInfo />}
    </Fragment>
  );
};

export default ProfilePage;
