import { AddIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { BiArrowBack } from "react-icons/bi";

const CreateButton: React.FC<{ btnTitle: string; onClick: () => void }> = ({
  btnTitle,
  onClick,
}) => {
  const { query } = useRouter();

  return (
    <ButtonGroup variant='outline'>
      <Button
        style={{ padding: "20px 15px 20px 15px" }}
        fontSize='18'
        size={"lg"}
        alignContent='center'
        _hover={{
          background: "blue.500",
        }}
        bg='primary'
        color='white'
        onClick={onClick}
        leftIcon={
          query.search ? (
            <BiArrowBack fontSize='20px' />
          ) : (
            <AddIcon fontSize='15px' />
          )
        }>
        {btnTitle}
      </Button>
    </ButtonGroup>
  );
};

export default CreateButton;
