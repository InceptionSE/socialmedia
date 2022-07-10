import "./post.css";
import { MoreVert, SettingsRemoteRounded } from "@material-ui/icons";

import { useContext, useEffect, useState,Fragment } from "react";
import {Typography} from '@mui/material';
import Popover from '@mui/material/Popover';
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Comment from './../comment/Comment'
import { TextField,Card, Drawer,Box,List,ListItem,Avatar } from "@material-ui/core";
export default function Post({ apost }) {
  const [like, setLike] = useState(apost.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [visible,setVisible]=useState(false);
  const [visibleCap,setVisibleCap]=useState(false);
  const [text,setText]=useState(null)
  const [visibleComment,setVisibleComment]=useState(false);
  const [comments,setComments]=useState(null);
  const [message,setMessage]=useState(null);
  const [post,setPost]=useState(apost);
  const [status,setStatus]=useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);
  useEffect(()=>{
  const fetchPost=async()=>{
    try{
      const res=await axios.get(`http://localhost:8800/api/posts/${post._id}`)
     setPost(res.data); 
    }
    catch(err){
      console.log(err);
    }
  }  
  fetchPost();
  },[status])
  const onhandleClick=(e)=>{
    console.log(visible)
    if(post.userId===currentUser._id)
    setVisible(e.target);
    else alert('Bạn không phải chủ bài viết này!')
  }
  const handleClose = () => {
    setVisible(null);
  };
  const handleCloseCap=()=>{
    setVisibleCap(null);
  }
  const onSubmit=async()=>{
  try{
    await axios.put(`http://localhost:8800/api/posts/${post._id}`,{desc:text})
    alert('Sửa thành công!')
    setStatus(!status)
    setVisibleCap(null);
    
  }
  catch(err){
    console.log(err);
  }
}

  const callComment=async()=>{
    try{
     const res=await axios.get(`http://localhost:8800/api/comments/post/${post._id}`)
     setComments(res.data);
     console.log(res.data);
    }
    catch(err){
console.log(err)
    }
    handleClickComment(true)
  }
  const addComment=async(e)=>{
    console.log(currentUser)
    if(e.key=="Enter"){
     setMessage(e.target.value);
     await axios.post(`http://localhost:8800/api/comments`,{userId:currentUser._id,profilePicture:currentUser.profilePicture,desc:e.target.value,postId:post._id,username:currentUser.username})
    e.target.value="";
    callComment();
    }
   
  }
  const onChangeText=(e)=>{
   setText(e.target.value)
  }
  const handleClickComment=(logic)=>{
  setVisibleComment(logic)
  }
  const onhandleDelete=async()=>{
    console.log(currentUser);
    console.log(post)
    if(post.userId===currentUser._id){
     
        await axios.delete(`http://localhost:8800/api/posts/${post._id}`)
        
      alert("Xóa thành công!");
      window.location.reload();
    }
  else{
    alert('Bạn không đủ thầm quyền!');
  }
  }
  const onhandleChange=(e)=>{
   setVisible(null);
   setVisibleCap(e.target)
  }
  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes,comments]);
 
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  const open = Boolean(visible);
  const id = open ? 'simple-popper' : undefined;
  const openCap = Boolean(visibleCap);
  const idCap = openCap ? 'simple-popper' : undefined;
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight" >
          <button aria-describedby={id} type="button" onClick={onhandleClick}>
  Xóa/sửa
</button>
<Popover id={id} open={open} onClose={handleClose} anchorEl={visible}  transformOrigin={{
    vertical: 'top',
    horizontal: 'left',
  }}  anchorOrigin={{
    vertical: 'top',
    horizontal: 'left',
  }}>
  <Typography sx={{ p: 2 }} style={{cursor:'pointer'}} onClick={onhandleDelete}>Xóa</Typography>
  <Typography sx={{ p: 2 }} style={{cursor:'pointer'}} onClick={onhandleChange}>Sửa</Typography>

</Popover>
<Popover id={idCap} open={openCap} onClose={handleCloseCap} anchorEl={visibleCap}>
  <div style={{display:'flex',flexDirection:'column'}} >
  <TextField
          id="filled-multiline-static"
          label="Sửa tiêu đề của bạn"
          multiline
          rows={6}
          onChange={onChangeText}
          defaultValue={post?.desc}
          variant="filled"
        />
 <button className="ok" onClick={onSubmit} style={{backgroundColor:'e8e8e8'}}>Sửa</button>
  </div >

</Popover>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src={`${PF}heart.png`}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} người thích điều này</span>
          </div>
          <div className="postBottomRight">
            <Fragment>
            <span className="postCommentText" onClick={callComment}> bình luận</span>
           <Drawer  anchor={'right'}
            open={visibleComment}
            onClose={()=>handleClickComment(false)}>
               <Box
      role="presentation"

    >
      <List  style={{width:'500px'}}>
      <TextField
          id="filled-multiline-static"
          label="Thêm bình luận "
          multiline
          rows={6}
         fullWidth
         onChange={(e)=>{setMessage(e.target.value)}}
          variant="filled"
          onKeyPress={addComment}
        />
        {comments?comments.map((comment,index)=>
        <Comment comment={comment} key={index} message={message} callComment={callComment}/>):<></>}
        
      </List>
    </Box>
            </Drawer>
            </Fragment>
            
          </div>
        </div>
      </div>
    </div>
  );
}
