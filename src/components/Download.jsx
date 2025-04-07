import React from 'react';

const ImageDownloader = ({ imageUrl, fileName }) => {
  const downloadImage = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = fileName || 'downloaded-image';
      document.body.appendChild(anchor);
      anchor.click();

      // Clean up
      document.body.removeChild(anchor);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading the image:', error);
    }
  };

  return (
    <button className="text-2xl text-center block w-full cursor-pointer" onClick={downloadImage}>
      Download Image
    </button>
  );
};

export default ImageDownloader;
