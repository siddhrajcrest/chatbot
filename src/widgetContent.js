import React, { useEffect, useRef, useState } from "react";
import { Heading } from "./heading";
import { SendMessage } from "./sendMessage";
import { Content } from "./content";
import { Footer } from "./footer";
import { GET_UNIQUE_ID_DETAILS } from "./graphql/query";
import { Spin } from "antd";
import { useQuery } from "@apollo/client/react";
export const WidgetContent = (props) => {
  console.log(props.id);
  const [message, setMessage] = useState("");
  const messenger = useRef(null);
  const [messageList, setMessageList] = useState([]);
  const [actionStarted, setactionStarted] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [PhoneValue, setPhoneValue] = useState("");
  const [phoneForm, setphoneForm] = useState(false);
  const [Download, setDownload] = useState(false);
  const [userAgentDetails, setUserAgentDetails] = useState({
    ipAddress: "",
    browserAgent: "",
    timeZone: "",
  });
  const [flow, setflow] = useState(null);
  const [widgetData, setwidgetData] = useState();
  // window.location.href
  const fnBrowserDetect = () => {
    let userAgent = navigator.userAgent;
    let browserName;

    if (userAgent.match(/chrome|chromium|crios/i)) {
      browserName = "chrome";
    } else if (userAgent.match(/firefox|fxios/i)) {
      browserName = "firefox";
    } else if (userAgent.match(/safari/i)) {
      browserName = "safari";
    } else if (userAgent.match(/opr\//i)) {
      browserName = "opera";
    } else if (userAgent.match(/edg/i)) {
      browserName = "edge";
    } else {
      browserName = "No browser detection";
    }

    return browserName;
  };

  useEffect(() => {
    fetch("http://ip-api.com/json").then((res) => {
      res.text().then((data) => {
        console.log(JSON.parse(data));
      });
    });
    console.log(fnBrowserDetect());
  }, []);
  const { data, loading, error } = useQuery(GET_UNIQUE_ID_DETAILS, {
    fetchPolicy: "network-only",
    variables: {
      widgetUid: props?.id?.replace(/\s+/g, " ")?.trim(),
    },
    onCompleted: (res) => {
      if (res?.getWebChatWidget) {
        setwidgetData({ ...res?.getWebChatWidget });
        if (
          (res?.getWebChatWidget?.isPhoneRequired &&
            res?.getWebChatWidget?.switchToSmsInd) ||
          (res?.getWebChatWidget?.isPhoneRequired &&
            !res?.getWebChatWidget?.switchToSmsInd)
        ) {
          setflow("1");
        } else if (
          !res?.getWebChatWidget?.isPhoneRequired &&
          res?.getWebChatWidget?.switchToSmsInd
        ) {
          setflow("3");
        } else if (
          !res?.getWebChatWidget?.isPhoneRequired &&
          !res?.getWebChatWidget?.switchToSmsInd
        ) {
          setflow("2");
        }
        if (!res?.getWebChatWidget?.presetQuestionInd) {
          setactionStarted(true);
        }
      } else if (res.getWebChatWidget === null) {
        const element = document.getElementById("business-id");
        const div = document.getElementById("chatbot-widget");
        element.remove();
        div.remove();
      }
    },
  });
  useEffect(() => {
    if (error) {
      const element = document.getElementById("business-id");
      const div = document.getElementById("chatbot-widget");
      element.remove();
      div.remove();
    }
  }, [error]);
  const DownloadMessages = () => {
    if (phoneNumber === "") {
      setphoneForm(true);
      setDownload(true);
    }
  };
  return (
    !loading && (
      <div className="mainContainer">
        <Spin className="Spinner" tip="Gathering Details..." spinning={loading}>
          <Heading
            actionStarted={actionStarted}
            setactionStarted={setactionStarted}
            setMessageList={setMessageList}
            setPhoneNumber={setPhoneNumber}
            DownloadMessages={DownloadMessages}
            setPhoneValue={setPhoneValue}
            data={widgetData}
            showarrow={data?.getWebChatWidget?.presetQuestionInd}
          />
          <Content
            messageList={messageList}
            actionStarted={actionStarted}
            setactionStarted={setactionStarted}
            setMessageList={setMessageList}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            flow={flow}
            messenger={messenger}
            phoneForm={phoneForm}
            setphoneForm={setphoneForm}
            data={widgetData}
            Download={Download}
            apiData={data?.getUniqueIdDetails}
            showInitialText={!data?.getWebChatWidget?.presetQuestionInd}
          />
          {flow === "1" &&
            ((actionStarted && phoneNumber !== "") || !actionStarted) && (
              <SendMessage
                message={message}
                setMessage={setMessage}
                messageList={messageList}
                setMessageList={setMessageList}
                setactionStarted={setactionStarted}
                actionStarted={actionStarted}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                PhoneValue={PhoneValue}
                setPhoneValue={setPhoneValue}
                data={widgetData}
                flow={flow}
                messenger={messenger}
              />
            )}
          {flow !== "1" && (
            <SendMessage
              message={message}
              setMessage={setMessage}
              messageList={messageList}
              setMessageList={setMessageList}
              setactionStarted={setactionStarted}
              actionStarted={actionStarted}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              PhoneValue={PhoneValue}
              setPhoneValue={setPhoneValue}
              flow={flow}
              setphoneForm={setphoneForm}
              data={widgetData}
              phoneForm={phoneForm}
              messenger={messenger}
            />
          )}
          <Footer DownloadMessages={DownloadMessages} />
          <style jsx>
            {`
              .mainContainer ::-webkit-scrollbar {
                width: 10px;
              }

              /* Track */
              .mainContainer ::-webkit-scrollbar-track {
                box-shadow: inset 0 0 5px grey;
                border-radius: 10px;
              }

              /* Handle */
              .mainContainer ::-webkit-scrollbar-thumb {
                background: #8e0b618f;
                border-radius: 10px;
              }

              /* Handle on hover */
              .mainContainer ::-webkit-scrollbar-thumb:hover {
                background: #b30000;
              }
            `}
          </style>
        </Spin>
      </div>
    )
  );
};
