import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { FormErrorMessage, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { AiFillWarning } from 'react-icons/ai';
import { Controller, useForm } from 'react-hook-form';
import useTranslation from '../../assets/lang';
const CPhoneNumber = ({ data, errors, register }) => {
    const { handleSubmit, control, reset, setValue } = useForm();
    const handlePhoneNumberChange = (value, country, event, formattedValue) => {
        setValue('phoneNumber', value);
    };
    const { Translate } = useTranslation();
    const phoneInput = Translate('components')?.forms?.inputs;
    return (
        <FormControl mb={6} id={data.name} w="50%" isInvalid={errors[data.name]}>
            <FormLabel color="#777777" mt="4">
                {phoneInput[data.label]}
            </FormLabel>
            <Input
                h="44px"
                bg={!errors[data.name] ? 'white' : '#FEEEF0'}
                color="black"
                variant="outline"
                type={data.type}
                name={data.name}
                placeholder={phoneInput[data.placeholder]}
                letterSpacing="2"
                ref={register}
                maxLength={255}
            />
            {/* <PhoneInput
                inputStyle={{
                    color: 'black'
                }}
                inputProps={{
                    autoFocus: true,
                    name: 'phoneNumber'
                    // inputRef: register({ required: true })
                }}
                ref={register}
                country={'us'}
                onChange={(phoneNumber) => setValue('phoneNumber', phoneNumber)}
            /> */}
            {/* <PhoneInput
                specialLabel=""
                onChange={handlePhoneNumberChange}
                country={'us'}
                inputProps={{
                    autoFocus: true,
                    name: 'phoneNumber'
                }}
            /> */}
            {/* <Controller
                as={
                    <PhoneInput
                        country="mx"
                        preferredCountries={['mx', 'us']}
                        countryCodeEditable={false}
                        inputExtraProps={{
                            autoFocus: true,
                            name: 'phoneNumber',
                            inputRef: register({ required: true })
                        }}
                    />
                }
                name="phoneNumber"
                control={control}
                rules={{ required: true }}
            /> */}
            {/* <input name="phoneNumber" type="text" ref={register} /> */}

            {errors[data.name] ? (
                <div style={{ position: 'relative' }}>
                    <AiFillWarning
                        style={{
                            position: 'absolute',
                            color: 'red',
                            marginTop: '4px'
                        }}
                    />
                    <FormErrorMessage pl="6">
                        {phoneInput[errors[data.name].message]}
                    </FormErrorMessage>
                </div>
            ) : null}
        </FormControl>
    );
};

export default CPhoneNumber;
