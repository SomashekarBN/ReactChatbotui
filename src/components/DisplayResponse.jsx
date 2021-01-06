import React, { Component } from "react";
import "./DisplayResponse.css";

const textHasHtml = (text) => {
  return /<\/?[a-z][\s\S]*>/i.test(text) ? true : false;
};
const TextResponse = ({ data }) => {
  const { text, hashtml, isApproved, time } = data;
  return (
    <div className='d-flex justify-content-start mb-4'>
      <div className='img_cont_msg'>
        <img src='/robot.png' className='rounded-circle user_img_msg' />
      </div>
      <div className='msg_cotainer'>
        {hashtml && isApproved ? (
          <div
            className='__html__response'
            dangerouslySetInnerHTML={{ __html: text }}
          />
        ) : (
          text
        )}

        <span className='msg_time'>{time}</span>
      </div>
    </div>
  );
};

const VideoResponse = ({ data, clickPlay }) => {
  return (
    <div className='d-flex justify-content-start mb-4'>
      <div className='img_cont_msg'>
        <img src='/robot.png' className='rounded-circle user_img_msg' />
      </div>
      <div className='video_cotainer'>
        <div className='video_wrap'>
          <div className='_imgvideoblock'>
            <img src='./video_back.jpg' className='videoImg' />
          </div>
          <i
            class='bi bi-play-circle-fill playIcon'
            style={{ fontSize: "5rem" }}
            onClick={clickPlay}
            data-id={data.url}></i>
        </div>
        <h4 className='botmsg_head'>{data.title}</h4>
        <p className='videoDesc'>{data.description}</p>
        <span className='msg_time'>{data.time}</span>
      </div>
    </div>
  );
};

class OptionResponse extends Component {
  state = {
    isDisabled: false,
  };
  onOptionClick = (e) => {
    this.setState({
      isDisabled: true,
    });
    this.props.submitOptions(e);
  };
  render() {
    const { options, title, description, time } = this.props.data;
    return (
      <div className='d-flex justify-content-start mb-4'>
        <div className='img_cont_msg'>
          <img src='/robot.png' className='rounded-circle user_img_msg' />
        </div>
        <div className='msg_cotainer options_block'>
          <h4 className='botmsg_head'>{title}</h4>
          <p>{description}</p>
          {options.map((opt, inx) => {
            return (
              <button
                key={"opt-" + inx}
                type='button'
                value={opt.value.input.text}
                className='btn btn-info'
                onClick={this.onOptionClick}
                disabled={this.state.isDisabled}>
                {opt.label}
              </button>
            );
          })}
          <span className='msg_time'>{time}</span>
        </div>
      </div>
    );
  }
}
const ImageResponse = ({ data }) => {
  return (
    <div className='d-flex justify-content-start mb-4'>
      <div className='img_cont_msg'>
        <img src='/robot.png' className='rounded-circle user_img_msg' />
      </div>
      <div className='video_cotainer'>
        <div className='video_wrap'>
          <img src={data.source} style={{ borderRadius: "10px" }} />
        </div>
        <h4 className='botmsg_head'>{data.title}</h4>
        <p className='videoDesc'>{data.description}</p>
        <span className='msg_time'>{data.time}</span>
      </div>
    </div>
  );
};

const FileResponse = ({ data, showFile, downloadFile }) => {
  const { time, url, title, description } = data;
  return (
    <div className='d-flex justify-content-start mb-4'>
      <div className='img_cont_msg'>
        <img src='/robot.png' className='rounded-circle user_img_msg' />
      </div>
      <div className='video_cotainer file_box'>
        <h4>{title}</h4>
        <div className='video_wrap'>
          <i
            class='bi bi-file-earmark-fill'
            data-id={url}
            alt='click to view'
            title='click to view'
            onClick={showFile}
            style={{ fontSize: "6rem", color: "#fff", cursor: "pointer" }}></i>
        </div>

        <p>{description}</p>
        <span className='msg_time'>{time}</span>
        <div className='msg_footer'>
          {/* <i
            class='bi bi-file-earmark-arrow-down-fill'
            data-id={data.url}
            onClick={downloadFile}></i> */}
        </div>
      </div>
    </div>
  );
};

export {
  TextResponse,
  OptionResponse,
  VideoResponse,
  ImageResponse,
  FileResponse,
};
