import { ScrollArea, Stack, Text } from '@mantine/core';

import clean from '../lib/profanity.js';

const Messages = ({ messages }) => (
  <ScrollArea flex={1} p="md">
    <Stack gap="xs">
      {messages.map((message) => (
        <Text key={message.id} style={{ overflowWrap: 'anywhere' }}>
          <Text span fw={700}>{message.username}</Text>
          {`: ${clean(message.body)}`}
        </Text>
      ))}
    </Stack>
  </ScrollArea>
);

export default Messages;
