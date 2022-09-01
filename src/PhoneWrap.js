import React from "react";
import PhoneForm from "./phoneForm";

export const PhoneWrap = (props) => (
  <PhoneForm
    handlePreDefinedMessages={props.handlePreDefinedMessages}
    setPhoneNumber={props.props?.setPhoneNumber}
    showMessage={true}
    flow={props.props?.flow}
    name={props.props?.name}
    apiData={props.props?.apiData}
    download={props.props?.Download}
    messenger={props.messenger}
    data={props.props?.data}
  />
);
