/* eslint-disable react/no-children-prop */
import { ElementType, useRef, useState } from 'react';
import {
  Icon,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  Box,
  FormLabel,
} from '@chakra-ui/react';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import InputMask from 'react-input-mask';

interface InputProps extends ChakraInputProps {
  name: string;
  icon?: ElementType;
  mask?: string | Array<(string | RegExp)>;
  maskChar?: string | null;
}

export function Input({
  name,
  icon,
  mask = undefined,
  maskChar = null,
  placeholder,
  type,
  ...rest
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputBlur() {
    setIsFilled(!!inputRef.current.value);
  }

  return (
    <InputGroup>
      {icon && (
        <InputLeftElement
          pointerEvents="none"
          children={
            <Icon
              as={icon}
              boxSize="6"
              color={isFilled ? 'red.500' : 'gray.300'}
            />
          }
          w="4.5rem"
          h="16"
          borderRight="2px solid"
          borderColor="gray.50"
        />
      )}

      <Box position="relative" w="100%">
        <ChakraInput
          ref={inputRef}
          as={mask && InputMask}
          mask={mask}
          maskChar={maskChar}
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          name={name}
          placeholder=" "
          h="16"
          pl="24"
          bg="white"
          color="gray.700"
          borderRadius="lg"
          borderColor="white"
          focusBorderColor="red.500"
          _placeholder={{ color: 'gray.200' }}
          _hover={{ borderColor: 'white' }}
          sx={{
            '&:focus, &:not(:placeholder-shown)': {
              paddingTop: '20px',
              paddingBottom: '4px',
            },
            '&:focus ~ label, &:not(:placeholder-shown) ~ label': {
              fontSize: 'xs',
              transform: 'translateY(-0.375rem)',
            },
          }}
          onBlur={handleInputBlur}
          {...rest}
        />

        <FormLabel
          color="gray.200"
          position="absolute"
          fontWeight="normal"
          top="29%"
          left="0"
          pl="24"
          mb="1.5"
          zIndex="2"
          transformOrigin="0 0"
          transition="font-size 0.3s, transform 0.3s"
        >
          {placeholder}
        </FormLabel>
      </Box>

      {type === 'password' && (
        <InputRightElement h="16" pr="6">
          <Icon
            as={showPassword ? RiEyeOffLine : RiEyeLine}
            fontSize="24"
            color="gray.200"
            cursor="pointer"
            onClick={() => setShowPassword(!showPassword)}
          />
        </InputRightElement>
      )}
    </InputGroup>
  );
}
