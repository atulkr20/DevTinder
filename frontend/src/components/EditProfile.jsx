import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import UserCard from "./UserCard";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();

  // Controlled inputs with fallback values
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [error, setError] = useState("");

  // ✅ Sync local state with latest user data
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setAge(user.age || "");
      setGender(user.gender || "");
      setAbout(user.about || "");
      setPhotoUrl(user.photoUrl || "");
    }
  }, [user]);

  const saveProfile = async () => {
    if (!firstName || !lastName) {
      setError("First Name and Last Name are required");
      return;
    }

    setError("");

    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );

      // Update Redux store
      dispatch(addUser(res?.data?.data));

      // ✅ Toast instead of alert
      const toast = document.createElement("div");
      toast.className =
        "toast toast-top toast-center transition-opacity duration-500";
      toast.innerHTML = `
        <div class="alert alert-success">
          <span>Profile updated successfully!</span>
        </div>
      `;
      document.body.appendChild(toast);

      setTimeout(() => {
        document.body.removeChild(toast);
      }, 3000);
    } catch (err) {
      setError(err.message || "Failed to save profile");
    }
  };

  return (
    <div className="flex justify-center my-10 gap-6">
      {/* Edit Form */}
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Edit Profile</h2>

          {/* First Name */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">First Name</legend>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Enter your First Name"
            />
          </fieldset>

          {/* Last Name */}
          <fieldset className="fieldset my-2">
            <legend className="fieldset-legend">Last Name</legend>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Enter your Last Name"
            />
          </fieldset>

          {/* Age */}
          <fieldset className="fieldset my-2">
            <legend className="fieldset-legend">Age</legend>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Enter your Age"
            />
          </fieldset>

          {/* Gender */}
          <fieldset className="fieldset my-2">
            <legend className="fieldset-legend">Gender</legend>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="input input-bordered w-full"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </fieldset>

          {/* Photo URL */}
          <fieldset className="fieldset my-2">
            <legend className="fieldset-legend">Photo URL</legend>
            <input
              type="text"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Enter your photo URL"
            />
          </fieldset>

          {/* About */}
          <fieldset className="fieldset my-2">
            <legend className="fieldset-legend">About</legend>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Write something about yourself"
            />
          </fieldset>

          {/* Error Message */}
          {error && <p className="text-red-500 my-2">{error}</p>}

          {/* Save Button */}
          <div className="card-actions justify-center my-2">
            <button className="btn btn-primary w-full" onClick={saveProfile}>
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div className="card bg-base-100 w-80 shadow-sm p-4">
        <UserCard
          user={{ firstName, lastName, age, gender, about, photoUrl }}
        />
      </div>
    </div>
  );
};

export default EditProfile;
