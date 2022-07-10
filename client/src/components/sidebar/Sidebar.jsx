import "./sidebar.css";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@material-ui/icons";
import { useContext } from "react";
import LinktoFriend from "../LinktoFriend";
import {AuthContext} from '../../context/AuthContext'
import CloseFriend from "../closeFriend/CloseFriend";
import {useEffect,useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
export default function Sidebar() {
  const user=useContext(AuthContext);
  const [Users,setUsers]= useState(null);
  useEffect(()=>{
   const getFriends=async ()=>{
    const users=await axios.get(`http://localhost:8800/api/users/friends/${user.user._id}`);
    setUsers(users.data);
   }
   getFriends();
   console.log(Users)

  },[])
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <Link to={`/messenger`}>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chat</span>
          </li>
          </Link>
          
          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Nhóm của bạn</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Đã lưu</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Câu hỏi</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Công việc</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Sự kiện</span>
          </li>
          
        </ul>
        <button className="sidebarButton">Xem thêm</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {Users?Users.map((u) => (
            <LinktoFriend u={u}></LinktoFriend>     
          )):<></>}
        </ul>
      </div>
    </div>
  );
}
