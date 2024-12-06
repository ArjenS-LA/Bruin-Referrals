import React, { useState, useEffect } from "react";
import "./Profile.css";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function Profile() {
  const axiosPrivate = useAxiosPrivate();
  const [isEditing, setIsEditing] = useState(false); // Edit mode toggle
  const [selectedFile, setSelectedFile] = useState(null); // File to upload
  const [profileData, setProfileData] = useState({
    name: "",
    bio: "",
    about: "",
    profilepicture: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosPrivate.get("/profile");
        const data = response.data;

        setProfileData({
          name: data.name || "Name",
          profilepicture: data.profilepicture || "",
          bio: data.bio || "Bio",
          about: data.about || "Tell us about yourself",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [axiosPrivate]);

  const handleSaveClick = async () => {
    setIsEditing(false);

    try {
      const formData = new FormData();
      formData.append("name", profileData.name);
      formData.append("bio", profileData.bio);
      formData.append("about", profileData.about);

      // Include the file if a new one was selected
      if (selectedFile) {
        formData.append("profilepicture", selectedFile);
      }

      const response = await axiosPrivate.post("/profileUpdate", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Profile updated:", response.data);
      
      setProfileData((prev) => ({
        ...prev,
        profilepicture: response.data.results.updatedUser.profilepicture, // Update profile picture URL
      }));
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file); // Set the selected file for upload
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prev) => ({
          ...prev,
          profilepicture: reader.result, // Update preview of the profile picture
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="page-container">
      {/* Profile Container */}
      <div className="profile-container">
        <div className="profile-header">
          {/* Profile Picture */}
          <div className="profile-pic-container">
          <img src={profileData.profilepicture} alt="Profile" />
            {isEditing && (
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input"
              />
            )}
          </div>

          {/* Profile Info */}
          <div className="profile-info">
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={(e) =>
                  setProfileData({ ...profileData, name: e.target.value })
                }
                className="edit-input"
              />
            ) : (
              <div className="profile-name">{profileData.name}</div>
            )}
            {isEditing ? (
              <textarea
                name="bio"
                value={profileData.bio}
                onChange={(e) =>
                  setProfileData({ ...profileData, bio: e.target.value })
                }
                className="edit-textarea"
              />
            ) : (
              <div className="profile-bio">{profileData.bio}</div>
            )}
          </div>
        </div>
        <button onClick={isEditing ? handleSaveClick : () => setIsEditing(true)}>
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>

      {/* About Section */}
      <div className="about-container">
        <h2>About</h2>
        {isEditing ? (
          <textarea
            name="about"
            value={profileData.about}
            onChange={(e) =>
              setProfileData({ ...profileData, about: e.target.value })
            }
            className="edit-textarea"
          />
        ) : (
          <p>{profileData.about}</p>
        )}
      </div>
    </div>
  );
}

export default Profile;