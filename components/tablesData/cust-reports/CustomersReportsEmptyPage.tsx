import { drawerActionToggle } from "@/modules/drawer/Actions";
import { Button, Container, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import Image from "next/image";
import { IoIosAdd } from "react-icons/io";
import { useDispatch } from "react-redux";

const CustomersReportsEmptyPage = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Flex my='7' mx='10' justify='space-between' align='center'>
        <Heading
          as='h1'
          lineHeight='1.3'
          color='blue.500'
          textAlign='left'
          isTruncated
          size='lg'>
          Customers Reports Management
        </Heading>
        {/* <Button
          bg='var(--chakra-colors-primary)'
          color='white'
          onClick={() =>
            dispatch(drawerActionToggle(true, "New", "customers"))
          }>
          <Icon as={IoIosAdd} color='white' w={6} h={6} mr='2' />
          Create Customer
        </Button> */}
      </Flex>

      <Container centerContent>
        <Flex
          w='100%'
          maxW='30rem'
          style={{ textAlign: "center" }}
          align='center'
          justify='center'
          direction='column'>
          <Image src='/images/brand.png' alt='' width={200} height={200} />
          <Heading as='h2' size='xl' isTruncated mt={5} mb={2} color='black'>
            Customers Reports Management is empty
          </Heading>
          <Text color='black' fontSize='xl' mb='20px'>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </Text>
        </Flex>
      </Container>
    </>
  );
};

export default CustomersReportsEmptyPage;
