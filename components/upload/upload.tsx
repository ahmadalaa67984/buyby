import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Progress,
  Box,
  Text,
  FormErrorMessage,
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  Tooltip,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import axios from "axios";
import { NativeTypes } from "react-dnd-html5-backend";
// import { toast } from 'react-toastify';
import { AiFillWarning } from "react-icons/ai";
import { IoMdCloudUpload } from "react-icons/io";
import { AiFillFile } from "react-icons/ai";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../services/combinedReducers";
import { useDrag, useDrop } from "react-dnd";
import {
  AddIcon,
  CloseIcon,
  DeleteIcon,
  SmallCloseIcon,
} from "@chakra-ui/icons";
import useTranslation from "../../assets/lang/index";
import { IoClose } from "react-icons/io5";
import { MdCloudUpload } from "react-icons/md";
import { extractErrorMsgFromResponse } from "@/utils/apiHelpers";
import { humanFileSize } from "@/utils";
import Cookies from "js-cookie";

const Upload = (props) => {
  // const auth = useSelector((state: RootState) => state.auth);

  const { register, handleSubmit, watch, setValue } = useForm({
    shouldUnregister: false,
  });
  const { Translate } = useTranslation();

  // const uploadComponent = Translate('components').upload;

  const {
    height,
    limitDimensions,
    S3Bucket,
    API,
    data,
    text,
    url,
    tooltipLabel,
    setUrl,
    insertAction,
    errors,
    file,
    setFileName,
    deleteAction = () => {},
    fileName = "",
  } = props;
  // const [url, setUrl] = useState('');
  const inputName = data.name;
  const [upload, setUpload] = useState(0);
  const [fileSize, setFileSize] = useState(0);
  const [max, setMax] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [error, setError] = useState(null);

  const [droppedFiles, setDroppedFiles] = useState([]);
  const handleFileDrop = useCallback(
    (item) => {
      if (item) {
        const files = item.files;
        setDroppedFiles(files);
      }
    },
    [setDroppedFiles]
  );

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: [NativeTypes.FILE],
      drop(item) {
        if (handleFileDrop) {
          handleFileDrop(item);
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    []
  );
  // const isActive = canDrop && isOver;

  useEffect(() => {
    if (url) {
      setValue(inputName, url);
      insertAction(url, file);
    }
  }, [url, file, inputName, insertAction, setValue]);

  useEffect(() => {
    if (droppedFiles && droppedFiles?.length > 0) {
      handleUpload(droppedFiles[0]);
    }
  }, [droppedFiles]);
  const checkWidthAndHeight = (file) => {
    return new Promise((resolve, reject) => {
      const src = URL.createObjectURL(file);
      const image = new Image();
      image.src = src;
      image.onload = () => {
        if (
          image.width >= limitDimensions.width ||
          image.height >= limitDimensions.height
        ) {
          reject(
            `limits are ${limitDimensions.width}/${limitDimensions.height}`
          );
        } else {
          resolve("done");
        }
        URL.revokeObjectURL(src);
      };
    });
  };

  const handleUpload = async (file) => {
    setError(null);
    // ckecking the file type

    // Allowing file type
    var allowedExtensions =
      data.design === "inside"
        ? /(\.jpg|\.png|\.hevc|\.csv)$/i
        : /(\.jpg|\.png|\.pdf|\.hevc|\.csv)$/i;

    if (file && !allowedExtensions.exec(file.name)) {
      // toast.error(
      //     `${uploadComponent['upload_format']} ${
      //         data.design === 'inside' ? '' : `${uploadComponent['files_in_pdf']}`
      //     }`
      // );
      return;
    }
    if (file && file?.size > 20000000) {
      // toast.error(uploadComponent['upload_size_error']);
      return;
    }
    // ckecking the image width and height
    if (limitDimensions) {
      try {
        await checkWidthAndHeight(file);
      } catch (error) {
        setError(error);
        extractErrorMsgFromResponse(error);
        return;
      }
    }
    // setValue(data.name, '');
    setUpload(0);
    setMax(0);

    setShowProgress(true);
    setFileSize(file?.size);
    setFileName(file?.name);

    try {
      let formData = new FormData();
      formData.append("file", file, file?.name);
      const res = await axios.post(API, formData, {
        onUploadProgress: (ProgressEvent) => {
          setMax(ProgressEvent.total);
          setUpload(ProgressEvent.loaded);
        },
        headers: {
          "Content-Type": file.type,
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      setUrl(res.data.url);
    } catch (error) {
      extractErrorMsgFromResponse(error);
      setError(error.message);
    } finally {
      setShowProgress(false);
    }
  };

  const checkErrorFlag = errors[data.name] && !url;

  let mthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let d = new Date();
  let currDate = d.getDate();
  let currMonth = d.getMonth(); //Months are zero based
  let currYear = d.getFullYear();

  return (
    <>
      <FormControl>
        <FormLabel color='#000' mt='4'>
          <Flex align='center'>
            {data.label}{" "}
            {data.iBtn && (
              <Tooltip label={tooltipLabel} placement='top-start'>
                <span
                  style={{
                    backgroundColor: "#748496",
                    color: "white",
                    padding: "0 7px",
                    borderRadius: "50%",
                    margin: "6px",
                    fontSize: "12px",
                  }}>
                  i
                </span>
              </Tooltip>
            )}
          </Flex>
        </FormLabel>
        <Box ref={drop}>
          <div
            style={{
              borderRadius: "10px",
              border: `${
                checkErrorFlag ? "1px solid red" : "1px dashed #a0a0a0"
              }`,
              height: height ? height : "255px",
              backgroundColor: `${checkErrorFlag ? "#feeef0" : "#F4F6F9"}`,
              position: "relative",
              cursor: "pointer",
            }}>
            {data.design === "inside" && (
              <>
                {url && (
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      cursor: "pointer",
                    }}>
                    <img
                      src={url}
                      style={{
                        // backgroundImage: `url(${url})`,
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        borderRadius: "10px",
                        objectFit: "cover",
                        opacity: "45%",
                      }}
                    />
                    <a
                      style={{
                        position: "absolute",
                        right: "-12px",
                        top: "-13px",
                        backgroundColor: "white",
                        boxShadow: "0px 0px 4px rgb(0 0 0 / 30%)",
                        borderRadius: "50%",
                        width: "24px",
                        height: "24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: "100%",
                      }}
                      onClick={() => {
                        setUpload(0);
                        setMax(0);
                        setShowProgress(false);
                        setError(null);
                        deleteAction();
                      }}>
                      <SmallCloseIcon />
                    </a>
                    <div
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}>
                      <AddIcon />
                    </div>
                  </div>
                )}
                {!url && (
                  <Flex
                    align='center'
                    justify='center'
                    direction='column'
                    h='100%'>
                    <IoMdCloudUpload
                      color='#D96846'
                      style={{
                        width: "20%",
                        height: "20%",
                        color: "#D96846",
                        marginTop: "15px",
                      }}
                    />
                    <Text
                      borderBottom='1px solid primary'
                      h='21px'
                      mb={3}
                      color='primary'
                      fontWeight={"bold"}>
                      {/* {uploadComponent['upload']} */}
                      Upload
                    </Text>
                    <Box
                      style={{
                        textAlign: "center",
                        fontSize: "14px",
                      }}>
                      {text ? (
                        <a
                          color='#748496'
                          style={{ textDecoration: "underline" }}>
                          {text}
                        </a>
                      ) : (
                        <a
                          color='#748496'
                          style={{ textDecoration: "underline" }}>
                          {/* {uploadComponent['upload_header']} */}
                          {/* Header */}
                        </a>
                      )}
                    </Box>
                  </Flex>
                )}
              </>
            )}
            {data.design !== "inside" && (
              <Flex align='center' justify='center' direction='column' h='100%'>
                <MdCloudUpload
                  color='#D96846'
                  style={{
                    width: "10%",
                    height: "10%",
                    color: "#D96846",
                  }}
                />
                <Text
                  borderBottom='1px solid primary'
                  h='21px'
                  mb={3}
                  color='primary'>
                  {/* {uploadComponent['upload']} */}
                  Upload
                </Text>
                <Box
                  maxW='55%'
                  style={{
                    textAlign: "center",
                    fontSize: "14px",
                  }}>
                  {text ? (
                    text
                  ) : (
                    <Text color='#748496'>
                      {/* {uploadComponent['upload_header']} */}
                      Upload
                    </Text>
                  )}
                </Box>
              </Flex>
            )}
          </div>
        </Box>
        <Input
          h='44px'
          maxLength={255}
          ref={drop}
          style={{
            position: "absolute",
            top: "32px",
            height: "150px",
            opacity: "0",
          }}
          isInvalid={checkErrorFlag}
          id='file-input'
          bg='white'
          color='black'
          variant='outline'
          type={data.type}
          // name={data.name}
          placeholder={data.placeholder}
          letterSpacing='2'
          onChange={(e) => {
            if (e?.target?.files) handleUpload(e.target.files[0]);
          }}
        />

        {checkErrorFlag ? (
          <div style={{ position: "relative" }}>
            <AiFillWarning
              style={{
                position: "absolute",
                color: "red",
                marginTop: "4px",
              }}
            />
            <Text style={{ paddingLeft: "18px", color: "red" }}>
              {errors[data.name].message}
            </Text>
            <FormErrorMessage pl='6'>
              {errors[data.name].message}
            </FormErrorMessage>
          </div>
        ) : null}
        {showProgress && <Progress size='xs' isIndeterminate />}
      </FormControl>
      <Box></Box>

      {url && data.design !== "inside" && (
        <ul>
          <li>
            <Box my={4}>
              <Flex
                align='center'
                bg='#EBEDF2'
                border='1px solid #B7BFC8'
                borderRadius='10px'
                h='62px'>
                <Box>
                  {/* <img src={url} style={{ width: '80px', height: '80px' }} /> */}
                  <AiFillFile
                    color='primary'
                    style={{ marginLeft: "10px", fontSize: "40px" }}
                  />
                </Box>
                <Box>
                  <input
                    // name={`${data.name}[${index}]`}
                    defaultValue={`${url}`} // make sure to set up defaultValue
                    // ref={register}
                    style={{ opacity: 0, display: "none", color: "black" }}
                  />
                  <Flex direction='column'>
                    <Text
                      style={{
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        maxWidth: "250px",
                        marginLeft: "12px",
                        color: "black",
                        fontSize: "15px",
                      }}>
                      {fileName
                        ?.split("/")
                        ?.pop()
                        .split(".")
                        .slice(0, -1)
                        .join(".")}
                    </Text>
                    {fileSize && (
                      <Text
                        style={{
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          maxWidth: "250px",
                          marginLeft: "12px",
                          color: "#748496",
                          fontSize: "14px",
                        }}>
                        {`${
                          mthNames[currMonth]
                        } ${currDate} ${currYear} - ${humanFileSize(
                          fileSize,
                          true
                        )}`}
                      </Text>
                    )}
                  </Flex>
                </Box>

                <Spacer />
                <Box>
                  <button
                    style={{
                      color: "#748496",
                      cursor: "pointer",
                      marginRight: "10px",
                    }}
                    type='button'
                    onClick={() => {
                      setUpload(0);
                      setMax(0);
                      setShowProgress(false);
                      setError(null);
                      deleteAction();
                    }}>
                    <IoClose fontSize='30px' />
                  </button>
                </Box>
              </Flex>
            </Box>
          </li>
        </ul>
      )}
    </>
  );
};

export default Upload;
