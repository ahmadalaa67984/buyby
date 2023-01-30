import React from "react";
import {
  FormErrorMessage,
  FormControl,
  FormLabel,
  Select,
  Tooltip,
  Flex,
  Box,
} from "@chakra-ui/react";
import { AiFillWarning } from "react-icons/ai";
// import ReactSelect from 'react-select';
// import makeAnimated from 'react-select/animated';
const CMultiSelect = ({
  data,
  register,
  errors,
  doneness,
  setDonenessLevel,
}) => {
  // const animatedComponents = makeAnimated();

  return (
    <FormControl
      height='85px'
      mb={6}
      id={data.name}
      isInvalid={errors[data.name]}>
      <FormLabel color='#777777' mt='4'>
        <Flex align='center'>
          {data.label}{" "}
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
      {data.multi ? (
        <Box width='100%'>
          {/* <ReactSelect
                        isMulti
                        components={animatedComponents}
                        // defaultValue={[options[4], options[5]]}
                        options={data?.options}
                        onChange={(selected) => {
                            setDonenessLevel(selected);
                        }}
                    /> */}
        </Box>
      ) : (
        <Select
          height='44px'
          bg={
            data.disable || data.options?.length === 0
              ? "#EBEDF2"
              : !errors[data.name]
              ? "white"
              : "#FEEEF0"
          }
          color='#777777'
          label={data.label}
          placeholder='Select option'
          name={data.name}
          ref={register}
          isReadOnly={
            data.options?.length > 0 ? (data.disable ? true : false) : true
          }
          // isDisabled={data.options?.length > 0 ? (data.disable ? true : false) : true}
        >
          {data.options?.map((option) => {
            return <option value={option.value}>{option.label}</option>;
          })}
        </Select>
      )}

      {errors[data.name] ? (
        <div style={{ position: "relative" }}>
          <AiFillWarning
            style={{
              position: "absolute",
              color: "red",
              marginTop: "4px",
            }}
          />
          <FormErrorMessage pl='6'>
            {errors[data.name].message}
          </FormErrorMessage>
        </div>
      ) : null}
    </FormControl>
  );
};

export default CMultiSelect;
