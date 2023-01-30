import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  FormErrorMessage,
  FormControl,
  FormLabel,
  Input,
  Spacer,
  Flex,
  InputGroup,
  Tooltip,
  InputLeftElement,
} from "@chakra-ui/react";
// import CPasswordShow from '../../components/forms/auth/CPasswordShow';
import { AiFillWarning } from "react-icons/ai";
import { RootState } from "../../services/combinedReducers";
import { useSelector } from "react-redux";
import useTranslation from "@/assets/lang";
const CInput = ({
  errors,
  data,
  register,
  preInput = <></>,
  mt = "3",
  mb,
  setValue,
  defaultValues,
  tooltipLabel,
}) => {
  const { Translate } = useTranslation();
  //   const textInput = Translate("components")?.forms?.inputs;
  //   const user = useSelector((state: RootState) => state.user.profile);
  const user = {};
  let errorsName = errors[data.name];
  if (data?.name?.includes(".")) {
    const splitsName = data.name.split(".");
    const parentErrors = errors[splitsName[0]];
    if (parentErrors) errorsName = parentErrors[splitsName[1]];
  }
  console.log(data, "dataaaaa");

  if (data.hide)
    return (
      <input
        name={data.name}
        ref={register}
        title=''
        readOnly
        style={{ display: "none" }}
        type={data.type}
        onChange={(e) => setValue(data.name, e.target.value)}
      />
    );
  return (
    <FormControl
      // isInvalid={errorsName}
      mt={mt}
      mb={mb}>
      <Flex>
        {data.label && (
          <FormLabel color='#000'>
            <Flex align='center'>
              {/* {textInput[data.label] || data.label} */}
              {data.label}
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
        )}
        <Spacer />
        {console.log(data.isForget, data, "data.isForget")}
        {data.forgetLink && (
          <Link href={data.forgetLink}>
            <a>
              <span
                style={{
                  color: "primary",
                  borderBottom: "1px solid primary",
                }}>
                Forget Password?
              </span>
            </a>
          </Link>
        )}
      </Flex>
      {data.type === "password" ? (
        // <CPasswordShow errors={errors} data={data} name={data.name} register={register} />
        ""
      ) : (
        <>
          {data.noRef ? (
            <InputGroup>
              {data.subType == "special" ? (
                <InputLeftElement children={`${user?.currency}`} />
              ) : (
                ""
              )}
              {preInput}
              <Input
                h='44px'
                isReadOnly={data.disable ? true : false}
                bg={
                  data.disable ? "#EBEDF2" : !errorsName ? "white" : "#FEEEF0"
                }
                opacity={data.disable ? "0.5" : "1"}
                color='black'
                color={value?.toString() === "0" ? "gray" : "black"}
                variant='outline'
                type={data.type}
                min={0}
                step='any'
                // placeholder={textInput[data.placeholder] || data.placeholder}
                placeholder={data.placeholder}
                letterSpacing='2'
                // value={value}
                defaultValue={defaultValues}
                name={data.name}
                maxLength={50}
                ref={register}
                width={data.width ? data.width : "100%"}
                onChange={(e) => setValue(data.name, e.target.value)}
              />
            </InputGroup>
          ) : (
            <InputGroup>
              {data.subType == "special" ? (
                <InputLeftElement children={user?.currency} />
              ) : (
                ""
              )}
              {preInput}
              <Input
                h='44px'
                isReadOnly={data.disable ? true : false}
                bg={
                  data.disable ? "#EBEDF2" : !errorsName ? "white" : "#FEEEF0"
                }
                opacity={data.disable ? "0.5" : "1"}
                color={"black"}
                variant='outline'
                type={data.type}
                min={0}
                name={data.name}
                defaultValue={defaultValues}
                step='any'
                // placeholder={textInput[data.placeholder]}
                placeholder={data.placeholder}
                letterSpacing='2'
                ref={register}
                onChange={(e) => setValue(data.name, e.target.value)}
                maxLength={50}
                width={data.width ? data.width : "100%"}
              />
            </InputGroup>
          )}
        </>
      )}

      {errorsName ? (
        <div style={{ position: "relative" }}>
          <AiFillWarning
            style={{
              position: "absolute",
              color: "red",
              marginTop: "4px",
            }}
          />
          <FormErrorMessage pl='6'>
            {/* {textInput[errorsName.message] || errorsName.message} */}
            {errorsName.message}
          </FormErrorMessage>
        </div>
      ) : null}
    </FormControl>
  );
};

export default CInput;
