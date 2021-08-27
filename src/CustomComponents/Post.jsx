import React from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";

const Post = ({ userName, caption, imageUrl }) => {
  return (
    <div className={"post"}>
      <div className={"post__header"}>
        <Avatar className={"post__avatar"} alt={userName} src={"df"} />
        <h3>{userName}</h3>
      </div>
     
      <img className="post__Image" src={imageUrl} alt="Post Image" />
      <h4 className={"post__text"}>
        <strong>{userName}</strong> {caption}
      </h4>
    </div>
  );
};

export default Post;