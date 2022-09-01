import React, { useState } from "react";
import { SendOutlined, MessageTwoTone } from "@ant-design/icons";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Input, Button, message } from "antd";
export const SendMessage = (props) => {
  const sendMessage = (value) => {
    if (value !== "") {
      var now = new Date();
      props.setMessageList([
        ...props.messageList,
        {
          message: value,
          time: `${
            now.getMonth() + 1
          }/${now.getDate()}/${now.getFullYear()}, ${now.getHours()}:${now.getMinutes()}`,
        },
      ]);
      props.setMessage("");
      const elem = document.getElementById("message");
      elem.scrollTop = elem.scrollHeight;
      props.setactionStarted(true);
    } else {
      message.error("Please enter a message");
    }
  };
  const validPhone = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

  const sendPhoneNumber = () => {
    props.setPhoneNumber(props.PhoneValue);
    sendMessage(props.PhoneValue);
  };
  console.log("flow", props.flow);
  return (
    <div
      className={
        props.actionStarted && props.flow === "3"
          ? "input-with-sms-container"
          : "input-container"
      }
    >
      {props.actionStarted && props.flow === "3" && props.phoneNumber !== "" ? (
        <div style={{ padding: "0px 10px" }}>
          <p style={{ fontWeight: "bold" }}>
            You can continue to chat from your{" "}
            <span
              style={{ color: "rgb(142, 11, 97)", cursor: "pointer" }}
              onClick={() => window.open(`sms: +1-234567-89012`)}
            >
              {" "}
              SMS App
            </span>{" "}
            to this number{" "}
            <span
              style={{ color: "rgb(142, 11, 97)", cursor: "pointer" }}
              onClick={() => window.open(`sms: +1-234567-89012`)}
            >
              +1-234567-89012
            </span>
          </p>
        </div>
      ) : (
        <>
          <p style={{ fontWeight: "bold" }}>
            {props.actionStarted
              ? props.phoneNumber === "" && props.flow === "1"
                ? "Enter you Phone Number"
                : "Enter your message here"
              : "Cannot Find Answer?"}
          </p>
          <div className="input-button-wrapper">
            {" "}
            {props.phoneNumber === "" &&
            props.actionStarted &&
            props.flow === "1" ? (
              <>
                {" "}
                <PhoneInput
                  country={"us"}
                  value={props.PhoneValue}
                  onChange={(phone) => props.setPhoneValue(phone)}
                />
              </>
            ) : (
              <div className="input-switch" style={{ width: "100%" }}>
                <Input
                  style={{ marginBottom: "0.5em" }}
                  value={props.message}
                  onChange={(e) => props.setMessage(e.target.value)}
                  placeholder={
                    props.actionStarted
                      ? "Enter message..."
                      : "Ask your question here..."
                  }
                  onPressEnter={() => {
                    sendMessage(props.message);
                  }}
                />
                {props.actionStarted && props.flow === "3" && (
                  <div style={{ width: "100%", textAlign: "center" }}>
                    <Button
                      onClick={() => {
                        props.setphoneForm((prev) => !prev);
                        props.messenger.current.clientHeight =
                          props.messenger.current.scrollHeight;
                      }}
                      type="primary"
                    >
                      {props.phoneForm
                        ? "Switch to Messenger"
                        : "Switch to SMS"}
                    </Button>
                  </div>
                )}
              </div>
            )}
            <Button
              onClick={() => {
                sendMessage(props.message);
              }}
              disabled={props.message === ""}
              style={{ borderRadius: "15px", marginLeft: "5px" }}
              type="primary"
            >
              {" "}
              <SendOutlined />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
