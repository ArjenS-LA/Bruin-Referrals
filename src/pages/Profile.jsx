import React, { useState } from 'react';
import './Profile.css';
import BruinDefaultpfp from "../assets/images/bearpfp.png";
import axios from "axios";

function Profile() {
  const [isEditing, setIsEditing] = useState(false); // Edit mode toggle
  const [profileData, setProfileData] = useState({
    name: "Name",
    bio: "Bio",
    about: "Tell us about yourself"
  });
  const [profilePic, setProfilePic] = useState(BruinDefaultpfp); // Default profile pic URL

  // Function to handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result); // Update the profile pic with the selected file
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  const handleEditClick = () => {
    setIsEditing((prev) => !prev); // Toggle editing mode
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveClick = async () => {
    setIsEditing(false); // Exit editing mode

    const updatedData = {
      name: profileData.name,
      profilepicture: profilePic,
      bio: profileData.bio,
      about: profileData.about,
    };

    try {
      const response = await axios.post("http://localhost:5000/profileUpdate", updatedData);
      console.log('Profile updated:', response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  // Trigger file input on profile picture click (only if in edit mode)
  const handleProfilePicClick = () => {
    if (isEditing) { // Only allow profile picture change if in edit mode
      document.getElementById('profile-pic-input').click(); // Trigger the file input click
    }
  };

  return (
    <div className="page-container">
      {/* Profile Container */}
      <div className="profile-container">
        <div className="profile-header">
          {/* Profile Picture with file input */}
          <div className="profile-pic-container" onClick={handleProfilePicClick}>
            <img
              className="profile-pic"
              src={profilePic} // Use the state for the profile picture URL
              alt="Profile"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input"
              id="profile-pic-input" 
              style={{ display: 'none' }} 
            />
          </div>

          {/* Profile Info (Name and Bio) */}
          <div className="profile-info">
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
                className="edit-input"
              />
            ) : (
              <div className="profile-name">{profileData.name}</div>
            )}
            {isEditing ? (
              <textarea
                name="bio"
                value={profileData.bio}
                onChange={handleInputChange}
                className="edit-textarea"
              />
            ) : (
              <div className="profile-bio">{profileData.bio}</div>
            )}
          </div>
        </div>
        <button className="edit-button" onClick={isEditing ? handleSaveClick : handleEditClick}>
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>

      {/* About Container */}
      <div className="about-container">
        <div className="about-section">
          <h2>About </h2>
          {isEditing ? (
            <textarea
              name="about"
              value={profileData.about}
              onChange={handleInputChange}
              className="edit-textarea"
            />
          ) : (
            <p>{profileData.about}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;