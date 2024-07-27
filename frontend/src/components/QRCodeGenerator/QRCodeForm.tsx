import React from 'react';
import {
  VStack, FormControl, FormLabel, Input, Select, Button,
  NumberInput, NumberInputField, NumberInputStepper,
  NumberIncrementStepper, NumberDecrementStepper,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

type QRCodeData = {
  text: string;
  shape: string;
  fgColor: string;
  bgColor: string;
  eyeColor: string;
  eyeStyle: string;
  pattern: string;
  size: number;
};

type QRCodeFormProps = {
  qrCodeData: QRCodeData;
  setQRCodeData: React.Dispatch<React.SetStateAction<QRCodeData>>;
  onGenerate: () => void;
  isLoading: boolean;
};

const QRCodeForm: React.FC<QRCodeFormProps> = ({ qrCodeData, setQRCodeData, onGenerate, isLoading }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: qrCodeData
  });

  const onSubmit = (data: QRCodeData) => {
    setQRCodeData(data);
    onGenerate();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4} align="stretch">
        <FormControl isInvalid={!!errors.text}>
          <FormLabel>QR Code Content</FormLabel>
          <Input
            {...register("text", { required: "Content is required" })}
            placeholder="Enter URL or text"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Shape</FormLabel>
          <Select {...register("shape")}>
            <option value="square">Square</option>
            <option value="rounded">Rounded</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Size</FormLabel>
          <NumberInput
            min={128}
            max={512}
            step={8}
            defaultValue={qrCodeData.size}
          >
            <NumberInputField {...register("size", { valueAsNumber: true })} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        {/* Add more form fields for other QR code properties */}
        <Button
          type="submit"
          colorScheme="brand"
          isLoading={isLoading}
          loadingText="Generating"
        >
          Generate QR Code
        </Button>
      </VStack>
    </form>
  );
};

export default QRCodeForm;
