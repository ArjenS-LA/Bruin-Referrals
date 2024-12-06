import React from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import "./Post.css";

const Post = ({
  _id,
  title, 
  description,
  author,
  likes = [],
  industry,
  jobType,
  currentUser,
  comments = [],
  onLike,
  onAddComment,
  onDelete,
}) => {
  const axiosPrivate = useAxiosPrivate();

  const handleLike = async () => {
    try {
      const response = await axiosPrivate.patch(`http://localhost:5000/posts/${_id}/like`);
      onLike(response.data); // Update post in the parent component
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleAddComment = async (commentText) => {
    try {
      const response = await axiosPrivate.post(`http://localhost:5000/posts/${_id}/comments`, {
        text: commentText,
      });
      onAddComment(_id, response.data); // Update comments in the parent component
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDelete = async () => {
    try {
      // Show confirmation dialog
      const confirmDelete = window.confirm("Are you sure you want to delete this post?");
      if (!confirmDelete) return;

      const response = await axiosPrivate.delete(`/posts/${_id}`);
      onDelete(_id); // Call the delete handler in parent component
    } catch (error) {
      console.error("Error deleting post:", error);
      // Optional: Add error handling, like showing an error message
      alert(error.response?.data?.message || "Failed to delete post");
    }
  };

  return (
    <div className="post">
      <h3>{title}</h3>
      <p><strong>Author:</strong> {author.username || "Anonymous"}</p>
      <p><strong>Industry:</strong> {industry}</p>
      <p><strong>Job Type:</strong> {jobType}</p>
      <p>{description}</p>

      <div className="post-actions">
        <button onClick={handleLike}>{likes.length} Likes</button>

        {/* Only show delete button if current user is the post author */}
        <p> {currentUser} </p>
        {currentUser && currentUser === author.username && (
          <button 
            onClick={handleDelete} 
            className="delete-button"
          >
            Delete Post
          </button>
        )}
      </div>

      <div className="comments">
        <h4>Comments</h4>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>
              {comment.text} - {comment.author?.username || 'Anonymous'}
            </li>
          ))}
        </ul>
        <CommentForm onAddComment={handleAddComment} />
      </div>
    </div>
  );
};

const CommentForm = ({ onAddComment }) => {
  const [comment, setComment] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      onAddComment(comment);
      setComment("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button type="submit">Add Comment</button>
    </form>
  );
};

export default Post;
