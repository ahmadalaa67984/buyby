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

const NotificationDetailsModal = ({ item, detailsModal, setDetailsModal }) => {
  return (
    <Modal
      isCentered
      isOpen={detailsModal}
      onClose={() => setDetailsModal(false)}
      size='3xl'>
      <CModalOverlay />
      <ModalContent>
        <ModalHeader>Notification Details</ModalHeader>
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
                  <Td>{item?.notificationData?.title}</Td>
                  <Td>{item?.notificationData?.body}</Td>
                  <Td color='blue.500'>
                    <a href={item?.notificationData?.imageUrl} target='_blank'>
                      Got to image
                    </a>
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

export default NotificationDetailsModal;
