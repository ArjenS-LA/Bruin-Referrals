import React, { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import "./PostForm.css";

const industries = ["Technology", "Healthcare", "Business", "Research", "Other"];
const jobTypes = ["Full-Time", "Part-Time", "Internship"];

const PostForm = ({ onAddPost }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [industry, setIndustry] = useState(industries[0]);
  const [jobType, setJobType] = useState(jobTypes[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!title || !industry || !jobType) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axiosPrivate.post("http://localhost:5000/posts", {
        title,
        description,
        industry,
        jobType,
      });
      onAddPost(response.data); // Notify parent to update the post list
      setTitle("");
      setDescription("");
      setIndustry(industries[0]);
      setJobType(jobTypes[0]);
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select value={industry} onChange={(e) => setIndustry(e.target.value)}>
        {industries.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
        {jobTypes.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <button type="submit">Add Post</button>
    </form>
  );
};

export default PostForm;
