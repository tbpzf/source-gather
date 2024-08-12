'use client';
import React, { useState } from 'react';
import axios from 'axios';

const blobToBase64 = (blob: Blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const ScreenshotComponent = () => {
  const [url, setUrl] = useState('');
  const [screenshot, setScreenshot] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/screenshot', {
        url,
      });

      console.log('response', response.data);
      setScreenshot(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Generate Screenshot'}
        </button>
      </form>
      {screenshot && (
        <img src={screenshot} alt="Screenshot" style={{ maxWidth: '100%' }} />
      )}
    </div>
  );
};

export default ScreenshotComponent;
