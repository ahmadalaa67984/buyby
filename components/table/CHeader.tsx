import React, { useEffect, useState } from "react";
import { AddIcon, ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { RiBookmark3Fill, RiFilterFill } from "react-icons/ri";
import { IoFilter, IoOptionsOutline, IoQrCode } from "react-icons/io5";

import { connect } from "react-redux";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuOptionGroup,
  MenuItemOption,
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/react";

import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  Spacer,
  InputLeftElement,
  Text,
  Icon,
} from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";
import { HiPencil } from "react-icons/hi";
import { MdFileDownload } from "react-icons/md";
import { GoMegaphone } from "react-icons/go";
// import MultiQrCode from "../qr/MultiQrCode";
import useTranslation from "../../assets/lang";
// import { pushQuery } from "utils";
import { RootState } from "services/combinedReducers";
import { BiArrowBack } from "react-icons/bi";
import { pushQuery } from "@/utils";

const CHeader = ({
  globalFilter,
  setGlobalFilter,
  Data,
  Title,
  subTitle,
  btnTitle,
  placeHolder,
  noFilter,
  noSearchBar,
  filterList,
  searchFn,
  selectedData,
  filterLength,
  children,
  // none branch warehouse
  filterType = "branch",
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [value, setValue] = useState("");

  useEffect(() => {
    const timeId = setTimeout(() => {
      if (value !== null) {
        pushQuery(router, { search: value });
        dispatch(searchFn({ searchTerm: value }));
      }
    }, 500);

    return () => clearTimeout(timeId);
  }, [value]);
  const onChange = (value: string) => {};
  // const { Translate } = useTranslation();
  // const tabelHeader = Translate('components').table_header;
  // const profileData = useSelector((state: RootState) => state.user.data);

  return (
    <Flex alignItems={"center"}>
      <Box>
        <Heading
          as='h1'
          lineHeight='1.3'
          color='blue.500'
          textAlign='left'
          isTruncated
          size='lg'>
          {Title}
        </Heading>
        <Text color='gray.500'>{subTitle}</Text>
      </Box>
      <Spacer />
      <Flex justifyContent={"center"} alignItems='center' gridGap={2}>
        <Flex justifyContent={"center"} alignItems='center' gridGap={2}>
          {noSearchBar ? (
            ""
          ) : (
            <Box>
              <InputGroup
                bg='white'
                style={{
                  borderRadius: "10px",
                  width: "270px",
                  height: "50px",
                }}>
                <InputLeftElement
                  pointerEvents='none'
                  h={50}
                  style={{ color: "gray" }}>
                  <AiOutlineSearch size={20} />
                </InputLeftElement>
                <Input
                  h='50px'
                  paddingTop={25}
                  paddingBottom={25}
                  type='tel'
                  placeholder={placeHolder}
                  onChange={(e) => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                  }}
                  color='black'
                  maxLength={255}
                  //   isLoading={true}
                />
              </InputGroup>
            </Box>
          )}

          <Flex justifyContent={"center"} alignItems='center' gridGap={2}>
            {filterType == "branch" && (
              <Menu>
                <MenuButton
                  bg='#fff'
                  color='primary'
                  as={Button}
                  paddingTop={25}
                  paddingBottom={25}
                  fontWeight='medium'>
                  <Flex alignItems={"center"} justifyContent='center'>
                    <Icon
                      as={IoOptionsOutline}
                      fontSize='22px'
                      color='27AAE1'
                      marginRight='3'
                    />
                    {/* {tabelHeader['branch']} */}
                    Branch
                  </Flex>
                </MenuButton>
                <MenuList p={0}>
                  <MenuOptionGroup
                    type='radio'
                    defaultValue={
                      // profileData?.branch?.find(
                      //     (branch) => branch._id == router?.query?.branchId
                      // )?._id
                      ""
                    }
                    defaultChecked={
                      // profileData?.branch?.find(
                      //     (branch) => branch._id == router?.query?.branchId
                      // )?._id
                      false
                    }
                    onChange={(e) => {
                      //   pushQuery(router, { branchId: e });
                    }}>
                    <MenuItemOption
                      value={""}
                      p={4}
                      //   size='lg'
                      style={{
                        display: "flex",
                      }}
                      bg={!router?.query?.branchId ? "gray.100" : "white"}>
                      {/* {tabelHeader['all']} */}
                      All
                    </MenuItemOption>
                  </MenuOptionGroup>
                </MenuList>
              </Menu>
            )}
            {filterType == "warehouse" && (
              <Menu>
                <MenuButton
                  bg='#fff'
                  color='primary'
                  as={Button}
                  fontWeight='medium'>
                  <Flex align='center'>
                    <Icon
                      as={IoOptionsOutline}
                      fontSize='22px'
                      color='27AAE1'
                      marginRight='3'
                    />
                    {/* {tabelHeader['warehouse']} */}
                    warehouse
                  </Flex>
                </MenuButton>
                <MenuList p={0}>
                  <MenuOptionGroup
                    type='radio'
                    defaultValue={
                      // profileData?.warehouse?.find(
                      //   (warehouse) =>
                      //     warehouse._id == router?.query?.warehouseId
                      // )?._id
                      ""
                    }
                    defaultChecked={
                      // profileData?.warehouse?.find(
                      //   (warehouse) =>
                      //     warehouse._id == router?.query?.warehouseId
                      // )?._id
                      true
                    }
                    onChange={(e) => {
                      //   pushQuery(router, { warehouseId: e });
                    }}>
                    <MenuItemOption
                      value={""}
                      p={4}
                      //   size='lg'
                      bg={!router?.query?.warehouseId ? "gray.100" : "white"}>
                      {/* {tabelHeader["all"]} */}
                      All
                    </MenuItemOption>
                    {/* {profileData?.warehouse?.map((warehouse) => {
                        return (
                          <MenuItemOption
                            p={4}
                            colorScheme='primaryColorScheme'
                            size='lg'
                            value={warehouse?._id}
                            bg={
                              warehouse?._id == router?.query?.warehouseId
                                ? "gray.100"
                                : "white"
                            }>
                            {warehouse?.name}
                          </MenuItemOption>
                        );
                      })} */}
                  </MenuOptionGroup>
                </MenuList>
              </Menu>
            )}
            {noFilter ? (
              ""
            ) : (
              <Menu closeOnSelect={false}>
                <MenuButton
                  bg='#fff'
                  color='primary'
                  as={Button}
                  mr={2}
                  h={50}
                  paddingTop={25}
                  paddingBottom={25}
                  fontWeight='medium'>
                  <Flex align='center'>
                    <Icon
                      as={IoOptionsOutline}
                      fontSize='22px'
                      color='27AAE1'
                      marginRight='3'
                    />
                    {filterLength == 0 ? "Filter" : `Filter | ${filterLength}`}{" "}
                  </Flex>
                </MenuButton>
                <MenuList color='black' p={0}>
                  <>{filterList}</>
                </MenuList>
              </Menu>
            )}
          </Flex>
        </Flex>
      </Flex>
      {children}
    </Flex>
  );
};

export default CHeader;
