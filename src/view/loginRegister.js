import React, { useEffect, useState, lazy, Suspense, Fragment } from "react";
import { useHistory } from "react-router-dom";

import Loading from "../components/loading";
import { registerUser, checkUserEmailRegister, loginUser } from "../utils/indexDb";

import "./loginRegister.scss";

const Input = lazy(() => import("../components/input"));
const Button = lazy(() => import("../components/button"));

const LoginRegisterPage = () => {
  const history = useHistory();
  const [type, setType] = useState("login");
  const [loginData, setLoginData] = useState({
    email: "andrew@gmail.com",
    password: "password123",
  });
  const [registerData, setRegisterData] = useState({
    email: "andrew@gmail.com",
    password: "password123",
    confirmPassword: "password123",
  });

  function renderContent() {
    if (type === "login") {
      return (
        <div className="login-content-wrapper">
          <div className="margin-bottom-40">
            <Input
              label="Input Email"
              placeholder="Email"
              type="email"
              value={loginData.email}
              error={inputValidation("email", loginData.email)}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            />
            <Input
              label="Input Password"
              placeholder="Password"
              type="password"
              value={loginData.password}
              error={inputValidation("password", loginData.password)}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
          </div>
          <div className="w--70 margin-auto">
            <Button
              onClick={clickLogin}
              disabled={
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(loginData.email) === false ||
                loginData.password.length < 8
              }>
              Login
            </Button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="login-content-wrapper">
          <div className="margin-bottom-40">
            <Input
              label="Input Email"
              placeholder="Email"
              type="email"
              value={registerData.email}
              error={inputValidation("email", registerData.email)}
              onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
            />
            <Input
              label="Input Password"
              placeholder="Password"
              type="password"
              value={registerData.password}
              error={inputValidation("password", registerData.password)}
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
            />
            <Input
              label="Confirm Password"
              placeholder="Confirm Password"
              type="password"
              value={registerData.confirmPassword}
              error={inputValidation("confirmPassword", registerData.confirmPassword)}
              onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
            />
          </div>
          <div className="w--70 margin-auto">
            <Button
              onClick={clickRegister}
              disabled={
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(registerData.email) === false ||
                registerData.password.length < 8 ||
                registerData.password !== registerData.confirmPassword
              }>
              Register
            </Button>
          </div>
        </div>
      );
    }
  }

  function inputValidation(type, value) {
    if (type === "email" && value && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) === false) {
      return "Invalid Email Format";
    } else if (type === "password" && value && value.length < 8) {
      return "Password Should be 8 Characters Long";
    } else if (type === "confirmPassword" && registerData.confirmPassword !== registerData.password) {
      return "Password Not Same";
    } else {
      return false;
    }
  }

  async function clickRegister() {
    const check = await checkUserEmailRegister(registerData.email);
    if (!check) {
      const token = await registerUser(registerData);
      localStorage.setItem("token", token);
      history.push("/");
    } else {
      alert("Email Already Used");
    }
  }

  async function clickLogin() {
    const token = await loginUser(loginData);
    if (token) {
      localStorage.setItem("token", token);
      history.push("/");
    } else {
      alert("Wrong Email or Password");
    }
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className="login-container">
        <div className="login-wrapper">
          <div className="login-header">
            <button
              className={`login-button ${type === "login" ? "login-button-active" : ""}`}
              onClick={() => setType("login")}>
              Login
            </button>
            <button
              className={`login-button ${type === "register" ? "login-button-active" : ""}`}
              onClick={() => setType("register")}>
              Register
            </button>
          </div>
          {renderContent()}
        </div>
      </div>
    </Suspense>
  );
};

export default LoginRegisterPage;
