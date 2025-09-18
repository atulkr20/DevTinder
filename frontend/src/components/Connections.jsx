import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data)); 
    } catch (err) {
      console.error("Error fetching connections:", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return <h1 className="text-center mt-10">Loading...</h1>;
  if (connections.length === 0)
    return <h1 className="text-center mt-10">No Connections Found</h1>;

  return (
    <div className="flex flex-wrap justify-center">
      {connections.map((connection) => {
        const { _id, firstName, lastName, age, gender, about, photoUrl } =
          connection;

        return (
          <div
            key={_id}
            className="m-4 p-4 rounded-lg bg-base-200 shadow-md w-60 text-center hover:shadow-lg transition"
          >
            <img
              alt={firstName + " " + lastName}
              className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
              src={
                photoUrl ||
                `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`
              }
            />
            <h2 className="font-bold text-xl">
              {firstName + " " + lastName}
            </h2>
            {age && gender && (
              <p className="text-sm text-gray-600">{age + ", " + gender}</p>
            )}
            <p className="mt-2 text-gray-700">{about || "No bio available"}</p>

            {/* Chat Button */}
            <button
              className="btn btn-primary mt-3"
              onClick={() => navigate(`/chat/${_id}`)}
            >
              Chat
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
