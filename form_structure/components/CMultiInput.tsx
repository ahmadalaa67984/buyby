import React from "react";
import {
  FormErrorMessage,
  FormControl,
  FormLabel,
  Input,
  GridItem,
  Select,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Tooltip,
  Flex,
} from "@chakra-ui/react";
// import CPasswordShow from '../../components/forms/auth/CPasswordShow';
import { AiFillWarning } from "react-icons/ai";
import useTranslation from "../../assets/lang";
import { useSelector } from "react-redux";
import { RootState } from "../../services/combinedReducers";

const CMultiInput = ({ data, errors, register, withoutPassword, value }) => {
  const { Translate } = useTranslation();
  //   const user = useSelector((state: RootState) => state.user.profile);
  const user = {};
  let errorsName = errors[data.name];
  if (data.name.includes(".")) {
    const splitsName = data.name.split(".");
    const parentErrors = errors[splitsName[0]];
    if (parentErrors) errorsName = parentErrors[splitsName[1]];
  }

  if (data.hide)
    return (
      <input
        name={data.name}
        ref={register}
        readOnly
        style={{ display: "none" }}
      />
    );
  return (
    <FormControl id={data.name} isInvalid={errorsName}>
      {data.type === "password" ? (
        <>
          {withoutPassword === true ? (
            ""
          ) : (
            <>
              <FormLabel color='#000' mt='4'>
                {Translate(data.label) || data.label}
              </FormLabel>
              {/* <CPasswordShow
                                errors={errors}
                                data={data}
                                name={data.name}
                                register={register}
                            /> */}
            </>
          )}
        </>
      ) : (
        <>
          {data.options ? (
            <>
              <FormLabel color='#000' mt='4'>
                {Translate(data.label) || data.label}
              </FormLabel>
              <Select
                height='44px'
                bg='white'
                color='#777777'
                label={Translate(data.label) || data.label}
                placeholder='Select option'
                name={data.name}
                ref={register}>
                {data.options?.map((option) => {
                  return <option value={option.value}>{option.label}</option>;
                })}
              </Select>
            </>
          ) : (
            <>
              <FormLabel color='#000' mt='4'>
                <Flex align='center'>
                  {Translate(data.label) || data.label}{" "}
                  {data.iBtn && (
                    <Tooltip label='Lorem IPS' placement='top-start'>
                      <Flex
                        ml='2'
                        align='center'
                        justify='center'
                        style={{
                          width: "16px",
                          height: "16px",
                          background: "gray",
                          color: "white",
                          borderRadius: "50%",
                          padding: "10px",
                        }}>
                        i
                      </Flex>
                    </Tooltip>
                  )}
                </Flex>
              </FormLabel>

              <InputGroup>
                {data.childrenLeft && (
                  <InputLeftAddon
                    bg='inherit'
                    children={
                      data.childrenLeft == "%"
                        ? data.childrenLeft
                        : user?.currency
                    }
                  />
                )}

                {data.noRef ? (
                  <Input
                    h='44px'
                    isReadOnly={data.disable ? true : false}
                    bg={
                      data.disable
                        ? "#EBEDF2"
                        : !errorsName
                        ? "white"
                        : "#FEEEF0"
                    }
                    opacity={data.disable ? "0.5" : "1"}
                    color='black'
                    step='any'
                    variant='outline'
                    type={data.type}
                    placeholder={Translate(data.placeholder)}
                    letterSpacing='2'
                    maxLength={255}
                    value={value}
                  />
                ) : (
                  <Input
                    h='44px'
                    isReadOnly={data.disable ? true : false}
                    bg={
                      data.disable
                        ? "#EBEDF2"
                        : !errorsName
                        ? "white"
                        : "#FEEEF0"
                    }
                    opacity={data.disable ? "0.5" : "1"}
                    color='black'
                    variant='outline'
                    step='any'
                    type={data.type}
                    name={data.name}
                    placeholder={Translate(data.placeholder)}
                    letterSpacing='2'
                    ref={register}
                    maxLength={255}
                  />
                )}

                {data.childrenRight && (
                  <InputRightAddon bg='inherit' children={data.childrenRight} />
                )}
              </InputGroup>
            </>
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
          <FormErrorMessage pl='6'>{errorsName.message}</FormErrorMessage>
        </div>
      ) : null}
    </FormControl>
  );
};

export default CMultiInput;
