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

const DetailsModal = ({ item, detailsModal, setDetailsModal }) => {
  return (
    <Modal
      isCentered
      isOpen={detailsModal}
      onClose={() => setDetailsModal(false)}
      size='3xl'>
      <CModalOverlay />
      <ModalContent>
        <ModalHeader>System Log Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <TableContainer>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>Action</Th>
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
                  <Td>{item?.action}</Td>
                  <Td>{item?.user?.name}</Td>
                  <Td>{item?.user?.email}</Td>
                  <Td>{item?.user?.role}</Td>
                  <Td>{item?.user?.pricing}</Td>
                  <Td>{item?.user?.status}</Td>
                  <Td>{item?.user?.taxID}</Td>
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

export default DetailsModal;
