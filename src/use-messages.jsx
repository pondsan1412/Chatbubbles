import { useCallback, useState } from 'react';

const useMessages = (initialValue = []) => {
  const [messages, setMessages] = useState(initialValue);

  const addMessage = useCallback(
    (msg) => {
      setMessages(messages => [...messages, msg]);
      setTimeout(() => {
        setMessages(current => {
          const updatedMessages = [...current];
          updatedMessages.shift();
          return updatedMessages;
        });
      }, 15000);
    },
    [setMessages]
  );

  return [messages, addMessage];
};

export default useMessages;
