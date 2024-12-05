import React, { useRef, useState, useEffect } from "react";
import "./PostForm.css";
import "./register.css";
import axios from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const PostForm = ({ onAddPost }) => {
  // const userRef = useRef();
  // const errRef = useRef();

  const axiosPrivate = useAxiosPrivate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [industry, setIndustry] = useState("");
  const [jobType, setJobType] = useState("");
  // const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && description && industry && jobType) {
      onAddPost({ id: Date.now(), title, description, industry, jobType });
      setTitle("");
      setDescription("");
      setIndustry("");
      setJobType("");
    } else {
      onAddPost.status(400).json({ message: "Please fill in all fields" });
    }
  };

  // useEffect(() => {
  //   userRef.current.focus();
  // }, []);

  // useEffect(() => {
  //   setErrMsg("");
  // }, [title, description, industry, jobType]);

  return (
    <section>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        {/* <p
          ref={errRef}
          className={errMsg ? "error" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p> */}
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
        <select
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          required
          style={{ marginRight: "10px", padding: "8px" }}
        >
          <option value="" disabled>
            Select Industry
          </option>
          <option value="Technology">Technology</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Finance">Finance</option>
          <option value="Education">Education</option>
          <option value="Retail">Retail</option>
          <option value="Other">Other</option>
        </select>
        <select
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          required
          style={{ marginRight: "10px", padding: "8px" }}
        >
          <option value="" disabled>
            Select Job Type
          </option>
          <option value="full-time">Full-Time</option>
          <option value="part-time">Part-Time</option>
          <option value="internship">Internship</option>
        </select>
        <button type="submit" style={{ padding: "8px" }}>
          Add Post
        </button>
      </form>
    </section>
  );
};

export default PostForm;
