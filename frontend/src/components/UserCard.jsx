import axios from "axios";
import BASE_URL from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user, isPreview = false }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user || {};
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error("Error sending request:", err.response?.data || err.message);
    }
  };

  if (!user) return null;

  return (
    <div className="card bg-base-200 w-96 shadow-md hover:shadow-xl transition rounded-xl">
      <figure>
        <img
          src={photoUrl || "/default-avatar.png"}
          alt={`${firstName || ""} ${lastName || ""}`}
          className="h-64 w-full object-cover rounded-t-xl"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg font-bold">
          {firstName} {lastName}
        </h2>
        {age && gender && (
          <p className="text-sm text-gray-600">{age} · {gender}</p>
        )}
        <p className="text-sm text-gray-700">
          {about || "No bio available"}
        </p>

        {/* ✅ Show buttons only if NOT preview */}
        {!isPreview && (
          <div className="card-actions justify-center my-4 gap-3">
            <button
              className="btn btn-error"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              ❌ Ignore
            </button>
            <button
              className="btn btn-success"
              onClick={() => handleSendRequest("interested", _id)}
            >
              💙 Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
