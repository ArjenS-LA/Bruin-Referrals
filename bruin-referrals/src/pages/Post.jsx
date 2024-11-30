import React, { useState } from "react";
import "./Post.css";


const Post = ({ _id, title, author, description, likes, comments, onLike }) => {
  const [commentList, setCommentList] = useState(comments || []);
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      // You might want to send the comment to the backend
      // For now, we'll just update local state
      setCommentList((prev) => [...prev, newComment]);
      setNewComment("");
    }
  };

  return (
    <div className="post-item">
      <h3 className="post-title">{title}</h3>
      <p className="post-author">by {author || "Unknown"}</p>
      <p className="post-description">{description}</p>
      
      <div className="post-interactions">
        <button onClick={() => onLike(_id)} className="like-button">Like ({likes})</button>
        
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="comment-input"
          />
          <button type="submit" className="comment-submit">
            Post
          </button>
        </form>
        
        {commentList.length > 0 && (
          <ul className="comment-list">
            {commentList.map((comment, index) => (
              <li key={index} className="comment-item">{comment}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Post;