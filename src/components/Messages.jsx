import React from "react";
import {
  TextResponse,
  OptionResponse,
  VideoResponse,
  ImageResponse,
  FileResponse,
} from "./DisplayResponse";
const UserResponse = ({ message }) => {
  const { msg, time } = message;
  return (
    <div className='d-flex justify-content-end mb-4'>
      <div className='msg_cotainer_send'>
        {msg}
        <span className='msg_time_send'>{time}</span>
      </div>
      <div className='img_cont_msg'>
        <img src='/user.png' className='rounded-circle user_img_msg' />
      </div>
    </div>
  );
};
const Messages = ({
  messageList,
  optionClickRaiser,
  videoPalyRaiser,
  showFileRaiser,
  downloadFileRaiser,
}) => {
  const response = messageList.map((message, inx) => {
    const { msg, type, from } = message;
    if (from === "user") {
      return <UserResponse message={message} key={inx} />;
    } else if (from === "bot") {
      switch (type) {
        case "text":
          return <TextResponse data={msg} />;
        case "option":
          return (
            <OptionResponse data={msg} submitOptions={optionClickRaiser} />
          );
        case "video":
          return <VideoResponse data={msg} clickPlay={videoPalyRaiser} />;
        case "image":
          return <ImageResponse data={msg} />;
        case "file":
          return (
            <FileResponse
              data={msg}
              showFile={showFileRaiser}
              downloadFile={downloadFileRaiser}
            />
          );
        default:
          return <p>No type macthed, beacuse of some error</p>;
      }
    }
    return "";
  });
  return response;
};

export { UserResponse };

export default Messages;
