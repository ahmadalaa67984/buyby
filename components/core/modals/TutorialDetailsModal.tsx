import React from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import CModalOverlay from "../overlay/ModalOverlay";

const TutorialDetailsModal = ({ item, detailsModal, setDetailsModal }) => {
  return (
    <Modal
      isCentered
      isOpen={detailsModal}
      onClose={() => setDetailsModal(false)}
      size='3xl'>
      <CModalOverlay />
      <ModalContent>
        <ModalHeader>Tutorial Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <TableContainer>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>Title</Th>
                  <Th>Body</Th>
                  <Th>Image URL</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>{item?.tutorialData?.title}</Td>
                  <Td>{item?.tutorialData?.body}</Td>
                  <Td color='blue.500'>
                    {item?.tutorialData?.imageUrl ? (
                      <a
                        href={item?.tutorialData?.imageUrl}
                        target='_blank'
                        rel='noopener noreferrer'>
                        Got to image
                      </a>
                    ) : (
                      "No image provided"
                    )}
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setDetailsModal(false)}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TutorialDetailsModal;
