import { gql } from "@apollo/client";

export const GET_UNIQUE_ID_DETAILS = gql`
  query getWebChatWidget($widgetUid: String!) {
    getWebChatWidget(widgetUid: $widgetUid) {
      id
      widgetUid
      locationId
      initialText
      isPhoneRequired
      switchToSmsInd
      presetQuestionInd
      isActive
      webChatWidgetQuestion {
        id
        question
      }
      location {
        title
        company {
          name
        }
      }
    }
  }
`;
