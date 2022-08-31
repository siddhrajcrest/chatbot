import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import "antd/dist/antd.css";
import App from "./App";
const widget = document.createElement("div");
widget.id = "chatbot-widget";
widget.style.position = "relative";
widget.style.right = "0px";
widget.style.bottom = "0px";
document.body.appendChild(widget);


const getId=document.getElementById("business-id");

const client = new ApolloClient({
  uri: 'http://localhost:5000/chat_api',
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('chatbot-widget'));
root.render(
  <ApolloProvider client={client} >
  <React.StrictMode>
    <App id={getId.textContent} />
  </React.StrictMode>
  </ApolloProvider>
);