import { Text, Flex, Stack } from "@chakra-ui/react";
import { GoCalendar } from "react-icons/go";

interface MessageDateProps {
  titleDate: string;
}

const MessageDate = ({ titleDate }: MessageDateProps) => {
  return (
    <Stack align="center" my={3}>
      <Flex
        bg="whiteAlpha.50"
        width="250px"
        py={0.5}
        borderRadius={4}
        align="center"
        justify="center"
        fontSize={14}
        color="whiteAlpha.700"
      >
        <GoCalendar />
        <Text px={2}>{titleDate}</Text>
      </Flex>
    </Stack>
  );
};

export default MessageDate;
