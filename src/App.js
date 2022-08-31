import React, { useState } from "react";
import { Button, Popover } from "antd";
import { MessageOutlined, CloseOutlined } from "@ant-design/icons";
import { WidgetContent } from "./widgetContent";
import "./style.css";

export default function App(props) {
  const [widgetVisible, setwidgetVisible] = useState(false);
  return (
    <div style={{ height: "100%" }}>
      {/* <div
        style={{
          position: 'fixed',
          bottom: 0,
          marginBottom: '65px',
          right: 0,
          marginRight: '50px',
        }}
      ></div> */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          marginBottom: "30px",
          right: 0,
          marginRight: "50px",
        }}
      >
          <div
            style={{
              display: `${widgetVisible?"block":"none"}`,
              width: "35%",
              marginLeft: "auto",                                                                              
              marginRight: "20px",
              borderRadius: "15px",
              // border: "1px solid",
              borderBottomRightRadius: "0px",
              zIndex: 9999,
              backgroundColor: "white",
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            }}
          >
            <WidgetContent id={props.id} />
          </div>
        <div style={{ width: "100%", textAlign: "right" }}>
          {" "}
          <Button
            size="large"
            type="primary"
            style={{
              borderRadius: "30px",
              borderTopRightRadius: "5px",
            }}
            onClick={() => setwidgetVisible((prev) => !prev)}
          >
            {widgetVisible ? <CloseOutlined /> : <MessageOutlined />}
          </Button>
        </div>
        {/* </Popover> */}
      </div>
    </div>
  );
}
