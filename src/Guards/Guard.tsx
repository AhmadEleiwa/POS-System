import React, { FC, PropsWithChildren } from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

/**
 * ## Guard
 * Guard is a wrapping component that check whatever the user authorization is valid orv not.
 * If not the gaurd will nivigate the user to the authentication page.
 * if the user authorized will render the children components
 */
const Guard: FC<PropsWithChildren> = ({ children }) => {
  // some logic to handle the validation
  const [cookies] = useCookies();
  const auth = cookies.auth;
  if (!auth) {
    return <Navigate to={'/auth'} />
  }
  return <>{children}</>;
};

export default Guard;
