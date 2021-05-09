import axios from 'axios';
import { useState } from 'react';
import {
  Tag,
  VStack,
  TagLeftIcon,
  TagLabel,
  Box
} from "@chakra-ui/react"
import { WarningTwoIcon } from '@chakra-ui/icons'

const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, body);
      if (onSuccess) {
        onSuccess(response.data)
      }
      return response.data;
    } catch (err) {
      setErrors(
        <VStack spacing={4} >
          <Box className="font-bold">Something Went Wrong</Box>
          {err.response.data.errors.map(err => {
            return <Tag key={err.message} variant="outline" colorScheme="red" >
              <TagLeftIcon boxSize="12px" as={WarningTwoIcon} />
              <TagLabel > {err.message}</TagLabel>
            </Tag >
          })}
        </VStack >
      );
    }
  };

  return { doRequest, errors };
};

export default useRequest;