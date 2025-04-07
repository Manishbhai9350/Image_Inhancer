import { useContext, useEffect, useState } from "react";
import FileDropZone from "./components/FileDropBox";
import { FileContext } from "./context/File.context";
import ImageView from "./components/ImageView";
import { InhanceImage } from "./services/ImageAPI";

function App() {
  const {
    File,
    setFile,
    setIsInhanced,
    setInhancedImage,
    setBox,
    setIsInhancing,
    IsInhancing,
    IsInhanced,
    InhancedImage,
    InhancedImageURL,
    Inhance,
    Box,
    NonInhancesImageURL,
  } = useContext(FileContext);
  const [Width, setWidth] = useState(innerWidth * .6 < 400 ? innerWidth * .9 : innerWidth * .6)

  function UpdateWidth(){
    setWidth(innerWidth * .6 < 400 ? innerWidth * .9 : innerWidth * .6)
  }

  useEffect(() => {
    
  
    window.addEventListener('resize',UpdateWidth)
    return () => {
      window.removeEventListener('resize',UpdateWidth)
    }
  }, [])
  

  return (
    <main className="w-screen h-screen overflow-hidden text-white flex flex-col justify-center items-center gap-4  bg-black">
      <h1 className="text-5xl sm:text-6xl font-light text-center">The Only Image Inhancer You Need</h1>
      <h2 className="text-3xl font-normal">Powered By AI</h2>
      <div className="drop-box w-[300px] mt-6">
        <FileDropZone />
      </div>
      <button
        onClick={Inhance}
        disabled={File ? false : true}
        style={{ opacity: File ? 1 : 0.7 }}
        className="inhance rounded-sm cursor-pointer text-3xl font-semibold w-[300px] bg-blue-500 h-[60px]"
      >
        Inhance
      </button>
      {Box && IsInhancing && (
        <div className="box flex justify-center items-center absolute z-10 w-full bg-black/30 h-screen top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="loader p-2 flex flex-col items-center justify-start bg-zinc-800 rounded-md w-[300px] h-[200px]">
            <h1 className="text-2xl">Inhancing The Image</h1>
            <div className="spinner absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <svg
                className="animate-spin h-12 w-12 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      )}
      {Box && IsInhanced && InhancedImage && (
        <div className="box flex justify-center items-center absolute z-10 w-full bg-black/30 h-screen top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className="con w-auto flex flex-col itece
        items-center justify-start h-auto bg-zinc-800 py-2 rounded-sm "
          >
            <h1 className="w-full text-center mb-3 text-3xl">Inhanced Image</h1>
            <ImageView width={Width} height={((InhancedImage?.image_height/InhancedImage?.image_width) * Width) || 0} />
            <div className="flex gap-5">
              <div className="button mt-2 flex items-center justify-center w-[120px] h-[40px] bg-blue-500 text-white">
                <button
                  className="text-2xl text-center block w-full cursor-pointer"
                  onClick={e => {
                    const a = document.createElement('a')
                    a.target = '_blank'
                    a.download = InhancedImageURL
                    a.href = InhancedImageURL
                    a.click()
                  }}
                > 
                  Download
                </button>
              </div>
              <div className="button mt-2 flex items-center justify-center w-[100px] h-[40px] bg-red-500 text-white">
                <button
                  className="text-2xl text-center block w-full cursor-pointer"
                  onClick={e => {
                    const Close = confirm('Do You Really Want To Close')
                    if(Close) {
                      setIsInhanced(false)
                      setIsInhancing(false)
                      setBox(false)
                      setInhancedImage(false)
                      setFile(false)
                    }
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
