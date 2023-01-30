import {
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
    Heading,
    Icon,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Controller, useFieldArray } from 'react-hook-form';
import { AiOutlineClose, AiOutlineDelete } from 'react-icons/ai';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton
} from '@chakra-ui/react';
import { toast } from 'react-toastify';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { GrFormAdd } from 'react-icons/gr';
const CArrayChildFields = ({
    control,
    data,
    renderComponents,
    parentName,
    setItemData,
    itemData,
    watch
}) => {
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: `${parentName}.${data.name}` // unique name for your Field Array
    });
    const watchParent = watch(`${parentName}`);
    const watchData = watch(`${parentName}.${data.name}`);

    const [items, setItems] = useState(fields);

    console.log(watchParent, fields, items, 'watchParent');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();

    return (
        <Flex className="test" direction="column" align="flex-end" h="100%" w="100%">
            <Flex
                className="test"
                direction="column"
                // align="flex-end"
                h={'50vh'}
                w="90%"
                hidden={!isOpen}
                bg="white"
                zIndex={100000}
                position="absolute"
                boxShadow="2xl"
                borderWidth="1px"
                rounded="xl"
                left="50%"
                transform="translate(-50%, -50%)"
                p="7">
                <Flex justify="space-between" align="center">
                    <Heading size="md">Batches</Heading>
                    <Button onClick={() => onClose()}>
                        <Icon as={AiOutlineClose} />
                    </Button>
                </Flex>
                <Flex
                    bg="white"
                    direction="column"
                    // align="flex-end"
                    h="40vh"
                    overflowY="scroll"
                    mt="5">
                    {items?.map((fieldData, fieldIndex) => {
                        return (
                            <Flex align="flex-end">
                                {data.values?.map((multiData, multiIndex) => {
                                    console.log(multiData, 'fieldData');
                                    if (
                                        multiData?.name == 'expiryDate' &&
                                        itemData?.trackExpiry == false
                                    )
                                        return <Box width="0"></Box>;
                                    else
                                        return (
                                            <Box key={multiIndex} mr="3">
                                                {renderComponents(
                                                    {
                                                        ...multiData,
                                                        name: `${parentName}.${data.name}.${fieldIndex}.${multiData.name}`,
                                                        defaultValues: fieldData[multiData.name]
                                                    },
                                                    multiIndex,
                                                    setItemData,
                                                    fieldIndex
                                                )}
                                            </Box>
                                        );
                                })}
                                <Flex justify="flex-end">
                                    <Button
                                        isDisabled={items?.length <= 1 || data?.disable}
                                        variant="unstyled"
                                        onClick={() => {
                                            const dataItems = items;
                                            dataItems.splice(fieldIndex, 1);
                                            setItems([...dataItems]);
                                        }}>
                                        <Icon as={AiOutlineDelete} color="red" w={7} h={7} />
                                    </Button>
                                    {!data?.disable && (
                                        <Flex justify="flex-end" w="100%" w={7} h={7}>
                                            <Button
                                                ml="3"
                                                // w="150px"
                                                variant="unstyled"
                                                onClick={() => {
                                                    if (items.length - 1 == fieldIndex) {
                                                        const dataItems = items;
                                                        dataItems.push(data.addData);
                                                        setItems([...dataItems]);
                                                    }
                                                }}>
                                                {items.length - 1 == fieldIndex && (
                                                    <Icon as={GrFormAdd} />
                                                )}
                                                {/* Add {data.name} */}
                                            </Button>
                                        </Flex>
                                    )}
                                </Flex>
                            </Flex>
                        );
                    })}
                </Flex>
            </Flex>
            {isOpen && <div id="overlay" />}
            {!data?.disable && (
                <Flex justify="center" align="flex-end" w="100%" h="100%">
                    <Button
                        ref={btnRef}
                        variant="unstyled"
                        onClick={() => {
                            onOpen();
                            if (items.length == 0) {
                                const dataItems = items;
                                dataItems.push(data.addData);
                                setItems([...dataItems]);
                            }
                        }}>
                        <Icon as={BsThreeDotsVertical} />
                    </Button>
                </Flex>
            )}
        </Flex>
    );
  
};

export default CArrayChildFields;
