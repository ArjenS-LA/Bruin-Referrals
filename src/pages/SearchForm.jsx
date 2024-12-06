// /src/pages/SearchPosts.js
import React, { useState } from "react";
import axios from "../api/axios";
//import "./register.css"
import "./SearchForm.css"

const SearchForm = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [industry, setIndustry] = useState("");
  const [jobType, setJobType] = useState("");
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setPosts([]); // Clear previous results

    try {
      const params = {};
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;
      if (industry) params.industry = industry;
      if (jobType) params.jobType = jobType;

      const response = await axios.get("/posts/search", {
        params,
      });

      console.log(
        "RESULTS FROM searchPOSTS",
        response.data.posts || response.data
      );

      setPosts(response.data.posts || response.data); // Adjust based on response structure
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching posts");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Search Posts</h2>
      <form onSubmit={handleSearch}>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div>
          <label>Industry:</label>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          >
            <option value="">Select Industry</option>
            <option value="Technology">Technology</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Finance">Finance</option>
            <option value="Education">Education</option>
            <option value="Retail">Retail</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label>Job Type:</label>
          <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
            <option value="">Select Job Type</option>
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
            <option value="internship">Internship</option>
          </select>
        </div>
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}

      {error && (
        <div style={{ color: "red" }}>
          <p>{error}</p>
          <button onClick={() => setError("")}>Dismiss</button>
        </div>
      )}

      <h3>Results:</h3>
      {posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post._id}>
              <h4>{post.title}</h4>
              <p>{post.description}</p>
              <p>
                <strong>Industry:</strong> {post.industry} |{" "}
                <strong>Job Type:</strong> {post.jobType}
              </p>
              <p>
                <strong>Posted by:</strong> {post.author.username} (
                {post.author.username})
              </p>
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p>No posts match the requested criteria.</p>
      )}
    </div>
  );
};

export default SearchForm;
