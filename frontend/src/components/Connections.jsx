import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log("API Response:", res.data); // Debugging
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
    <div className="my-10">
      {/* Heading in Center */}
      <h1 className="font-bold text-2xl text-center mb-6">Connections</h1>

      {/* Cards Grid */}
      <div className="flex flex-wrap justify-center">
        {connections.map((connection) => {
          const { firstName, lastName, photoUrl, age, gender, about } = connection;

          return (
            <div
              key={connection._id || firstName + lastName}
              className="m-4 p-4 rounded-lg bg-base-200 shadow-md w-60 text-center"
            >
              <img
                alt="photo"
                className="w-20 h-20 rounded-full mx-auto mb-3"
                src={photoUrl}
              />
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && (
                <p className="text-sm text-gray-600">{age + ", " + gender}</p>
              )}
              <p className="mt-2 text-gray-700">{about}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
