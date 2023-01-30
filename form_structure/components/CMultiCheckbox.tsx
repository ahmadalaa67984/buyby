import React from 'react';
import { Checkbox } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
const CMultiCheckbox = ({ data, index }) => {
    const { watch, register } = useForm<{ toggles: boolean[] }>();
    const toggles = watch('toggles', []);
    const checkedCount = toggles.filter(Boolean).length;

    return (
        <>
            <Checkbox
            my="3"
                style={{
                    border: '2px sloid black'
                }}
                size="md"
                color="black"
                name={`toggles${data.name}`}
                ref={register}>
                {data.label}
            </Checkbox>
        </>
    );
};

export default CMultiCheckbox;
