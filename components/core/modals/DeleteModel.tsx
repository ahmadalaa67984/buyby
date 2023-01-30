import React from "react";
import {
  Button,
  Text,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import CModalOverlay from "../overlay/ModalOverlay";

const DeleteModel = ({ name, deleteModal, setDeleteModal, onSubmit }) => {
  return (
    <Modal
      isCentered
      isOpen={deleteModal}
      onClose={() => setDeleteModal(false)}>
      <CModalOverlay />
      <ModalContent>
        <ModalHeader>Delete {name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Are you sure you want to delete this item?</Text>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setDeleteModal(false)}>Close</Button>
          <Button onClick={onSubmit} colorScheme='red' ml='5'>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteModel;
