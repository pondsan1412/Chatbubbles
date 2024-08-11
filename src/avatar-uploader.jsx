import React, { useState } from 'react';
import './avatar-uploader.css'; // Create this file for any additional styles

const AvatarUploader = ({ onUpload }) => {
  const [avatar, setAvatar] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
        onUpload(reader.result); // Pass the uploaded avatar URL to the parent component
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="avatar-uploader">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {avatar && <img src={avatar} alt="Avatar Preview" className="avatar-preview" />}
    </div>
  );
};

export default AvatarUploader;
