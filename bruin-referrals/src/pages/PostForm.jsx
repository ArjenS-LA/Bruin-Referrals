import React, { useState } from "react";
import "./PostForm.css"

const PostForm = ({ onAddPost }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description) {
      onAddPost({ 
        id: Date.now(), // Temporary unique ID
        title,
        description,
        author: "Current User", // Replace with authenticated user later
        likes: 0,
        comments: [] 
      });
      setTitle("");
      setDescription("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{ marginRight: "10px", padding: "8px" }}
      />
      <input
        type="text"
        placeholder="Post Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        style={{ marginRight: "10px", padding: "8px" }}
      />
      <button type="submit" style={{ padding: "8px" }}>Add Post</button>
    </form>
  );
};

export default PostForm;
