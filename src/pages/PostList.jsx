import React, { useState, useEffect, useRef } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Post from "./Post";
import PostForm from "./PostForm";
import "./PostList.css"

const PostList = () => {
  console.log("PostList component rendered");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  //Fetch user
  /*useEffect(() => {
    console.log("useEffect triggered");
    const fetchCurrentUser = async () => {
      try {
        const response = await axiosPrivate.get("/user/me");
        console.log("Fetched current user:", response.data.username);
        setCurrentUser(response.data.username);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchCurrentUser();
  }, [axiosPrivate]);*/

  // Fetch all posts
  useEffect(() => {
    console.log("useEffectPosts triggered");
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axiosPrivate.get("/posts");
        setPosts(response.data); // Update the posts state with the fetched data
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Failed to fetch posts.");
      }

      setLoading(false);
    };

    fetchPosts();
  }, [axiosPrivate]);

  // Add a new post
  const addPost = async (newPost) => {
    try {
      await axiosPrivate.post("/posts", newPost);
      const response = await axiosPrivate.get("/posts");
      setPosts(response.data);
      //setPosts((prevPosts) => [response.data, ...prevPosts]); // Add the new post to the top
    } catch (error) {
      console.error("Error adding post:", error);
      setError("Failed to add post.");
    }
  };

  // Handle liking a post
  const handleLikePost = (updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      )
    );
  };

  const handleDeletePost = async (id) => {
    try {
      // Remove the post from the list
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
      setError("Failed to delete post.");
    }
  }; 

  const handleAddComment = (postId, updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId ? updatedPost : post
      )
    );
  };

  return (
    <div className="post-list-container">
      <h2>Post Feed</h2>

      {/* Post Creation Form */}
      <PostForm onAddPost={addPost} />

      {/* Error Handling */}
      {error && <div className="error-message">{error}</div>}

      {/* Posts Rendering */}
      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p>No posts available. Be the first to post!</p>
      ) : (
        posts.map((post) => (
          <Post
            key={post._id}
            {...post}
            currentUser={currentUser}
            onLike={handleLikePost}
            onDelete={handleDeletePost}
            onAddComment={handleAddComment}
          />
        ))
      )}
    </div>
  );
};

export default PostList;
