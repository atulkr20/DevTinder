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

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Received Requests</h2>
      {requests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        requests.map((req) => (
          <div
            key={req._id}
            className="border p-4 mb-3 rounded-lg shadow-sm flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">
                {req.fromUserId.firstName} {req.fromUserId.lastName}
              </h3>
              <p>{req.fromUserId.about}</p>
              <p className="text-sm text-gray-600">
                {req.fromUserId.age} yrs, {req.fromUserId.gender}
              </p>
            </div>
            <div>
              <button
                onClick={() => handleReview(req._id, "accepted")}
                className="bg-green-500 text-white px-3 py-1 rounded mr-2"
              >
                Accept
              </button>
              <button
                onClick={() => handleReview(req._id, "rejected")}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Requests;
