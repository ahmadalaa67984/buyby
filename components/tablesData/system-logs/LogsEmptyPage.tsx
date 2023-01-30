import { drawerActionToggle } from "@/modules/drawer/Actions";
import { Button, Container, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { IoIosAdd } from "react-icons/io";
import { useDispatch } from "react-redux";

const LogsEmptyPage = () => {
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
          System Logs Management
        </Heading>
      </Flex>

      <Container centerContent>
        <Flex
          w='100%'
          maxW='30rem'
          style={{ textAlign: "center" }}
          align='center'
          justify='center'
          direction='column'>
          <img
            src='/images/brand.png'
            style={{
              objectFit: "cover",
            }}
          />
          <Heading as='h2' size='xl' isTruncated mt={5} mb={2} color='black'>
            System logs is empty
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

export default LogsEmptyPage;
