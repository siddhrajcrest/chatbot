import React, { useEffect } from "react";
import { Form, Input } from "antd";
import { RightOutlined } from "@ant-design/icons";
import PhoneForm from "./phoneForm";
export const Content = (props) => {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  console.log(props.fnBrowserDetect);
  let render = true;
  const questions = [
    {
      message: "I want to Sell my Car 🏎️ ",
    },
    {
      message: "I want to buy a Sedan Car 🚙 ",
    },
    {
      message: "I want to trade my old car and buy a Luxury car 🏎️",
    },
  ];
  console.log(props?.data);
  const handlePreDefinedMessages = (item) => {
    var now = new Date();
    props.setMessageList((prev) => [
      ...prev,
      {
        message: item.message,
        time: `${
          now.getMonth() + 1
        }/${now.getDate()}/${now.getFullYear()}, ${now.getHours()}:${now.getMinutes()}`,
      },
    ]);
    // props.setMessage('');
    const elem = document.getElementById("message");
    elem.scrollTop = elem.scrollHeight;
    props.setactionStarted(true);
  };
  useEffect(() => {
    console.log("Called");
    if (props.showInitialText && render) {
      handlePreDefinedMessages({ message: props?.data?.initialText });
      render = false;
    }
  }, []);
  return (
    <div
      className={
        props.actionStarted && props.phoneNumber === "" && props.flow === "1"
          ? "message-div-65"
          : "message-div"
      }
      id="message"
    >
      {props.actionStarted ? (
        props &&
        props.messageList &&
        props.messageList.length > 0 &&
        props.messageList.map((item, i) => (
          <div key={i}>
            <p className={i % 2 === 0 ? "message-recieved" : "message-sent"}>
              {item.message}
            </p>
            <p className={i % 2 === 0 ? "time-recieved" : "time-sent"}>
              {i % 2 === 0 ? " messaged on" : " messaged on"} {item.time}
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
                  handlePreDefinedMessages({
                    message: item.question,
                  })
                }
                className="predefined-questions-child"
              >
                <p> {item.question}</p>{" "}
                <RightOutlined style={{ marginTop: "10px" }} />
              </div>
            ))}
        </div>
      )}
      {props.actionStarted &&
        props.phoneNumber === "" &&
        props.flow === "1" && (
          <PhoneForm
            handlePreDefinedMessages={handlePreDefinedMessages}
            setPhoneNumber={props.setPhoneNumber}
            showMessage={true}
            flow={props.flow}
            name={props.name}
            apiData={props.apiData}
            data={props.data}
          />
        )}
      {props.actionStarted && props.phoneForm && (
        <PhoneForm
          handlePreDefinedMessages={handlePreDefinedMessages}
          setPhoneNumber={props.setPhoneNumber}
          showMessage={false}
          flow={props.flow}
          name={props.name}
          apiData={props.apiData}
          data={props.data}
        />
      )}
    </div>
  );
};
