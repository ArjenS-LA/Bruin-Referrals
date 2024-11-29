import React, { useState, useEffect, useRef } from "react";
import Post from "./Post";
import PostForm from "./PostForm";
import axios from "axios";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef();

  const addPost = async (newPost) => {
    try {
      console.log("Adding Post:", newPost); // Log new post data
      const response = await axios.post("http://localhost:3500/posts", newPost);
      console.log("Response from server:", response.data); // Log server response
      setPosts((prevPosts) => [response.data, ...prevPosts]);
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  // Fetch posts from API
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3500/posts"); // Correct URL
      const data = await response.json();
      setPosts(data); // Set posts in state
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setLoading(false);
  };

  // Load posts when page changes
  useEffect(() => {
    fetchPosts();
  }, []);

  // Set up IntersectionObserver for infinite scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
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
  }, []);

  return (
    <div>
      <h2>Post Feed</h2>
      <PostForm onAddPost={addPost} />
      {posts.map((post) => (
        <Post
          key={post._id} // Use _id as the key
          title={post.title}
          author={post.userId || "Current User"}
          description={post.description || post.body}
          likes={post.likes}
          comments={post.comments}
        />
      ))}
      {loading && <p>Loading more posts...</p>}
      <div ref={observerRef} style={{ height: "20px" }}></div>
    </div>
  );
};

export default PostList;
