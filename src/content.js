import React, { useEffect, useRef } from "react";
import { RightOutlined } from "@ant-design/icons";
import { PhoneWrap } from "./PhoneWrap";

export const Content = (props) => {
  console.log(props.fnBrowserDetect);
  let render = true;
  const handlePreDefinedMessages = (item, clear = false) => {
    var now = new Date();
    if (!clear) {
      props?.setMessageList((prev) => [
        ...prev,
        {
          message: item?.message,
          time: `${
            now.getMonth() + 1
          }/${now.getDate()}/${now.getFullYear()}, ${now.getHours()}:${now.getMinutes()}`,
        },
      ]);
    } else {
      props?.setMessageList([
        {
          message: item?.message,
          time: `${
            now.getMonth() + 1
          }/${now.getDate()}/${now.getFullYear()}, ${now.getHours()}:${now.getMinutes()}`,
        },
      ]);
    }
    // props.setMessage('');
    // const elem = document.getElementById("message");
    // if (elem) {
    //   if (!clear) elem.scrollTop = elem?.scrollHeight;
    // }
    if (!clear) props.messenger.current.scrollTop = props.messenger.current.scrollHeight;
    props.setactionStarted(true);
  };
  useEffect(() => {
    if (props?.showInitialText && render) {
      handlePreDefinedMessages({ message: props?.data?.initialText });
      render = false;
    }
  }, []);
  console.log(
    props.actionStarted,
    props.phoneForm,
    props.phoneNumber === "",
    props.flow !== "1"
  );
  return (
    <div
      className={
        props?.actionStarted && props?.phoneNumber !== ""
          ? "message-div-small"
          : "message-div"
      }
      ref={props.messenger}
      id="message"
    >
      {props?.actionStarted ? (
        props &&
        props.messageList &&
        props.messageList.length > 0 &&
        props?.messageList?.map((item, i) => (
          <div key={i}>
            <p
              className={
                props?.showInitialText
                  ? i === 0
                    ? "message-recieved"
                    : "message-sent"
                  : "message-sent"
              }
            >
              {item?.message}
            </p>
            <p
              className={
                props?.showInitialText
                  ? i === 0
                    ? "time-recieved"
                    : "time-sent"
                  : "time-sent"
              }
            >
              {" messaged on"} {item?.time}
            </p>
          </div>
        ))
      ) : (
        <div className="predefined-questions">
          Choose from a Question Below:
          {props &&
            props?.data &&
            props?.data?.webChatWidgetQuestion &&
            props?.data?.webChatWidgetQuestion.length > 0 &&
            props?.data?.webChatWidgetQuestion?.map((item, i) => (
              <div
                key={i}
                onClick={() =>
                  handlePreDefinedMessages(
                    {
                      message: item?.question,
                    },
                    props?.messageList?.length === 1
                  )
                }
                className="predefined-questions-child"
              >
                <p> {item?.question}</p>{" "}
                <RightOutlined style={{ marginTop: "10px" }} />
              </div>
            ))}
        </div>
      )}
      {props.actionStarted &&
        props.phoneNumber === "" &&
        props.flow === "1" && (
          <PhoneWrap
            messenger={props.messenger}
            handlePreDefinedMessages={handlePreDefinedMessages}
            props={props}
          ></PhoneWrap>
        )}
      {props.actionStarted &&
        props.phoneForm &&
        props.phoneNumber === "" &&
        props.flow !== "1" && (
          <PhoneWrap
            messenger={props.messenger}
            handlePreDefinedMessages={handlePreDefinedMessages}
            props={props}
          ></PhoneWrap>
        )}
    </div>
  );
};
