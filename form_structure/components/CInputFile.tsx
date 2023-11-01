import React, { useState, useEffect } from "react";
import {
  FormErrorMessage,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Heading,
  Spacer,
  Flex,
  Select,
  Checkbox,
  InputLeftAddon,
  InputGroup,
  Box,
  Grid,
  GridItem,
  Container,
} from "@chakra-ui/react";
import { IoMdCloudUpload } from "react-icons/io";
import { uploadRequest } from "../../modules/upload/Actions";
import { useDispatch, useSelector } from "react-redux";
import Upload from "../../components/upload/upload";
import { isLocalURL } from "next/dist/next-server/lib/router/router";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import { DeleteIcon } from "@chakra-ui/icons";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
const CInputFile = ({
  data,
  height,
  errors,
  register,
  text,
  intial = "",
  setValue,
  tooltipLabel,
}) => {
  const [url, setUrl] = useState("");
  const [file, setFileName] = useState("");
  useEffect(() => {
    if (intial) {
      // insert(parseInt(2, 10), {
      //     url: intial,
      //     file: intial
      // });
      setFileName(intial);
      setUrl(intial);
      setValue(data.name, intial);
    }
  }, [intial]);

  const fileName = intial.split("/");

  return (
    <Box w='100%'>
      <DndProvider backend={HTML5Backend}>
        <Upload
          height={height}
          url={url}
          setUrl={setUrl}
          setFileName={setFileName}
          fileName={file}
          data={data}
          tooltipLabel={tooltipLabel}
          errors={errors}
          register={register}
          text={text}
          API='/upload'
          S3Bucket=''
          deleteAction={() => {
            setUrl("");
            setFileName("");
            setValue(data.name, "");
          }}
          insertAction={(urlData, fileName) => {
            // remove(0);
            // insert(parseInt(2, 10), {
            //     url: urlData,
            //     file: fileName
            // });
            setValue(data.name, urlData);
          }}
        />
      </DndProvider>
      <input
        style={{
          opacity: "0",
        }}
        ref={register}
        name={data.name}
        type='text'
        readOnly
        defaultValue={url}
      />
      {/* <p>{url}</p> */}
    </Box>
  );
};

export default CInputFile;
