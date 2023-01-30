import { Box, Button, Flex, Grid, GridItem, Heading, Icon } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Controller, useFieldArray } from 'react-hook-form';
import { AiOutlineDelete } from 'react-icons/ai';
import { GrFormAdd } from 'react-icons/gr';
import { toast } from 'react-toastify';
import CArrayChildFields from './CArrayChildFields';

const CArrayFields = ({ control, data, renderComponents, watch }) => {
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: data.name // unique name for your Field Array
    });

    const [items, setItems] = useState(fields);
    const [itemData, setItemData] = useState({});

    console.log(itemData, 'itemDataitemData');
    return (
        <Flex align="center">
            <Flex direction="column">
                {items?.map((fieldData, fieldIndex) => {
                    return (
                        <Flex align="flex-end">
                            <Flex key={fieldIndex} w="100%" align="center">
                                {data.values?.map((multiData, multiIndex) => {
                                    if (
                                        multiData.key == 'array' &&
                                        (itemData?.trackExpiry || itemData?.trackBatches)
                                    )
                                        return (
                                            <Box colSpan={1} key={multiIndex} h="90px">
                                                {/* <Heading
                                                    color="black"
                                                    mb={4}
                                                    mt="4"
                                                    as="h1"
                                                    size="sm">
                                                    {multiData.title}
                                                </Heading> */}
                                                <CArrayChildFields
                                                    watch={watch}
                                                    itemData={itemData}
                                                    data={multiData}
                                                    control={control}
                                                    renderComponents={renderComponents}
                                                    parentName={`${data.name}.${fieldIndex}`}
                                                    setItemData={setItemData}
                                                />
                                            </Box>
                                        );

                                    return (
                                        <Box key={multiIndex} mr="3" colSpan={1}>
                                            {renderComponents(
                                                {
                                                    ...multiData,
                                                    name: `${data.name}.${fieldIndex}.${multiData.name}`,
                                                    defaultValues: fieldData[multiData.name]
                                                },
                                                multiIndex,
                                                setItemData,
                                                fieldIndex
                                            )}
                                        </Box>
                                    );
                                })}
                            </Flex>
                            <Flex>
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
                                {!data?.disable && items.length - 1 == fieldIndex && (
                                    <Flex justify="flex-end" w="100%" w={7} h={7}>
                                        <Button
                                            ml="3"
                                            // w="150px"
                                            variant="unstyled"
                                            onClick={() => {
                                                if (data.name == 'items' && !watch('warehouseId')) {
                                                    toast.error('please select warehouse first');
                                                    return;
                                                }
                                                const dataItems = items;
                                                dataItems.push(data.addData);
                                                setItems([...dataItems]);
                                            }}>
                                            <Icon as={GrFormAdd} />
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
    );
};

export default CArrayFields;
