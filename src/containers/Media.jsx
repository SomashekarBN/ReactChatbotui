import React, { Component } from "react";
import ReactPlayer from "react-player";

// Render a YouTube video player

class Media extends Component {
  state = {
    showinfo: false,
  };
  componentDidMount() {
    const isInfo = Object.keys(this.props.data).length > 0 ? true : false;
    console.log(this.props);
    this.setState({
      showinfo: isInfo,
    });
  }
  closeInfo = () => {
    this.setState({
      showinfo: false,
    });
    setTimeout(() => {
      this.props.onClose();
    }, 1000);
  };

  render() {
    const colName = this.state.showinfo ? "col" : "";
    const { url, type } = this.props.data;
    return (
      <div className={`info_box ${colName}`}>
        <span class='closebtn' onClick={this.closeInfo}>
          &times;
        </span>
        {type === "video" && (
          <ReactPlayer
            url={url}
            controls={true}
            width={"100%"}
            height={"80%"}
            playing={true}
          />
        )}
        {type === "file" && (
          <iframe
            src={`https://docs.google.com/viewerng/viewer?url=${url}&embedded=true`}
            frameborder='0'
            height='95%'
            width='100%'
            title='__farme_1'></iframe>
        )}
      </div>
    );
  }
}
export default Media;
