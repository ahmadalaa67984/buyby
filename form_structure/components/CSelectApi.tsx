import { Box, FormLabel } from '@chakra-ui/react';
import useTranslation from 'assets/lang';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { AiFillWarning } from 'react-icons/ai';
import Select from 'react-select';
const CSelectApi = ({ control, data, error, setValue, setItemData, value, watch, index }) => {
    const [options, setOptions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setLoading] = useState(false);
    const { Translate } = useTranslation();

    const selectInput = Translate('components')?.forms?.inputs;

    const apiData = data?.apiData;
    const getData = async () => {
        setLoading(true);
        let apiLink = data.link;
        const filterBy = [];
        const filterByInit = [];
        if (data?.disable) {
            filterBy.push({ _id: value });
        }
        if (data?.apiParams) {
            data?.apiParams?.forEach((data) => {
                apiLink += watch(data?.replace('$$', index)) + '/';
            });
        }

        // if (data?.levelCategoryParent) {
        //     filterBy.push({ level: watch('level') - 1 });
        // }
        try {
            const result = await axios.post(apiLink, {
                filterBy,
                attributesToRetrieve: [],
                offset: 0,
                size: 10,
                sort: '',
                dir: 'asc',
                searchTerm
            });
            if (data.link == '/stock-item-data/me/search/')
                setOptions(
                    result?.data?.content?.map((data) => {
                        return { ...data, name: data?.nameLocalized?.mainLanguage };
                    })
                );
            else {
                if (data?.apiContent == false) {
                    setOptions(result?.data);
                } else setOptions(result?.data?.content);
            }
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        let timeId = setTimeout(() => {
            if (searchTerm?.length > 1 || data?.typeHead == false) getData();
            if (data?.disable && value) getData();
        }, 500);
        return () => clearTimeout(timeId);
    }, [searchTerm, data?.disable, value]);
    const borderStyle = {
        control: (base) => ({
            ...base,
            border: 0,
            boxShadow: 'none'
        })
    };
    return (
        <Box mt="3">
            {data.label && (
                <FormLabel color="#000">{selectInput[data.label] || data.label}</FormLabel>
            )}{' '}
            <Controller
                control={control}
                // defaultValue={default_value}
                name={data?.name}
                render={(props) => {
                    console.log(props);
                    const { onChange, value, name, ref } = props;
                    return (
                        <Box
                            border={error ? '1px solid red' : '1px solid gray'}
                            borderColor={error ? 'red' : 'gray.300'}>
                            {console.log(error, 'selectError')}

                            <Select
                                isDisabled={data?.disable}
                                isLoading={isLoading}
                                inputRef={ref}
                                options={options}
                                label={data.label}
                                name={data?.name}
                                inputValue={searchTerm}
                                getOptionLabel={(option) => {
                                    let value = '';

                                    if (data.name == 'itemId') {
                                        value += `${option['name']?.mainLanguage}`;
                                    }
                                    if (data.labelOption1) {
                                        value += `${option[data.labelOption1]}`;
                                    }
                                    if (data.labelOption2) {
                                        value += `${data.labelOptionSeprate || ' '}${
                                            option[data.labelOption2]
                                        }`;
                                    }
                                    if (data.labelOption3) {
                                        value += `${data.labelOptionSeprate || ' '}${
                                            option[data.labelOption3]
                                        }`;
                                    }
                                    return value;
                                }}
                                getOptionValue={(option) => option._id}
                                onInputChange={(e) => setSearchTerm(e)}
                                value={options?.find((c) => c._id === value)}
                                onChange={(val) => {
                                    console.log(data.name, 'nameeeee');

                                    if (data.name.includes('stockItemId')) {
                                        console.log(data.name?.includes('.'), 'nameeeee');

                                        if (data.name?.includes('.')) {
                                            var lastIndex = data.name.lastIndexOf('.');

                                            let name = data.name.substring(0, lastIndex);
                                            console.log(name, `${name}.itemType`, 'nameeeee');
                                            setItemData(val);
                                            if (!val?.trackExpiry && !val?.trackBatches) {
                                                setValue(`${name}.itemType`, 'normal');
                                            }
                                            if (val?.trackExpiry && !val?.trackBatches) {
                                                setValue(`${name}.itemType`, 'expiry');
                                            }
                                            if (!val?.trackExpiry && val?.trackBatches) {
                                                setValue(`${name}.itemType`, 'batch');
                                            }
                                        } else {
                                            setValue('itemData', val);
                                        }
                                    }
                                    onChange(val._id);
                                }}
                                styles={borderStyle}
                            />
                        </Box>
                    );
                }}
            />
            {error ? (
                <div style={{ position: 'relative' }}>
                    <AiFillWarning
                        style={{
                            position: 'absolute',
                            color: 'red',
                            marginTop: '4px'
                        }}
                    />
                    <p
                        style={{
                            color: 'red',
                            paddingLeft: '25px'
                        }}>
                        {selectInput[error.message]}
                    </p>
                </div>
            ) : null}
        </Box>
    );
};

export default CSelectApi;
