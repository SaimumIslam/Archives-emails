import React from "react";

//Email Context Api
export const initialEmails = {
  emails: [],
  setEmails: () => {},
};
export const EmailContextApi = React.createContext(initialEmails);
