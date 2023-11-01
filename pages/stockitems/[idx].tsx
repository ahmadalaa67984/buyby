import CDashboardLayout from "@/components/layout/dashboardLayout/CDashboardLayout";
import CTable from "@/components/table/CTable";
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  IconButton,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { CgEyeAlt, CgTrash } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/services/combinedReducers";
import DeleteModel from "@/components/core/modals/DeleteModel";
import DetailsModal from "@/components/core/modals/DetailsModal";
import {
  deleteStockitemRequest,
  getAllStockitemRequest,
  getAllUserStockitemRequest,
  getStockitemRequest,
} from "@/modules/stockitems/Actions";
import { drawerActionToggle } from "@/modules/drawer/Actions";
import CreateButton from "@/components/core/buttons/CreateButton";
import axios from "axios";
import AdminAuth from "@/components/auth/AdminAuth";
import { AiOutlineEdit } from "react-icons/ai";
import { extractErrorMsgFromResponse } from "@/utils/apiHelpers";
import { pushQuery } from "@/utils";
import FormIndex from "@/components/forms/FormIndex";
import * as Yup from "yup";

const stockItemImageSchema = () => {
  return Yup.object().shape({
    picture: Yup.string().required("Mandatory Field"),
  });
};
const stockItemImageSturcture = () => {
  return [
    {
      key: "file",
      values: [
        {
          type: "file",
          kind: "file",
          name: "picture",
          label: "Image",
          key: "file",
          design: "inside",
        },
      ],
    },
  ];
};
const StockitemsPage = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [offset, setPage] = useState(0);
  const [size, setPerPage] = useState(30);
  const [pageNumber, setPageNumber] = useState(0);
  const [filterLength, setFilterLength] = useState(0);
  const [detailsModal, setDetailsModal] = useState(false);
  const [dir, setDir] = useState("desc");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [uploadModal, setUploadModal] = useState(false);
  const [userStockitemsModal, setUserStockitemsModal] = useState(false);
  const [sort, setSort] = useState("updatedAt");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selected, setSelected] = useState<any>();
  // Check if the tables have data before search
  const [isDataBefore, setIsDataBefore] = useState<boolean>(false);
  const [stockitems, setStockItems] = useState([]);
  const [numberOfStockItems, setNumberStockItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const refEditButton = useRef();

  const viewData = (data) => {
    setSelected(data);
  };

  const getItems = async (body) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `/stock-item-data/customer/search`,
        body
      );
      setStockItems([...stockitems, ...data?.content]);
      setNumberStockItems(data?.count);
    } catch (error) {
      extractErrorMsgFromResponse(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getItems({
      dir,
      endDate,
      offset,
      searchTerm: router.query.search,
      size,
      sort,
      startDate,
    });
  }, [dir, endDate, offset, router.query.search, size, sort, startDate]);

  console.log(offset, "numberOfStockItems");
  useEffect(() => {
    if (stockitems?.length > 0) setIsDataBefore(true);
  }, [stockitems]);

  const onSubmitDelete = () => {
    dispatch(deleteStockitemRequest(selected));
  };

  const handleDetails = () => {
    dispatch(getStockitemRequest(selected));
    setDetailsModal(!detailsModal);
  };

  const data = stockitems?.map((notify: any) => {
    return {
      ...notify,
      id: notify?._id,
      title: notify?.stockitemData?.title,
      body: notify?.stockitemData?.body,
      imageUrl: (
        <Box color='blue.500'>
          <a
            href={notify?.stockitemData?.imageUrl}
            target='_blank'
            rel='noopener noreferrer'>
            {notify?.stockitemData?.imageUrl}
          </a>
        </Box>
      ),
    };
  });

  const onSubmit = async (values: any) => {
    try {
      const idx = stockitems?.findIndex((stockitem) => {
        console.log(stockitem?._id, selected, "picture");
        return stockitem?._id == selected?._id;
      });
      console.log(values?.picture, idx, "picture");

      if (idx != -1) {
        let data = stockitems;
        data[idx].picture = values?.picture;
        console.log(data, values?.picture, "stockitems");

        setStockItems([...data]);
      }
      onClose();
      setIsLoading(true);
    } catch (error) {
      extractErrorMsgFromResponse(error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(stockitems, "stockitems");
  function checkURL(url: string) {
    return url?.match(/\.(jpeg|jpg|gif|png)$/) != null;
  }
  return (
    <AdminAuth>
      <CDashboardLayout title='Stockitems' description='Stockitems' count={""}>
        <Flex p='10' flexWrap='wrap'>
          {data
            ?.filter((item) => checkURL(item?.picture))
            ?.map((item) => {
              return (
                <Button
                  shadow='xl'
                  bg='white'
                  _hover={{ bg: "white" }}
                  title={`${item?.entityData[0]?.name} item#${item?.nameLocalized?.mainLanguage}`}
                  key={item?._id}
                  w='200px'
                  h='200px'
                  mr='5'
                  mt='5'
                  className='stock-container'
                  position='relative'>
                  <Image
                    w='100%'
                    h='100%'
                    rounded='xl'
                    src={item?.picture}
                    alt={item?.nameLocalized?.mainLanguage}
                    objectFit='contain'
                    className='stock-image'
                  />
                  <button
                    className='stock-middle'
                    onClick={() => {
                      setSelected(item);
                      onOpen();
                    }}>
                    <div className='stock-text'>Edit</div>
                  </button>
                </Button>
              );
            })}
        </Flex>
        {numberOfStockItems > stockitems?.length && (
          <Flex w='100%' justify='center' align='center' mb='20'>
            <Button
              isLoading={isLoading}
              bg='primary'
              _hover={{ bg: "primary" }}
              color='white'
              onClick={() => {
                console.log("ok", "numberOfStockItems");

                setPage(offset + 30);
              }}>
              Show More
            </Button>
          </Flex>
        )}
        {isOpen && (
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Modal Title</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormIndex
                  defaultValues={{
                    picture: selected?.picture,
                  }}
                  withoutUpload={false}
                  withoutTitles={false}
                  withoutCheckboxs={false}
                  withoutPassword={false}
                  title={null}
                  subTitle={null}
                  schema={stockItemImageSchema}
                  action={onSubmit}
                  structure={stockItemImageSturcture()}>
                  <Flex direction='column' mb='10'>
                    <Box mt='4' borderTop='1px solid #DDD'>
                      <Button
                        variant='primary'
                        color='white'
                        type='submit'
                        mt={4}
                        hidden={true}
                        ref={refEditButton}
                        isLoading={false}>
                        Save
                      </Button>
                    </Box>
                  </Flex>
                </FormIndex>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button
                  isLoading={isLoading}
                  variant='ghost'
                  onClick={() => refEditButton?.current?.click()}>
                  Submit
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </CDashboardLayout>
    </AdminAuth>
  );
};

export default StockitemsPage;

StockitemsPage.getInitialProps = async (ctx: { query: any }) => {
  return { query: ctx.query };
};
