import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useContext } from "react";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { MoreVert } from "@material-ui/icons";
import {AuthContext} from './../../context/AuthContext';

export default function Profile() {
  
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const id = useParams().id;
  const {user:currentUser}=useContext(AuthContext);
  const [file,setFile]=useState(null);
  const setImage=()=>{

  }
  const setProfile=async(e)=>{
    
    console.log(e.target.files[0].name)
    setFile(e.target.files[0]);
      const data=new FormData();
      const filename=Date.now()+e.target.files[0].name;
      data.append("name",filename);
      data.append("file",e.target.files[0]);
      try {
        await axios.post("http://localhost:8800/api/upload", data);
        console.log('successima');
      } catch (err) {
        console.log(err);
      }
      try{
        await axios.put(`http://localhost:8800/api/users/${currentUser._id}`,{profilePicture:filename,userId:currentUser._id});
        console.log('success')
      }
      catch(err){
        console.log(err);
      }
     window.location.reload();
  }
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`http://localhost:8800/api/users?userId=${id}`);
      console.log(res.data);
      setUser(res.data);
    };
    fetchUser();
    console.log(user);
  }, [id]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "person/noCover.png"
                }
                alt=""
              />
              <label htmlFor="fileprofile" className="setImage" style={{position:'absolute',top:'250px',zIndex:'2'}} onClick={setImage}>
              <input
                style={{ display: "none" }}
                type="file"
                id="fileprofile"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setProfile(e)}
              />{user._id===currentUser._id?<AddAPhotoIcon></AddAPhotoIcon>:<></>}</label>
              <img 
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
              
            
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed userId={user._id} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
