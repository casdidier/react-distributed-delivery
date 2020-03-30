import React from "react";

import { AuthConsumer } from "../context/auth";
import Login from './Login';

function LoginContainer() {

    return (
    <AuthConsumer>
        {({ isAuth, login }) => (
            <Login login={login} isAuth={isAuth}></Login>
        )}
    </AuthConsumer>
    );
}

export default LoginContainer;