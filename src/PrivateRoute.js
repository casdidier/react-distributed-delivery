import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthConsumer } from "./context/auth";

function PrivateRoute({ component: Component, ...rest }) {

  return (
    <AuthConsumer>
			{({ isAuth }) => (
				<Route
				{...rest}
				render={props =>
						isAuth ? (
						<Component {...props} />
						) : (
						<Redirect to="/login" />
						)
				}
				/>
    )}
    </AuthConsumer>
  );
}

export default PrivateRoute;