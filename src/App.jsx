import { AnimatePresence } from 'framer-motion';
import { useCallback, useState } from 'react';
import axios from 'axios';
import './App.css';
import Bubble from './Bubble';
import BubbleInput from './BubbleInput';
import Chat from './chat';
import useMessages from './use-messages';
import { SketchPicker } from 'react-color';
import AvatarUploader from './avatar-uploader';

function App() {
  const [messages, addMessage] = useMessages([]);
  const [newMessage, setNewMessage] = useState('');
  const [fillColour, setFillColour] = useState('#e6e5eb');
  const [strokeColour, setStrokeColour] = useState('#000000');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async (bubbleHeight, avatarUrl) => {
    if (newMessage.length > 0) {
      setLoading(true);
      try {
        // ส่งข้อความไปยัง API สำหรับการแปล
        const response = await axios.post('http://127.0.0.1:8000/api/translate', { text: newMessage });


        const translatedMessage = response.data.translated_text;

        // เพิ่มข้อความที่แปลแล้วไปยังข้อความ
        addMessage({
          id: +new Date(),
          text: translatedMessage,
          height: bubbleHeight,
          avatarUrl
        });
        setNewMessage('');
      } catch (error) {
        console.error('Translation error:', error);
      } finally {
        setLoading(false);
      }
    }
  }, [newMessage, addMessage]);

  const handleFillColourChange = (color) => {
    setFillColour(color.hex);
  };

  const handleStrokeColourChange = (color) => {
    setStrokeColour(color.hex);
  };

  const lastMessage = messages[messages.length - 1];
  const dy = lastMessage ? lastMessage.height : 0;

  return (
    <div className="App">
      <AvatarUploader onUpload={setAvatarUrl} />
      <Chat>
        <AnimatePresence>
          {messages.map(m => (
            <Bubble
              key={m.id}
              id={m.id}
              dy={dy}
              fillColour={fillColour}
              strokeColour={strokeColour}
              avatarUrl={m.avatarUrl}
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
          avatarUrl={avatarUrl}
        />
        {loading && <div>Loading...</div>}
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
