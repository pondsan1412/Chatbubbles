import { AnimatePresence } from 'framer-motion';
import { useCallback, useState } from 'react';
import './App.css';
import Bubble from './Bubble';
import BubbleInput from './BubbleInput';
import Chat from './chat';
import useMessages from './use-messages';
import { SketchPicker } from 'react-color';
import AvatarUploader from './avatar-uploader'; // Add this if you include the avatar uploader component

function App() {
  const [messages, addMessage] = useMessages([]);
  const [newMessage, setNewMessage] = useState('');
  const [fillColour, setFillColour] = useState('#e6e5eb');
  const [strokeColour, setStrokeColour] = useState('#000000');
  const [avatarUrl, setAvatarUrl] = useState(''); // State for avatar URL

  const handleSubmit = useCallback(
    (bubbleHeight, avatarUrl) => {
      if (newMessage.length > 0) {
        addMessage({
          id: +new Date(),
          text: newMessage,
          height: bubbleHeight,
          avatarUrl // Include avatarUrl in the message
        });
        setNewMessage('');
      }
    },
    [newMessage, messages]
  );

  const handleFillColourChange = (color) => {
    setFillColour(color.hex);
    console.log(color);
  };

  const handleStrokeColourChange = (color) => {
    setStrokeColour(color.hex);
    console.log(color);
  };

  const lastMessage = messages[messages.length - 1];
  const dy = lastMessage ? lastMessage.height : 0;

  return (
    <div className="App">
      <AvatarUploader onUpload={setAvatarUrl} /> {/* Add this if you include the avatar uploader component */}
      <Chat>
        <AnimatePresence>
          {messages.map(m => (
            <Bubble
              key={m.id}
              id={m.id}
              dy={dy}
              fillColour={fillColour}
              strokeColour={strokeColour}
              avatarUrl={m.avatarUrl} // Pass avatar URL to Bubble
            >
              {m.text}
            </Bubble>
          ))}
        </AnimatePresence>
        <BubbleInput
          value={newMessage}
          onChange={setNewMessage}
          onSubmit={handleSubmit}
          fillColour={fillColour}
          strokeColour={strokeColour}
          avatarUrl={avatarUrl} // Pass avatar URL to BubbleInput
        />
      </Chat>
      
      <div className="picker">
        <p>Fill</p>
        <SketchPicker color={fillColour} onChange={handleFillColourChange} />
        <p>Stroke</p>
        <SketchPicker color={strokeColour} onChange={handleStrokeColourChange} />
      </div>
    </div>
  );
}

export default App;
