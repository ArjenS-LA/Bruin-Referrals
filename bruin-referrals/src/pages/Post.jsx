import React, { useState } from "react";
import axios from "axios"
import "./Post.css";


const Post = ({ _id, title, author, description, likes, comments, onLike, onDelete }) => {
  const [commentList, setCommentList] = useState(comments || []);
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      try {
        const response = await axios.post(`http://localhost:3500/posts/${_id}/comments`, {
          comment: newComment, // Simple string passed as comment
        });
  
        setCommentList(response.data); // Update local comments list
        setNewComment("");
      } catch (error) {
        console.error("Error adding comment:", error);
        alert("Failed to add comment. Please try again.");
      }
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
                    <li key={comment._id || index} className="comment-item">{comment.text}</li>
                 ))}
            </ul>
        )}
      </div>
    </div>
  );
};

export default Post;