import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store';

const CreateRoom: React.FC = () => {
  const [roomName, setRoomName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [showRoomDetails, setShowRoomDetails] = useState(false);
  const navigate = useNavigate();
  const { username, setRoomID } = useUserStore();

  useEffect(() => {
    if (username === '') {
      navigate("/auth");
    }
  }, [username, navigate]);

  const handleCreateRoomClick = () => {
    setShowRoomDetails(true);
  };

  const handleGenerateRoomId = () => {
    const newRoomId = uuidv4();
    setRoomId(newRoomId);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!roomId || !roomName) {
      alert("Please fill in both the room name and room ID.");
      return;
    }

    const serverUrl = import.meta.env.VITE_REACT_APP_SERVER_URL;
    const url = serverUrl === "://localhost:8080" ? `http${serverUrl}` : `https${serverUrl}`;

    try {
      const response = await fetch(`${url}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          roomName,
          roomId
        })
      });

      if (response.ok) {
        // Add a toast here
        setRoomID(roomId);
        navigate("/join");
      } else {
        alert("Error creating room");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-800">
      <div className="w-full max-w-xs bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-4xl font-bold text-blue-600 mb-6 text-center">Create Room</h2>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          {!showRoomDetails && (
            <button
              type="button"
              onClick={handleCreateRoomClick}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded w-full transition duration-200 ease-in-out mb-4"
            >
              Create Room
            </button>
          )}
          {showRoomDetails && (
            <>
              <input
                type="text"
                placeholder="Room Name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="bg-gray-200 text-gray-800 border-b-2 border-orange-400 rounded mb-4 px-4 py-2 focus:outline-none focus:border-orange-500 w-full"
              />
              <div className="flex items-center w-full mb-4">
                {roomId && (
                  <input
                    type="text"
                    value={roomId}
                    readOnly
                    className="bg-gray-200 text-gray-800 border-b-2 border-orange-400 rounded-l px-4 py-2 focus:outline-none w-full"
                  />
                )}
                <button
                  type="button"
                  onClick={handleGenerateRoomId}
                  className={`bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 ${
                    roomId ? 'rounded-r' : 'rounded'
                  } transition duration-200 ease-in-out w-full`}
                >
                  Generate Room ID
                </button>
              </div>
              {roomId && (
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded w-full transition duration-200 ease-in-out"
                >
                  Create Room
                </button>
              )}
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateRoom;
