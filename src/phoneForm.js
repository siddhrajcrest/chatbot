import React from "react";
import { Form, Input, Button } from "antd";
import PhoneInput from "react-phone-input-2";
import { useMutation } from "@apollo/client/react";
import { SAVE_PHONE } from "./graphql/mutation";
const PhoneForm = (props) => {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [savePhone, { data, loading }] = useMutation(SAVE_PHONE);
  const validPhone = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
  return (
    <div className={props.flow === "3" ? "form-group-phone" : "form-group"}>
      <Form
        form={form}
        onFinish={(values) => {
          props.handlePreDefinedMessages({
            message: `${values.phoneNumber} ${values.name} ${
              values.message ? values.message : ""
            }`,
          });
          props.setPhoneNumber(values.phoneNumber);
          savePhone({
            variables: {
              companyId: props?.apiData?.companyId,
              locationId: props?.apiData?.locationId,
              phone: values.phoneNumber,
            },
          }).then((res) => {
            if (res.data.savePhone.statusCode === 200) {
            }
          });
        }}
      >
        {" "}
        <p style={{fontSize:'13px',color:'#5b5b5b'}} >
          {props.download
            ? "Please enter your details and we will send the link to download your messages"
            : "Please enter your basic details"}
        </p>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input name="name" placeholder="Name"></Input>
        </Form.Item>{" "}
        <Form.Item
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: "Please enter a valid phone number",
            },
          ]}
        >
          {/* <Input name="phoneNumber" placeholder="Phone Number"></Input> */}
          <div className="form-phone-input">
            {" "}
            <PhoneInput country={"us"} placeholder="Enter phone number" />
          </div>
        </Form.Item>{" "}
        {props.showMessage && (
          <Form.Item
            name="message"
            rules={[{ required: true, message: "Please enter a message" }]}
          >
            <TextArea name="message" placeholder="Message"></TextArea>
          </Form.Item>
        )}
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form>
      <p style={{ fontSize: "9px", marginBottom: "20px" }}>
        By submitting. you authorize {props.data.location.company.name} :{" "}
        {props.data.location.title} to send text messages with offers & other
        information. possibly using automated technology, to the number you
        provided. Message/data rates apply. Consent is not a condition of
        purchase.
      </p>
    </div>
  );
};

export default PhoneForm;
