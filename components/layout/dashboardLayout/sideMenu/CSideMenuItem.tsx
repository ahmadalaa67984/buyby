import {
  Box,
  Button,
  Collapse,
  Fade,
  Flex,
  Icon,
  Image,
  List,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BiBorderBottom, BiHomeCircle } from "react-icons/bi";
import { MdKeyboardArrowRight } from "react-icons/md";

interface MenuProps {
  icon: any;
  name: string;
  link: string;
  count: number;
  active: boolean;
}
interface Props extends MenuProps {
  sideActive: boolean;
  subMenu: MenuProps[];
  active: boolean;
}
const CSideMenuItem = ({
  sideActive,
  icon,
  name,
  link,
  count,
  subMenu,
  active,
}: Props) => {
  const [subActive, setSubActive] = useState(active);
  const router = useRouter();
  const renderMenuItem = (name, count, icon, subMenu, active, link) => {
    return (
      <Button
        key={name}
        title={name}
        h='7vh'
        w='100%'
        bg={active ? "gray.50" : "transparent"}
        position='relative'
        borderRadius='none'
        mt={subMenu?.length ? 0 : 3}
        borderBottom={
          (subMenu?.length || name === "Dashboard") && !active
            ? "1px solid rgba(0, 0, 0, .05)"
            : "none"
        }
        onClick={() => {
          if (link) {
            router.push(link);
          } else {
            setSubActive(!subActive);
          }
        }}>
        <Flex
          justify=''
          align='center'
          color='gray.600'
          w='100%'
          textAlign='left'
          position='relative'>
          {/* <Image
            objectFit='cover'
            src={icon}
            alt={name}
            mr='3'
            style={{ filter: active ? "grayscale(0)" : "grayscale(100%)" }}
          /> */}
          {sideActive && (
            <Text
              className='text-truncate'
              color={active ? "var(--chakra-colors-primary)" : "inherit"}>
              {name}
            </Text>
          )}
          {count != -1 && (
            <Text color='primary' mb='4'>
              {count}
            </Text>
          )}
        </Flex>
        {/* {active && (
                    <Box height="100%" width="0.4vw" bg="primary" position="absolute" left="0" />
                )} */}
        {/* {subMenu?.length > 0 && (
                    <Flex position="absolute" right="0" bottom="4">
                        <Icon
                            as={MdKeyboardArrowRight}
                            w={6}
                            h={6}
                            fontWeight="bold"
                            color="gray.500"
                            borderRadius="50%"
                        />
                    </Flex>
                )} */}
      </Button>
    );
  };
  return (
    <>
      {renderMenuItem(name, count, icon, subMenu, active, link)}
      <Collapse in={subActive} animateOpacity>
        <List>
          {subMenu?.map((data: MenuProps) => (
            <Flex justify='center'>
              <Box width='90%'>
                {renderMenuItem(
                  data.name,
                  data.count,
                  data.icon,
                  data.subMenu,
                  data.active,
                  data.link
                )}
              </Box>
            </Flex>
          ))}
        </List>
      </Collapse>
      {/* <Flex flexDirection="column" align="center" transition="all 0.5s"></Flex> */}
    </>
  );
};

export default CSideMenuItem;
