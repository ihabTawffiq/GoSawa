import React from "react";
import { Route, Redirect } from "react-router-dom";
export default function ComponentGuard({
    component: Component,
    authRules,
    redirectPath,
    ...rest
}) {
    return (
        <Route
            {...rest}
            render={props => {
                if (authRules) {
                    return <Component {...props}></Component>;
                } else {
                    return <Redirect to={redirectPath}></Redirect>;
                }
            }}
        >

        </Route>
    );
}