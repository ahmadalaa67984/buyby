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
  TableContainer,
  Table,
  Thead,
  Tbody,
  Divider,
  Box,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import CModalOverlay from "../overlay/ModalOverlay";

const BusinessAccountModal = ({ item, detailsModal, setDetailsModal }) => {
  return (
    <Modal
      isCentered
      isOpen={detailsModal}
      onClose={() => setDetailsModal(false)}
      size='3xl'>
      <CModalOverlay />
      <ModalContent>
        <ModalHeader>Account Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <TableContainer>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>Username</Th>
                  <Th>Email</Th>
                  <Th>Role</Th>
                  <Th>Pricing</Th>
                  <Th>Status</Th>
                  <Th>taxID</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>{item?.name}</Td>
                  <Td>{item?.email}</Td>
                  <Td>{item?.role}</Td>
                  <Td>{item?.pricing}</Td>
                  <Td>{item?.status}</Td>
                  <Td>{item?.taxID}</Td>
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

export default BusinessAccountModal;
