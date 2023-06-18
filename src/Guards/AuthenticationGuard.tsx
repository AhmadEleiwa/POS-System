import React, { FC, PropsWithChildren } from "react";

/**
 * ## Guard
 * Guard is a wrapping component that check whatever the user is already authenticate or not.
 * if the user authorized will render the children components
 */
const AuthenticationGuard: FC<PropsWithChildren> = ({ children }) => {
    // some logic to handle the validation
  return <>{children}</>;
};

export default AuthenticationGuard;
