import { ScrollArea, Stack, Text } from '@mantine/core';

const Messages = ({ messages }) => (
  <ScrollArea flex={1} p="md">
    <Stack gap="xs">
      {messages.map((message) => (
        <Text key={message.id} style={{ overflowWrap: 'anywhere' }}>
          <Text span fw={700}>{message.username}</Text>
          {`: ${message.body}`}
        </Text>
      ))}
    </Stack>
  </ScrollArea>
);

export default Messages;
