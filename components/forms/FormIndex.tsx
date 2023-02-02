import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  Text,
  Heading,
  Box,
  Grid,
  GridItem,
  Input,
  Stack,
  Flex,
  Spacer,
  Link,
  Checkbox,
  FormErrorMessage,
  FormControl,
  FormLabel,
  Textarea,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import useTranslation from "assets/lang";
import CInput from "@/form_structure/components/CInput";
import CAccordionInput from "@/form_structure/components/CAccordionInput";
import CSelect from "@/form_structure/components/CSelect";
import { AiFillWarning } from "react-icons/ai";
import CMultiInput from "@/form_structure/components/CMultiInput";
import CMultiSelect from "@/form_structure/components/CMultiSelect";
import CTextArea from "@/form_structure/components/CTextArea";
import CInputFile from "@/form_structure/components/CInputFile";

const FormIndex = ({
  schema,
  action,
  structure,
  children,
  title,
  subTitle,
  withoutPassword,
  withoutCheckboxs,
  withoutTitles,
  withoutUpload,
  defaultValues,
  changeAction,
}) => {
  const {
    watch,
    register,
    handleSubmit,
    errors,
    formState,
    setValue,
    getValues,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema()),
    defaultValues: defaultValues ? defaultValues : schema().cast(),
  });
  const [phoneNumber, setPhoneNumber] = useState("");
  const { Translate } = useTranslation();
  //   const formIndexLang = Translate("components").forms.formIndex;

  useEffect(() => {
    if (defaultValues?.phoneNumber) {
      setValue("phoneNumber", defaultValues?.phoneNumber);
      setPhoneNumber(defaultValues?.phoneNumber);
    }
  }, [defaultValues, setValue]);

  const handelChange = () => {
    if (changeAction) changeAction(watch());
  };
  const router = useRouter();

  return (
    <>
      {title && (
        <Heading
          as='h1'
          fontSize={{ base: "lg", md: "38px" }}
          isTruncated
          textAlign={
            router.pathname == "/auth/signin" ||
            router.pathname == "/auth/forget-password" ||
            router.pathname == "/auth/reset-password"
              ? "center"
              : "left"
          }
          mt={5}
          mb={2}
          lineHeight='1.3'
          color='primary'>
          {title}
        </Heading>
      )}
      {subTitle && (
        <Text
          fontSize='16px'
          textAlign={
            router.pathname == "/auth/signin" ||
            router.pathname == "/auth/forget-password" ||
            router.pathname == "/auth/reset-password"
              ? "center"
              : "left"
          }
          mb='5'
          color='#566575'>
          {subTitle}
        </Text>
      )}

      {/* HookForm */}
      <form
        onSubmit={handleSubmit((data) => action(data))}
        onChange={handelChange}>
        {structure?.map((data, index) => {
          if (data.kind === "input") {
            return (
              <div key={index}>
                <CInput
                  setValue={setValue}
                  data={data}
                  errors={errors}
                  register={register}
                  preInput={data.preInput}
                  // color={data?.color ? data?.color : ''}
                />
              </div>
            );
          }
          if (data.kind === "accordionInput") {
            return (
              <div key={index}>
                <CAccordionInput
                  setValue={setValue}
                  data={data}
                  errors={errors}
                  register={register}
                />
              </div>
            );
          }
          if (data.kind === "select") {
            return (
              <div key={index}>
                <CSelect data={data} errors={errors} register={register} />
              </div>
            );
          }
          if (data.phoneNumber) {
            return (
              <Grid
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(2, 1fr)",
                }}
                gap={4}
                key={index}
                style={{
                  color: "#777777",
                }}>
                <GridItem>
                  {/* <CPhoneNumber data={data} errors={errors} register={register} /> */}
                  <FormLabel color='#777777' mt='4'>
                    {data.label}
                  </FormLabel>
                  <input
                    name='phoneNumber'
                    ref={register}
                    style={{ display: "none" }}
                  />
                  <PhoneInput
                    inputStyle={{
                      color: "black",
                      width: "100%",
                    }}
                    country={"us"}
                    value={phoneNumber}
                    onChange={(phone) => setValue("phoneNumber", phone)}
                  />
                  {errors?.phoneNumber ? (
                    <div style={{ position: "relative" }}>
                      <AiFillWarning
                        style={{
                          position: "absolute",
                          color: "red",
                          marginTop: "4px",
                        }}
                      />
                      <p
                        style={{
                          color: "red",
                          paddingLeft: "20px",
                          marginTop: "5px",
                        }}>
                        {/* {formIndexLang["mandatory_field"]} */}
                        Mandatory Field
                      </p>
                    </div>
                  ) : null}
                </GridItem>
              </Grid>
            );
          }

          if (data.key === "multi") {
            return (
              <Grid
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(2, 1fr)",
                }}
                gap={4}>
                {data.values?.map((multiData, multiIndex) => (
                  <GridItem key={multiIndex}>
                    {multiData.display === false ? (
                      ""
                    ) : (
                      <CMultiInput
                        withoutPassword={withoutPassword}
                        data={multiData}
                        errors={errors}
                        register={register}
                      />
                    )}
                  </GridItem>
                ))}
              </Grid>
            );
          }
          if (data.key === "multiSelect") {
            return (
              <Grid templateColumns='repeat(2, 1fr)' gap={4}>
                {data.values?.map((multiData, multiIndex) => (
                  <GridItem h='100' key={multiIndex}>
                    <CMultiSelect
                      errors={errors}
                      data={multiData}
                      register={register}
                    />
                  </GridItem>
                ))}
              </Grid>
            );
          }
          if (data.key === "multiRadio") {
            return (
              <RadioGroup defaultValue={data?.defaultValue}>
                <Stack spacing={10} direction='row'>
                  <Flex>
                    {data.values?.map((multiData, multiIndex) => (
                      <React.Fragment key={multiIndex}>
                        <Radio mr='20' value={multiData.value}>
                          {multiData.label}
                        </Radio>

                        <Spacer />
                      </React.Fragment>
                    ))}
                  </Flex>
                </Stack>
              </RadioGroup>
            );
          }

          if (data.kind === "textArea") {
            return (
              <CTextArea
                register={register}
                errors={errors}
                data={data}
                color={data?.color ? data?.color : ""}
              />
            );
          }
          if (data.key === "title") {
            return withoutTitles === true ? (
              ""
            ) : (
              <Box key={index} borderTop='1px solid #DDD' mt='6'>
                {data.value?.mainTitle !== "" && (
                  <Heading color='black' mb={4} mt='4' as='h1' size='lg'>
                    {data.value.mainTitle}
                  </Heading>
                )}
                <Flex>
                  <Heading color='black' mb='4' mt='4' as='h2' size='md'>
                    {data.value?.title}
                  </Heading>
                  <Spacer />
                  {data.value?.needHelp && (
                    <Link href={data.value?.needHelp} mt='4'>
                      <span
                        style={{
                          borderBottom: "1px solid black",
                          fontWeight: "bold",
                        }}>
                        {/* {formIndexLang["need_help"]} */}
                        Need Help?
                      </span>
                    </Link>
                  )}
                </Flex>

                <Text color='black' fontSize='lg' mb='8'>
                  {data.value?.subTitle}
                </Text>
              </Box>
            );
          }
          ``;
          if (data.key === "file") {
            return (
              <Grid templateColumns='repeat(2, 1fr)' gap={4}>
                {withoutUpload === true
                  ? ""
                  : data.values?.map((multiData, multiIndex) => (
                      <GridItem key={multiIndex}>
                        <CInputFile
                          setValue={setValue}
                          text=''
                          data={multiData}
                          errors={errors}
                          register={register}
                        />
                      </GridItem>
                    ))}
              </Grid>
            );
          }
          if (data.key === "multiFile") {
            return (
              <Grid
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(2, 1fr)",
                }}
                gap={4}>
                {withoutUpload === true
                  ? ""
                  : data.values?.map((multiData, multiIndex) => (
                      <GridItem key={multiIndex}>
                        <CInputFile
                          setValue={setValue}
                          text=''
                          data={multiData}
                          errors={errors}
                          register={register}
                        />
                      </GridItem>
                    ))}
              </Grid>
            );
          }
          if (data.key === "title2") {
            return withoutTitles === true ? (
              ""
            ) : (
              <Box key={index} borderTop='1px solid #DDD' mt='6'>
                <Heading
                  color='black'
                  mb={4}
                  mt='2'
                  as='h2'
                  size='md'
                  fontSize='20px'>
                  {data.value?.title2}
                </Heading>

                <Text color='black' fontSize='15px' mb='8'>
                  {data.value?.subTitle2}
                </Text>
              </Box>
            );
          }

          if (data.key === "multiCheck") {
            return (
              <>
                <Box key={index} w='100%'>
                  {withoutCheckboxs === true ? (
                    ""
                  ) : (
                    <>
                      <Flex
                        w='100%'
                        direction='column'
                        wrap='wrap'
                        h='175px'
                        // templateRows="repeat(5, 1fr)"
                        // templateColumns="repeat(3, 1fr)"
                        // gap={4}
                      >
                        {data.values?.map((multiData, multiIndex) => (
                          <Box h='8' key={multiIndex} w='33%'>
                            <Flex>
                              <Checkbox
                                my='5'
                                size='lg'
                                color='black'
                                type='checkbox'
                                name={`survey[${multiData.name}]`}
                                ref={register}>
                                <span
                                  style={{
                                    fontSize: "16px",
                                    marginLeft: "15px",
                                  }}>
                                  {multiData.label}
                                </span>
                              </Checkbox>
                            </Flex>

                            {errors[multiData.name] ? (
                              <div style={{ position: "relative" }}>
                                <AiFillWarning
                                  style={{
                                    position: "absolute",
                                    color: "red",
                                    marginTop: "4px",
                                  }}
                                />
                                <FormErrorMessage pl='6'>
                                  {errors[multiData.name].message}
                                </FormErrorMessage>
                              </div>
                            ) : null}
                          </Box>
                        ))}
                        {data.keyBtn === "otherCheckbox" && (
                          <Input
                            w='33%'
                            bg='white'
                            color='black'
                            variant='outline'
                            type={data.type}
                            name={data.name}
                            placeholder={data.placeholder}
                            letterSpacing='2'
                            ref={register}
                            maxLength={255}
                            h='44px'
                          />
                        )}
                      </Flex>
                    </>
                  )}
                </Box>
              </>
            );
          }
        })}
        {children}
        {/* <button type="submit">ok</button> */}
      </form>
      {/* HookForm */}
    </>
  );
};
export default FormIndex;
