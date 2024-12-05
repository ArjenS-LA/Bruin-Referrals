import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Post from "./Post";
import PostForm from "./PostForm";
import useRefreshToken from "../hooks/useRefreshToken";

const PostList = () => {
  const axiosPrivate = useAxiosPrivate();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const observerRef = useRef();

  // Function to add a new post
  const addPost = async (newPost) => {
    try {
      const response = await axiosPrivate.post("/posts", {
        ...newPost,
        likes: 0,
        comments: [],
      });
      setPosts((prevPosts) => [response.data, ...prevPosts]);
    } catch (error) {
      console.log("Error adding post:", error.response.data);
      setError("Failed to add post");
    }
  };

  // Fetch posts from API
  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:5000/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to fetch posts");
    }
    setLoading(false);
  };

  // Handle liking a post
  const handleLikePost = async (id) => {
    try {
      const response = await axios.patch(
        "http://localhost:3500/posts/" + id + "/like"
      );
      const updatedPost = response.data;

      // Update the posts state with the new like count
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        )
      );
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      await axios.delete("http://localhost:3500/posts/" + id);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
      setError("Failed to delete post");
    }
  };

  // Fetch posts on initial load
  useEffect(() => {
    fetchPosts();
  }, []);

  // Infinite scroll setup (optional)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prevPage) => prevPage + 1);
          // Note: You'll need to modify backend to support pagination
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loading]);

  return (
    <div className="post-list-container">
      <h2>Post Feed</h2>

      {/* Post Creation Form */}
      <PostForm onAddPost={addPost} />

      {/* Error Handling */}
      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {/* Posts Rendering */}
      {posts.length === 0 && !loading ? (
        <p>No posts available. Be the first to post!</p>
      ) : (
        posts.map((post) => (
          <Post
            key={post._id}
            _id={post._id}
            title={post.title}
            author={post.author}
            description={post.description}
            likes={post.likes}
            comments={post.comments}
            onLike={handleLikePost}
            onDelete={handleDeletePost}
          />
        ))
      )}

      {/* Loading Indicator */}
      {loading && <p>Loading posts...</p>}

      {/* Infinite Scroll Trigger (optional) */}
      <div ref={observerRef} style={{ height: "20px" }}></div>
    </div>
  );
};

export default PostList;
