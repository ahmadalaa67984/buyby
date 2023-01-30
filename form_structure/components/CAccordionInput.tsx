import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  FormErrorMessage,
  FormControl,
  FormLabel,
  Checkbox,
  Grid,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Image,
  VStack,
  Flex,
  Text,
  Divider,
  Icon,
} from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
  Spacer,
} from "@chakra-ui/react";
import useTranslation from "../../assets/lang";
// import { getAllItemsRequest } from "../../modules/restaurant/item-management/Actions";
import { RootState } from "../../services/combinedReducers";
import { useDispatch, useSelector } from "react-redux";
import { IoSearchSharp } from "react-icons/io5";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { RiFilterFill } from "react-icons/ri";

const CAccordionInput = ({
  data,
  register,
  errors,
  setValue,
  disabled,
  setDisabled,

  setSelectedItems,
  selectedItems,
}) => {
  //   const items = useSelector((state: RootState) => state.items.items);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemdata, setData] = useState([]);
  const [filter, setFilter] = useState("All");
  //   const itemsCount = useSelector(
  //     (state: RootState) => state.items.numberOfItems
  //   );
  const [size, setSize] = useState(10);
  const [offset, setOffset] = useState(0);
  //   const isLoading = useSelector((state: RootState) => state.items.isLoading);

  const [itemsData, setItemsData] = useState([]);
  const [ids, setIds] = useState([]);
  const dispatch = useDispatch();
  const { Translate } = useTranslation();
  const accordionInput = Translate("components")?.forms?.accordion_input;

  useEffect(() => {
    if (itemsData.length > 0) setSelectedItems(itemsData);
  }, [itemsData]);

  useEffect(() => {
    // if (searchTerm)
    //   dispatch(getAllItemsRequest({ searchTerm: searchTerm, offest: 0, size }));
  }, [searchTerm]);

  useEffect(() => {
    if (selectedItems) setItemsData(selectedItems);
  }, [selectedItems]);

  //   useEffect(() => {
  //     if (items) {
  //       setData([]);
  //       items?.forEach((item, index) => {
  //         if (
  //           !itemsData.find((data) => {
  //             return data._id === item._id;
  //           })
  //         ) {
  //           setData((old) => [...old, item]);
  //         }
  //       });
  //     }
  //   }, [items]);

  const loadMore = () => {
    // dispatch(getAllItemsRequest({ offset, size: size + 10 }));
    setSize(size + 10);
  };

  const removeId = (id) => {
    const newArray = itemsData.filter((x) => {
      return x._id != id;
    });
    setItemsData(newArray);
    const newIds = ids.filter((x) => {
      return x !== id;
    });
    setIds(newIds);
  };

  const removeItemFromArray = (id) => {
    const newArray = itemdata.filter((x) => {
      return x._id != id;
    });
    setData(newArray);
  };
  //   useEffect(() => {
  //     if (filter)
  //       dispatch(
  //         getAllItemsRequest({
  //           filterBy: [{ categoryLevel1: filter }],
  //           offset,
  //           size,
  //         })
  //       );
  //     if (filter === "All") dispatch(getAllItemsRequest({ offset, size }));
  //   }, [filter]);

  return (
    <FormControl overflow='hidden'>
      {/* <FormLabel color='#777777'>{Translate(data.label)}</FormLabel> */}
      <Accordion
        allowToggle
        bg='white'
        // opacity="0.5"
        color='black'
        // variant="outline"
        type={data.type}
        min='0'
        name={data.name}
        placeholder={data.placeholder}
        letterSpacing='2'
        maxLength={50}
        mt='4'>
        <AccordionItem border='none' isDisabled={disabled}>
          <h2>
            <AccordionButton border='1px solid gray' borderRadius='5px'>
              <Box flex='1' textAlign='left'>
                {itemsData.length > 0 && disabled === false
                  ? `${accordionInput["Selected Items"]} (${itemsData.length})`
                  : `${accordionInput["Select Items"]}`}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel
            pb={4}
            border='1px solid gray'
            borderTop='none'
            borderRadius='5px'>
            <Flex>
              <Box mt='4' flex='0.80'>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    top='17px'
                    children={<IoSearchSharp style={{ top: "17px" }} />}
                  />
                  <Input
                    width='100%'
                    h='44px'
                    bg='white'
                    color='black'
                    variant='outline'
                    type='text'
                    min='0'
                    my='4'
                    placeholder='Search Item name'
                    letterSpacing='2'
                    maxLength={50}
                    id='search'
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </Box>
              <Spacer />
              <Box
                mt='10'
                mr='4'
                style={{ position: "relative" }}
                bg='white'
                borderRadius='8px'>
                <Menu closeOnSelect={false}>
                  {({ isOpen }) => (
                    <>
                      <Icon
                        as={RiFilterFill}
                        style={{
                          position: "absolute",
                          fontSize: "22px",
                          color: "primary",
                          marginTop: "8px",
                          marginLeft: "8px",
                        }}
                      />
                      <MenuButton
                        bg='white'
                        color='primary'
                        pl='8'
                        pr='2'
                        py={2}
                        transition='all 0.2s'
                        borderRadius='md'
                        borderWidth='1px'>
                        {accordionInput["Filter"]}
                        {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                      </MenuButton>
                      <MenuList
                        color='black'
                        // pb="10px"
                        h='450px'
                        overflowY='scroll'>
                        <MenuOptionGroup
                          // mb="10px"
                          type='radio'
                          value={filter}
                          onChange={(e) => setFilter(e)}>
                          <MenuItemOption value='All'>
                            {accordionInput["All"]}
                          </MenuItemOption>
                          <MenuDivider />
                          <MenuItemOption value='Other'>
                            {accordionInput["Other"]}
                          </MenuItemOption>
                          <MenuDivider />
                          <MenuItemOption value='Breads and Pastries'>
                            {accordionInput["Breads_and_Pastries"]}
                          </MenuItemOption>
                          <MenuDivider />
                          <MenuItemOption value='Appetizers'>
                            {accordionInput["Appetizers"]}
                          </MenuItemOption>
                          <MenuDivider />
                          <MenuItemOption value='Starters'>
                            {accordionInput["Starters"]}
                          </MenuItemOption>
                          <MenuDivider />

                          <MenuItemOption value='Mains'>
                            {accordionInput["Mains"]}
                          </MenuItemOption>
                          <MenuDivider />
                          <MenuItemOption value='Sauces'>
                            {accordionInput["Sauces"]}
                          </MenuItemOption>
                          <MenuDivider />

                          <MenuItemOption value='Sides'>
                            {accordionInput["Sides"]}
                          </MenuItemOption>
                          <MenuDivider />

                          <MenuItemOption value='Cheeses'>
                            {accordionInput["Cheeses"]}
                          </MenuItemOption>
                          <MenuDivider />

                          <MenuItemOption value='Desserts'>
                            {accordionInput["Desserts"]}
                          </MenuItemOption>
                          <MenuDivider />

                          <MenuItemOption value='Drinks'>
                            {accordionInput["Drinks"]}
                          </MenuItemOption>
                          <Box h='50px'></Box>
                        </MenuOptionGroup>
                      </MenuList>
                    </>
                  )}
                </Menu>
              </Box>
            </Flex>

            <Box>
              <Grid templateColumns='repeat(2, 1fr)' gap={6} mt='6'>
                {itemsData && itemsData.length > 0
                  ? itemsData?.map((item, index) => {
                      return (
                        <Box w='100%' h='10' mt='6' key={index}>
                          <Checkbox
                            isChecked={true}
                            onChange={(e) => {
                              if (e.target.checked === false) {
                                setData((arr) => [...arr, item]);
                                removeId(item._id);
                              }
                            }}>
                            <Flex>
                              <Image
                                borderRadius='10px'
                                boxSize='50px'
                                mr='2'
                                objectFit='cover'
                                loading='eager'
                                bg='#DDD'
                                src={item.picture}
                              />
                              <VStack spacing={2} align='stretch'>
                                <Box>
                                  <Text>{item?.name?.mainLanguage}</Text>
                                </Box>
                                <Box>
                                  <Text>{item.ID}</Text>
                                </Box>
                              </VStack>
                            </Flex>
                          </Checkbox>
                        </Box>
                      );
                    })
                  : ""}
              </Grid>
            </Box>
            {itemsData && itemsData.length > 0 ? (
              <Divider orientation='horizontal' mt='10' />
            ) : (
              ""
            )}

            <Box h='400px' overflowY='scroll'>
              {/* <input
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={handleChange}
                        /> */}
              <Grid templateColumns='repeat(2, 1fr)' gap={6} mt='6'>
                {itemdata && itemdata.length > 0
                  ? itemdata?.map((item, index) => {
                      return (
                        <Box w='100%' h='10' mt='6' key={index}>
                          <Checkbox
                            isChecked={false}
                            name={`items[${item.value}]`}
                            ref={register}
                            onChange={(e) => {
                              if (e.target.checked === true) {
                                setItemsData((arr) => [...arr, item]);
                                removeItemFromArray(item._id);
                                setIds((arr) => [...arr, item._id]);
                              }
                              if (e.target.checked === false) {
                                removeId(item._id);
                              }
                            }}>
                            <Flex>
                              <Image
                                borderRadius='10px'
                                boxSize='50px'
                                mr='2'
                                objectFit='cover'
                                loading='eager'
                                bg='#DDD'
                                src={item.picture}
                              />
                              <VStack spacing={0} align='stretch'>
                                <Box>
                                  <Text>{item.name?.mainLanguage}</Text>
                                </Box>
                                <Box>
                                  <Text>{item.ID}</Text>
                                </Box>
                              </VStack>
                            </Flex>
                          </Checkbox>
                        </Box>
                      );
                    })
                  : ""}
              </Grid>
              {/* {itemsCount <= size ? (
                ""
              ) : (
                <Button
                  isLoading={isLoading}
                  colorScheme='blue'
                  variant='outline'
                  onClick={loadMore}
                  m='30px auto'
                  display='flex'>
                  {accordionInput["Load_More"]}
                </Button>
              )} */}
            </Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </FormControl>
  );
};

export default CAccordionInput;
