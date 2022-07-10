const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    postId:{
      type:String,
      require:true
    },
    profilePicture:{
      type:String,
      default:"https://scontent.fhan2-3.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=mwBwWgwyGyQAX8MYhUy&_nc_ht=scontent.fhan2-3.fna&oh=00_AT-eOFAYn-7TQCgwwp-WpET99YNPy4XOlUQkI1NjgdTmzw&oe=62E62778"
    },
    username:{
      type:String,
      require: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
