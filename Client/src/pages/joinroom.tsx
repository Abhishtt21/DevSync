import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useUserStore} from '../store'

const JoinRoom: React.FC = () => {
  const Navigate = useNavigate()
  const { username, roomID } = useUserStore();
  const [roomId,setRoomId] = useState<string>("")
  useEffect(()=>{
    if(username==''){
        Navigate("/auth")
    }
    if(roomID!="") setRoomId(roomID)
  })
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    Navigate(`/room/${roomId}`)
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-800">
  <div className="w-full max-w-xs bg-white shadow-lg rounded-lg p-6">
    <h2 className="text-4xl font-bold text-blue-600 mb-6 text-center">Join Room</h2>
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <input
        type="text"
        placeholder="Room ID"
        className="bg-gray-200 text-gray-800 border-b-2 border-orange-400 rounded mb-4 px-4 py-2 focus:outline-none focus:border-orange-500 w-full"
        value={roomId}
        onChange={(e) => { setRoomId(e.target.value); }}
      />
      <button
        type="submit"
        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded w-full transition duration-200 ease-in-out"
      >
        Join Room
      </button>
    </form>
    <p className="mt-6 text-blue-600 text-center">
      Don't have a room?{' '}
      <button
        onClick={() => { Navigate("/create"); }}
        className="text-orange-500 hover:text-orange-400 font-medium focus:outline-none"
      >
        Create Room
      </button>
    </p>
  </div>
</div>

  );
};

export default JoinRoom;
