import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/request/received`, {
        withCredentials: true,
      });
      setRequests(res.data.data);
    } catch (err) {
      console.error("Error fetching requests:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleReview = async (requestId, status) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );

      setRequests((prev) => prev.filter((req) => req._id !== requestId));
    } catch (err) {
      console.error("Error reviewing request:", err);
    }
  };

  if (loading) return <h2 className="text-center mt-10">Loading...</h2>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-8">
        Received Requests
      </h2>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500">No pending requests.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req) => {
            const { firstName, lastName, age, gender, about, photoUrl } =
              req.fromUserId;

            return (
              <div
                key={req._id}
                className="bg-white dark:bg-base-200 p-5 rounded-xl shadow-md hover:shadow-xl transition hover:scale-[1.02]"
              >
                {/* User Info */}
                <div className="flex items-center space-x-4">
                  <img
                    alt={firstName + " " + lastName}
                    className="w-14 h-14 rounded-full object-cover border"
                    src={
                      photoUrl ||
                      `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`
                    }
                  />
                  <div>
                    <h3 className="font-semibold text-lg">
                      {firstName} {lastName}
                    </h3>
                    {age && gender && (
                      <p className="text-sm text-gray-500">
                        {age} yrs · {gender}
                      </p>
                    )}
                  </div>
                </div>

                {/* About */}
                <p className="mt-3 text-sm text-gray-600 line-clamp-3">
                  {about || "No bio available"}
                </p>

                {/* Actions */}
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={() => handleReview(req._id, "accepted")}
                    className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition"
                  >
                    ✅ Accept
                  </button>
                  <button
                    onClick={() => handleReview(req._id, "rejected")}
                    className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
                  >
                    ❌ Reject
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Requests;
