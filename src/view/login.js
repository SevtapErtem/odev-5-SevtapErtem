import React, { useState, useEffect } from "react";

import { Icon } from "../component/icon";

const Login = ({ isLoggedIn, setIsLoggedIn }) => {
  const [loginFormInput, setLoginFormInput] = useState("");

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    fetch("userData.json")
      .then((response) => response.json())
      .then((data) => setUserList(data));
  }, []);

  const handleChangeLoginFormInput = (e) => {
    setLoginFormInput({
      ...loginFormInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitLoginForm = (e) => {
    const currentUser = { ...loginFormInput };
    let userData = [...userList];

    const isUserMatched = userData.some(
      (user) =>
        user.username === currentUser.username &&
        user.password === currentUser.password
    );

    if (isUserMatched) {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", JSON.stringfy(true));
      localStorage.setItem(
        "user",
        JSON.stringfy(
          userList.find((user) => user.username === currentUser.username)
        )
      );
    } else {
      alert("Kullanıcı bulunamadı.");
    }
  };

  return (
    <div className="login-wrapper">
      <form className="login-form" action="">
        <div className="login-icon-wrapper">
          <Icon size={50} iconName="twitter" color="#1DA1F2" />
        </div>
        <div>
          <input
            className="user-name-input"
            type="text"
            placeholder="username"
            value={loginFormInput.username}
            onChange={handleChangeLoginFormInput}
          />
        </div>
        <div>
          <input
            className="password-input"
            type="password"
            placeholder="password"
            value={loginFormInput.password}
            onChange={handleChangeLoginFormInput}
          />
        </div>
        <button
          className="login-submit-button"
          onSubmit={handleSubmitLoginForm}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
