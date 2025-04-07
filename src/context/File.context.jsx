import { createContext, useEffect, useState } from "react";
import { InhanceImage } from "../services/ImageAPI";

export const FileContext = createContext();

const FileContextProvider = ({ children }) => {
  const [File, setFile] = useState(null);
  const [InhancedImage, setInhancedImage] = useState(null);
  const [InhancedImageURL, setInhancedImageURL] = useState("");
  const [NonInhancesImageURL, setNonInhancessetImageURL] = useState("https://wxtechhk.oss-cn-hongkong.aliyuncs.com/tasks/output/scale/f1acd233-02e9-46f3-94ab-586138626208.png?x-oss-credential=LTAI5tGjJnh66c1txANiRBQN/20250406/cn-hongkong/oss/aliyun_v4_request&x-oss-date=20250406T123719Z&x-oss-expires=3600&x-oss-signature=c8c6888d09528ab6aac01ad6c90765cecebb309508db7baca6d9eb880819d4b8&x-oss-signature-version=OSS4-HMAC-SHA256");
  const [IsInhancing, setIsInhancing] = useState(false);
  const [IsInhanced, setIsInhanced] = useState(false);
  const [Box, setBox] = useState(false);

  async function Inhance() {
    try {
      if (IsInhancing) return;
      setIsInhancing(true);
      setBox(true);
      const FileURL = URL.createObjectURL(File);
      setNonInhancessetImageURL(FileURL);
      const Image = await InhanceImage(File);
      console.log(Image);
      setInhancedImageURL(Image.data.data.image)
      setInhancedImage(Image.data.data);
      console.log(Image.data.data)
      setIsInhanced(true)
    } catch (error) {
        console.log(error)
    } finally{
        setIsInhancing(false)
    }
  }
  return (
    <FileContext.Provider
      value={{ File, setFile, Inhance, Box, setBox, IsInhanced, setIsInhanced, setInhancedImageURL, setInhancedImage, IsInhancing, setIsInhancing, InhancedImage, NonInhancesImageURL, InhancedImageURL }}
    >
      {children}
    </FileContext.Provider>
  );
};

export default FileContextProvider;
