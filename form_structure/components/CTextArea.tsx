import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { Box } from '@chakra-ui/layout';
import { Flex } from '@chakra-ui/react';
import { Textarea } from '@chakra-ui/textarea';
import { Tooltip } from '@chakra-ui/tooltip';
import React from 'react';
import { AiFillWarning } from 'react-icons/ai';
import useTranslation from '../../assets/lang';

const CTextArea = ({
    flexParent = '0.5',
    errors,
    data,
    register,
    maxLength = 255,
    height = '250px',
    color,
    tooltipLabel
}) => {
    const { Translate } = useTranslation();
    const textAreaInput = Translate('components')?.forms?.inputs;
    let errorsName = errors[data.name];
    if (data.name.includes('.')) {
        const splitsName = data.name.split('.');
        const parentErrors = errors[splitsName[0]];
        if (parentErrors) errorsName = parentErrors[splitsName[1]];
    }

    if (data.hide)
        return <input name={data.name} ref={register} readOnly style={{ display: 'none' }} />;
    return (
        <Box flex={flexParent}>
            <FormControl isInvalid={errorsName}>
                <FormLabel color="#000">
                    {textAreaInput[data.label] || data.label}
                    {data.iBtn && (
                        <Tooltip label={tooltipLabel} placement="top-start">
                            <Flex
                                align="center"
                                justify="center"
                                style={{
                                    width: '16px',
                                    height: '16px',
                                    background: 'gray',
                                    color: 'white',
                                    borderRadius: '50%',
                                    padding: '10px'
                                }}>
                                i
                            </Flex>
                        </Tooltip>
                    )}
                </FormLabel>

                <Textarea
                    color={color}
                    borderRadius="10px"
                    type={data.type}
                    name={data.name}
                    height={height}
                    placeholder={textAreaInput[data.placeholder]}
                    size="sm"
                    resize="none"
                    ref={register}
                    maxLength={maxLength}
                    isReadOnly={data.disable ? true : false}
                    bg={data.disable ? '#EBEDF2' : !errorsName ? 'white' : '#FEEEF0'}
                    opacity={data.disable ? '0.5' : '1'}
                />
            </FormControl>
            {errorsName ? (
                <div style={{ position: 'relative' }}>
                    <AiFillWarning
                        style={{
                            position: 'absolute',
                            color: 'red',
                            marginTop: '4px'
                        }}
                    />
                    <div style={{ paddingLeft: '20px', color: 'red' }}>
                        {textAreaInput[errorsName.message]}
                    </div>
                </div>
            ) : null}
        </Box>
    );
};

export default CTextArea;
