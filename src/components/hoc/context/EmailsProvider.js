import React from "react";
import { initialEmails, EmailContextApi } from "../../../action/ContextApi";

const EmailsProvider = (props) => {
  const setEmails = (emails) => {
    setState((prev) => ({
      ...prev,
      emails: emails,
    }));
  };

  const [state, setState] = React.useState({
    ...initialEmails,
    setEmails: setEmails,
  });

  return (
    <EmailContextApi.Provider value={state}>
      {props.children}
    </EmailContextApi.Provider>
  );
};
export default React.memo(EmailsProvider);
