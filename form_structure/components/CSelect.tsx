import React, { useEffect, useState } from "react";
import { Box, FormControl, FormLabel, Select, Text } from "@chakra-ui/react";
import { AiFillWarning } from "react-icons/ai";
import useTranslation from "../../assets/lang";
// import ReactSelect from 'react-select';
// import makeAnimated from 'react-select/animated';
const CSelect = ({ data, errors, register }) => {
  const { Translate } = useTranslation();
  const selectInput = Translate("components")?.forms?.inputs;
  const [value, setValue] = useState();
  // const animatedComponents = makeAnimated();

  return (
    <Box mt='3'>
      <FormControl
        // height="85px"
        // mb={6}
        id={data.name}
        isInvalid={errors[data.name]}
        display={data.display}>
        {data.label && (
          <FormLabel color='#000' mt='4'>
            {selectInput[data.label] || data.label}
          </FormLabel>
        )}
        {data.multi ? (
          // <ReactSelect
          //     isMulti
          //     components={animatedComponents}
          //     // defaultValue={[options[4], options[5]]}
          //     options={data?.options}
          //     onChange={(selected) => {
          //         console.log(selected);
          //     }}
          // />
          ""
        ) : (
          <Select
            height='44px'
            width={data.width ? data.width : "100%"}
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
            // disabled={data.disabled ? true : false}
            // isReadOnly={data.disabled ? true : false}
            isDisabled={
              data.options?.length > 0 ? (data.disable ? true : false) : true
            }>
            {data?.options?.map((option) => {
              return (
                <option value={option.value} style={{ color: "#777777" }}>
                  {selectInput[option.label] || option.label}
                </option>
              );
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
            <Text
              style={{
                color: "red",
                paddingLeft: "25px",
              }}>
              {selectInput[errors[data.name].message]}
            </Text>
          </div>
        ) : null}
      </FormControl>
    </Box>
  );
};

export default CSelect;
