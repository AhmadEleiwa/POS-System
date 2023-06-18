import React, { FC, PropsWithChildren } from "react";

/**
 * ## Guard
 * Guard is a wrapping component that check whatever the user authorization is valid orv not.
 * If not the gaurd will nivigate the user to the authentication page.
 * if the user authorized will render the children components
 */
const Guard: FC<PropsWithChildren> = ({ children }) => {
    // some logic to handle the validation
  return <>{children}</>;
};

export default Guard;
