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

const UserNotificationsModal = ({
  userNotifications,
  userNotificationsModal,
  setUserNotificationsModal,
}) => {
  console.log({ userNotifications });
  return (
    <Modal
      isCentered
      isOpen={userNotificationsModal}
      onClose={() => setUserNotificationsModal(false)}
      size='3xl'>
      <CModalOverlay />
      <ModalContent>
        <ModalHeader>User Notifications</ModalHeader>
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
                  <Td>test</Td>
                  {userNotifications?.length}
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setUserNotificationsModal(false)}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserNotificationsModal;
