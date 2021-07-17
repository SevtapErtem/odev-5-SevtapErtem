import React, { useState } from "react";

//import { Redirect } from "react-router-dom";
import { Icon } from "../component/icon";

const Login = ({ setisLoggedIn }) => {
  const [loginFormUsername, setLoginFormUsername] = useState("");
  const [loginFormPassword, setLoginFormPassword] = useState("");

  const handleSubmitLoginForm = () => {
    fetch("userData.json")
      .then((response) => {
        return response.json();
      })
      .then((users) => {
        let findUser = users.find(
          (user) =>
            user.username === loginFormUsername &&
            user.password === loginFormPassword
        );
        if (findUser !== undefined) {
          localStorage.setItem("isLoggedIn", true);
          setisLoggedIn(findUser);
          localStorage.setItem("userInfo", JSON.stringify(findUser));
        } else {
          alert("Kullanıcı bulunamadı.");
        }
      })
      .catch((err) => console.log(err));
  };

  //const [userList, setUserList] = useState([]);

  //useEffect(() => {
  //  fetch("userData.json")
  //   .then((response) => response.json())
  //   .then((data) => setUserList(data));
  //}, []);

  //const handleChangeLoginFormInput = (e) => {
  //setLoginFormInput({
  //  ...loginFormInput,
  // [e.target.name]: e.target.value,
  // });
  //};

  //const handleSubmitLoginForm = (e) => {
  // const currentUser = { ...loginFormInput };
  // let userData = [...userList];

  //const isUserMatched = userData.some(
  // (user) =>
  //  user.username === currentUser.username &&
  //  user.password === currentUser.password
  //);

  //if (isUserMatched) {
  // setIsLoggedIn(true);
  // localStorage.setItem("isLoggedIn", JSON.stringfy(true));
  // localStorage.setItem(
  //  "user",
  //JSON.stringfy(
  // userList.find((user) => user.username === currentUser.username)
  // )
  //);
  // } else {
  //  alert("Kullanıcı bulunamadı.");
  //}
  // };

  return (
    <div className="login-wrapper">
      <form className="login-form">
        <div className="login-icon-wrapper">
          <Icon size={50} iconName="twitter" color="#1DA1F2" />
        </div>
        <div>
          <input
            className="user-name-input"
            type="text"
            placeholder="username"
            value={loginFormUsername}
            onChange={(e) => setLoginFormUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            className="password-input"
            type="password"
            placeholder="password"
            value={loginFormPassword}
            onChange={(e) => setLoginFormPassword(e.target.value)}
          />
        </div>
        <button
          className="login-submit-button"
          type="button"
          onClick={handleSubmitLoginForm}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
