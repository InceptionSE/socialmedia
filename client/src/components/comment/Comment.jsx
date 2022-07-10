import React from 'react'
import { useState } from 'react'
import { ListItem,Avatar ,Popover,Typography} from '@material-ui/core'
import {MoreVert} from '@material-ui/icons'
import {useContext} from 'react';
import { AuthContext } from "../../context/AuthContext";
import axios from 'axios';

export default function Comment({comment,message,callComment}) {
  
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: currentUser } = useContext(AuthContext);
    const [visible,setVisible]=useState(false)
    const handleClose=()=>{
        setVisible(null);
    }
    const onhandleDelete=async()=>{
      try{
        await axios.delete(`http://localhost:8800/api/comments/${comment._id}`)
      }
      catch(err){
        console.log(err);
      }
      callComment();
    }
    const onhandleChange=async()=>{
        try{
          await axios.put(`http://localhost:8800/api/comments/comment/${comment._id}`,{desc:message})
        }
        catch(err){
           console.log(err)
        }
        callComment();
    }
    const onhandleClick=(e)=>{
        console.log(visible)
        if(comment.userId===currentUser._id)
        setVisible(e.target);
        console.log(comment)
    }
    const open = Boolean(visible);
    const id = open ? 'simple-popper' : undefined;
  return (
    <ListItem style={{flexWrap:'wrap'}}>
         <div style={{display:'flex',alignItem:'center',width:'500px'}}><Avatar src={PF+comment.profilePicture}></Avatar>
         <div style={{padding:'10px '}}> {comment.username}</div>
         <MoreVert style={{marginLeft:'300px'}} onClick={onhandleClick}></MoreVert>
         <Popover id={id} open={open} onClose={handleClose} anchorEl={visible}  transformOrigin={{
    vertical: 'top',
    horizontal: 'left',
  }}  anchorOrigin={{
    vertical: 'top',
    horizontal: 'left',
  }}>
  <Typography sx={{ p: 2 }} style={{cursor:'pointer'}} onClick={onhandleDelete}>Xóa</Typography>
  <Typography sx={{ p: 2 }} style={{cursor:'pointer'}} onClick={onhandleChange}>Sửa</Typography>

</Popover></div> 
          <div style={{margin:'10px'}}>{comment.desc}</div>
        </ListItem>
  )
}
