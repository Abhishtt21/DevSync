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
      justifyContent="flex-start" // Align items from the top
      alignItems="center"
      gap="10px"
      p={4} // Padding for better spacing
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
          borderColor="orange.400" // Matched with the theme color
          bg="gray.800"
          color="gray.200" // Lighter color for text
          key={index}
          fontSize="lg" // Slightly larger font for readability
          fontWeight="medium" // Medium font weight for better emphasis
        >
          {user}
        </Box>
      ))}
    </Box>
  
    <Box display="flex" flexDirection="column" gap={3} p={4} bg="orange.500">
      <Button
        onClick={copyRoomIdToClipboard}
        bg="orange.500"
        color="gray.100"
        _hover={{ bg: "orange.600" }} // Smooth hover transition
        fontWeight="bold"
        size="lg"
        mb={2}
      >
        Copy Room ID
      </Button>
      <Button
        onClick={onLeave}
        bg="red.500"
        color="gray.100"
        _hover={{ bg: "red.600" }}
        fontWeight="bold"
        size="lg"
      >
        Leave Room
      </Button>
    </Box>
  </Box>
  
  );
};

export default Members;
