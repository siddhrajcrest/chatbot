import React from "react";
import {
  MessageTwoTone,
  LeftOutlined,
  CloudDownloadOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";
export const Heading = (props) => {
  return (
    <div className="heading">
      <div style={{ display: "flex" }}>
        {" "}
        {props.actionStarted && props.showarrow && (
          <LeftOutlined
            style={{ marginRight: "7px", marginTop: "11px", cursor: "pointer" }}
            onClick={() => {
              // props.setMessageList([]);
              props.setactionStarted((prev) => !prev);
              // props.setPhoneNumber("");

              // props.setPhoneValue("");
            }}
          />
        )}
        <div className="heading-div">
          {" "}
          <h2>Instant Messenger 👇 </h2>
          <Tooltip title="Download your Messages">
            <CloudDownloadOutlined
              style={{
                marginTop: "10px",
                marginRight: "10px",
                // color: "rgb(142, 11, 97)",
                cursor: "pointer",
                fontSize: "large",
              }}
            />
          </Tooltip>
        </div>
      </div>
      <p>
        <MessageTwoTone /> Start the conversation and{" "}
        {props?.data?.location?.company?.name} : {props?.data?.location?.title}{" "}
        representative will contact you soon
      </p>
    </div>
  );
};
