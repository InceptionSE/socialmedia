const router = require("express").Router();
const Comment= require("../models/Comment");
const Post=require("../models/Post")
//get comment in a post
router.get("/post/:postId",async(req,res)=>{
   try{
    const postId=req.params.postId;
    const comments= await Comment.find({postId:req.params.postId});
    res.status(200).json(comments);
   } 
   catch(err){
    res.status(500).json(err.message);
   }

})
//comment a post
router.post("/",async(req,res)=>{
    const newComment=new Comment(req.body)
    try{
      const savedcomment=await newComment.save();
      res.status(200).json(savedcomment);
    }catch(err){
      res.status(500).json(err)
    }
  
  })
//update a comment
  router.put("/comment/:commentId",async(req,res)=>{
  try{
    const comment=await Comment.findOne({_id:req.params.commentId})
    await comment.updateOne({ $set: req.body})
    res.status(200).json(comment)
  }
  catch(err){
   res.status(500).json(err);
  }
  })

  //delete a comment

  router.delete("/:id", async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);
        await comment.deleteOne();
        res.status(200).json("the comment has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;