import { CheckboxGroup, FormControl, Heading, SimpleGrid, Checkbox as ChakraCheckbox, CheckboxGroupProps, FormErrorMessage } from "@chakra-ui/react";
import { FieldError } from 'react-hook-form';

interface CheckboxProps extends CheckboxGroupProps {
  options: {
    value: string | number;
    label: string;
  }[];
  error?: FieldError;
}

export function Checkbox({ options, error = null, ...rest }: CheckboxProps) {
  return (
    <FormControl isInvalid={!!error}>
      <CheckboxGroup colorScheme="red" {...rest}>
        <SimpleGrid columns={3} spacing="6">
          {options.map(option => (
            <ChakraCheckbox key={option.value} value={option.value}>{option.label}</ChakraCheckbox>
          ))}
        </SimpleGrid>
      </CheckboxGroup>

      {!!error && (
        <FormErrorMessage>
          {error.message}
        </FormErrorMessage>
      )}
    </FormControl>
  )
}