import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import toast from 'react-hot-toast';

interface MembersProps {
  users: string[];
  roomId: string;
  onLeave: () => void;
}

const Members: React.FC<MembersProps> = ({ users, roomId, onLeave }) => {
  const copyRoomIdToClipboard = () => {
    navigator.clipboard.writeText(roomId);
    toast.success('Room ID copied to clipboard!');
  };

  return (
    <Box display="flex" flexDirection="column" height="100%">
    <Box
      display="flex"
      flex="1"
      flexDirection="column"
      overflowY="auto"
      justifyContent="top"
      alignItems="center"
      gap="10px"
      css={{
        "&::-webkit-scrollbar": {
          display: "none"
        },
        "-ms-overflow-style": "none",
        scrollbarWidth: "none"
      }}
    >
      {users.map((user, index) => (
        <Box
          className="p-2 w-fit px-4 border rounded-sm"
          borderColor="border-orange-400"
          bg="bg-gray-800"
          color="text-gray-800"
          key={index}
        >
          {user}
        </Box>
      ))}
    </Box>
    <Box display="flex" flexDirection="column" gap="3" p="4" bg="bg-orange-500">
      <Button onClick={copyRoomIdToClipboard} bg="bg-orange-500" color="text-gray-800" _hover={{ bg: "border-orange-400" }}>
        Copy Room ID
      </Button>
      <Button onClick={onLeave} bg="bg-red-500" color="text-gray-800" _hover={{ bg: "border-red-400" }}>
        Leave Room
      </Button>
    </Box>
  </Box>
  
  );
};

export default Members;
