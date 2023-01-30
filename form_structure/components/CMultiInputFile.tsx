import React, { useState, useEffect } from 'react';
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
    Container
} from '@chakra-ui/react';
import { IoMdCloudUpload } from 'react-icons/io';
import { uploadRequest } from '../../modules/upload/Actions';
import { useDispatch, useSelector } from 'react-redux';
import Upload from '../../components/upload/upload';
import { isLocalURL } from 'next/dist/next-server/lib/router/router';
import { useForm, useFieldArray, Controller, useWatch } from 'react-hook-form';
import { DeleteIcon } from '@chakra-ui/icons';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const CMultiInputFile = ({ data, errors, register, text, setValue, intial = '' }) => {
    const [url, setUrl] = useState('');
    const [file, setFileName] = useState('');

    const dispatch = useDispatch();

    const { control, handleSubmit, reset } = useForm({
        // defaultValues: {
        //     test: [{ url }]
        // }
    });
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control,
        name: data.name
    });

    useEffect(() => {
        intial &&
            insert(parseInt(0, 10), {
                url: intial,
                file: ''
            });
    }, []);
    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <Upload
                    url={url}
                    file={file}
                    setUrl={setUrl}
                    setFileName={setFileName}
                    data={data}
                    errors={errors}
                    register={register}
                    text={text}
                    API="/uploads"
                    S3Bucket=""
                    insertAction={(urlData, fileName) => {
                        insert(parseInt(2, 10), {
                            url: urlData,
                            file: fileName
                        });
                    }}
                />
            </DndProvider>

            <input
                style={{
                    opacity: '0'
                }}
                ref={register}
                name={data.name}
                type="text"
                readOnly
                defaultValue={url}
            />

            <ul>
                {fields?.map((item, index) => {
                    return (
                        <li key={item.id}>
                            <Box my={4}>
                                <Flex align="center">
                                    <Box>
                                        <Flex align="center">
                                            <img
                                                src={item.url}
                                                style={{ width: '80px', height: '80px' }}
                                            />
                                            <p
                                                style={{
                                                    color: 'black',
                                                    marginTop: '10px',
                                                    marginLeft: '5px'
                                                }}>
                                                {item?.file}
                                            </p>
                                        </Flex>
                                    </Box>
                                    <Box>
                                        <input
                                            name={`${data.name}[${index}]`}
                                            defaultValue={`${item.url}`} // make sure to set up defaultValue
                                            ref={register}
                                            style={{ opacity: 0, display: 'none' }}
                                        />
                                    </Box>
                                    <Spacer />
                                    <Box>
                                        {' '}
                                        <button
                                            style={{ color: 'black', cursor: 'pointer' }}
                                            type="button"
                                            onClick={() => {
                                                remove(index), setUrl('');
                                            }}>
                                            <DeleteIcon w={8} h={8} color="red.500" />
                                        </button>
                                    </Box>
                                </Flex>
                            </Box>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default CMultiInputFile;
