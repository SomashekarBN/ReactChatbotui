import React from "react";
const Header = () => {
  return (
    <div className='card-header msg_head'>
      <div className='d-flex bd-highlight'>
        <div className='img_cont'>
          <img src='/robot.png' className='rounded-circle user_img' />
          <span className='online_icon'></span>
        </div>
        <div className='user_info'>
          <span>PIMU</span>
          <p>1767 Messages</p>
        </div>
        {/* <div className='video_cam'>
          <span>
            <i className='bi-camera-video-fill'></i>
          </span>
          <span>
            <i className='bi-telephone-fill'></i>
          </span>
        </div> */}
      </div>
      {/* <span id='action_menu_btn'>
        <i className='bi-ellipsis-v'></i>
      </span> */}
      {/* <div className='action_menu'>
        <ul>
          <li>
            <i className='bi-user-circle'></i> View profile
          </li>
          <li>
            <i className='bi-users'></i> Add to close friends
          </li>
          <li>
            <i className='bi-plus'></i> Add to group
          </li>
          <li>
            <i className='bi-ban'></i> Block
          </li>
        </ul>
      </div> */}
    </div>
  );
};
export default Header;
