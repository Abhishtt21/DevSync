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
  <ModalContent bg="gray.800" color="gray.200">
    <ModalHeader bg="orange.500" color="gray.100" fontWeight="bold" textAlign="center">
      {resultMessage.Title}
    </ModalHeader>
    <ModalCloseButton color="gray.100" />
    <ModalBody>
      <Text mb={3}>
        <strong>Status:</strong> {resultMessage.status}
      </Text>
      <Text mb={3}>
        <strong>Output:</strong> {resultMessage.stdout}
      </Text>
      {resultMessage.compile_output && (
        <Text mb={3}>
          <strong>Compile Output:</strong> {resultMessage.compile_output}
        </Text>
      )}
      {resultMessage.stderr && (
        <Text mb={3}>
          <strong>Error:</strong> {resultMessage.stderr}
        </Text>
      )}
    </ModalBody>
    <ModalFooter>
      <Button
        bg="orange.500"
        color="gray.100"
        _hover={{ bg: "orange.600" }}
        _focus={{ outline: 'none', bg: "orange.600" }}
        mr={3}
        onClick={onClose}
      >
        Close
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>

  
  );
};

export default ResultModal;
