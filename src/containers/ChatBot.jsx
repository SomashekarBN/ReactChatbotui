import React, { Component } from "react";
import Messages from "../components/Messages";
import "./ChatBot.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Header from "../components/Header";
import { fetchdata } from "../util/fetchApiData";
import { apis } from "../config/config";
import { mapUserInputs, mapResponse, mapInfoStates } from "../util/util";
import Media from "./Media";
class ChatBot extends Component {
  state = {
    userinput: "",
    messages: [],
    showinfo: false,
    infoData: {},
    showLoading: false,
  };
  messagesEndRef = React.createRef();

  componentDidMount() {
    this.sendMessageToBot("");
  }

  sendMessageToBot = async (input) => {
    try {
      this.setState({
        showLoading: true,
      });
      const resp = await fetchdata(apis.getbotresponse, {
        method: "POST",
        body: {
          text: input,
        },
      });

      const botResp = await mapResponse(resp);

      //To load right block view by default
      const info = botResp[1];
      //console.log(info);
      if (Object.keys(info).length > 0) {
        this.setState({
          showinfo: true,
          infoData: mapInfoStates(info.type, info.url),
        });
      }
      const _messages = [...this.state.messages, ...botResp[0]];
      console.log(_messages);
      this.setState({
        messages: _messages,
        showLoading: false,
      });
    } catch (err) {
      console.log("error", err);
      this.setState({
        showLoading: false,
      });
    }
  };

  componentDidUpdate() {
    this.scollToBottom();
  }

  userMessage = (e) => {
    const val = e.target.value;
    console.log(val);
    this.setState({
      userinput: val,
    });
  };

  scollToBottom = () => {
    console.log(this.messagesEnd.scrollHeight);
    this.messagesEnd.scrollTo(0, this.messagesEnd.scrollHeight + 200);
  };

  sendInput = (input) => {
    const _messages = [...this.state.messages];
    //const userInput = this.state.userinput;
    console.log("user Input ", input);
    _messages.push(mapUserInputs(input));
    this.setState({
      messages: _messages,
      userinput: "",
    });
    this.sendMessageToBot(input);
  };

  submitOnEnterkey = (e) => {
    if (e.keyCode == "13") {
      this.sendInput(this.state.userinput);
    }
  };

  infoCloseHandler = () => {
    this.setState({
      showinfo: false,
      infoData: {},
    });
  };
  optionClickHandler = (e) => {
    const val = e.currentTarget.value;
    console.log("button", val);
    this.sendInput(val);
  };
  videoPlayHandler = (e) => {
    console.log("Video Button clicked", e);
    const url = e.target.getAttribute("data-id");
    this.setState({
      showinfo: true,
      infoData: mapInfoStates("video", url),
    });
  };
  downloadFileHandler = (e) => {};
  showFileHandler = (e) => {
    console.log("View File clicked", e);
    const url = e.target.getAttribute("data-id");
    this.setState({
      showinfo: true,
      infoData: mapInfoStates("file", url),
    });
  };
  render() {
    return (
      <div className='container-fluid h-100'>
        <div className='row justify-content-center h-100'>
          <div className='col chat'>
            <div className='glass_back'></div>
            <div className='card'>
              <Header />
              <div
                id='msg_card_body'
                className='card-body msg_card_body'
                ref={(el) => {
                  this.messagesEnd = el;
                }}>
                {this.state.messages.length > 0 && (
                  <Messages
                    messageList={this.state.messages}
                    optionClickRaiser={this.optionClickHandler}
                    videoPalyRaiser={this.videoPlayHandler}
                    downloadFileRaiser={this.downloadFileHandler}
                    showFileRaiser={this.showFileHandler}
                  />
                )}
              </div>
              <div className='type_effect'>
                {this.state.showLoading && (
                  <div class='loader'>
                    <div class='dots'></div>
                    <div class='dots'></div>
                    <div class='dots'></div>
                    <div class='dots'></div>
                    <div class='dots'></div>
                  </div>
                )}
              </div>
              <div className='card-footer'>
                <div className='input-group'>
                  <div className='input-group-append'>
                    <span className='input-group-text attach_btn'>
                      <i className='fas fa-paperclip'></i>
                    </span>
                  </div>
                  <input
                    type='text'
                    name='userInput'
                    className='form-control type_msg'
                    placeholder='Type your message...'
                    onChange={this.userMessage}
                    value={this.state.userinput}
                    onKeyUp={this.submitOnEnterkey}
                    autoComplete={false}
                  />

                  <div className='input-group-append'>
                    <span
                      className='input-group-text send_btn'
                      onClick={() => {
                        this.sendInput(this.state.userinput);
                      }}>
                      <i
                        class='bi bi-arrow-up-right-circle-fill'
                        style={{ fontSize: "2rem" }}></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {this.state.showinfo && (
            <Media data={this.state.infoData} onClose={this.infoCloseHandler} />
          )}
        </div>
      </div>
    );
  }
}

export default ChatBot;
