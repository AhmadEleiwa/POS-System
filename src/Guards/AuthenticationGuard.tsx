import React, { FC, PropsWithChildren } from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

/**
 * ## Guard
 * Guard is a wrapping component that check whatever the user is already authenticate or not.
 * if the user authorized will render the children components
 */
const AuthenticationGuard: FC<PropsWithChildren> = ({ children }) => {
    // some logic to handle the validation
    const [cookies] = useCookies();
    const auth = cookies.auth;
    if (auth) {
      return <Navigate to={'/'} />
    }
    return <>{children}</>;
};

export default AuthenticationGuard;
