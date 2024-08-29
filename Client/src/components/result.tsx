import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text
} from '@chakra-ui/react';

interface ResultMessage {
  Title: string;
  stdout: string;
  stderr: string | null;
  status: string;
  compile_output: string | null;
}

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  resultMessage: ResultMessage;
}

const ResultModal: React.FC<ResultModalProps> = ({ isOpen, onClose, resultMessage }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent bg="bg-gray-800" color="text-gray-800">
      <ModalHeader bg="bg-orange-500" color="text-gray-800">
        {resultMessage.Title}
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Text><strong>Status:</strong> {resultMessage.status}</Text>
        <Text><strong>Output:</strong> {resultMessage.stdout}</Text>
        {resultMessage.compile_output && <Text><strong>Compile Output:</strong> {resultMessage.compile_output}</Text>}
        {resultMessage.stderr && <Text><strong>Error:</strong> {resultMessage.stderr}</Text>}
      </ModalBody>
      <ModalFooter>
        <Button bg="bg-orange-500" color="text-gray-800" _hover={{ bg: "border-orange-400" }} mr={3} onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
  
  );
};

export default ResultModal;
