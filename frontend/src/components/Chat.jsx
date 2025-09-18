import { useParams } from "react-router-dom";

const Chat = () => {
  const { id } = useParams();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-base-200">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Chat with User {id}</h1>
        <div className="border rounded-lg p-4 h-64 overflow-y-auto mb-4">
          <p className="text-gray-500 text-center">No messages yet...</p>
        </div>
        <div className="flex">
          <input
            type="text"
            placeholder="Type a message..."
            className="input input-bordered w-full"
          />
          <button className="btn btn-primary ml-2">Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
