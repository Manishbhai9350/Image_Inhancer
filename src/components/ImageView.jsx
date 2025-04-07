import React, { useContext, useEffect, useRef } from 'react'
import { FileContext } from '../context/File.context'

const ImageView = ({width=0,height}) => {
    const {NonInhancesImageURL,File,InhancedFile,InhancedImageURL} = useContext(FileContext)
    const Line = useRef(null)
    const Con = useRef(null)
    const XPercent = useRef(50)
    const NonInRef = useRef(null)

    const UpdateClipPath = () => {
        NonInRef.current.style.clipPath = `polygon(0% 0% , ${XPercent.current}% 0% , ${XPercent.current}% 100% , 0% 100%)`
    }
    
    const MouseMove = (e) => {
        const ConRect = Con.current.getBoundingClientRect()
        const InnerX = (e.clientX - ConRect.left) / ConRect.width * 100
        XPercent.current = InnerX
        Line.current.style.left = `${XPercent.current}%`
        UpdateClipPath()
    }
    const MouseLeave = e => {
        XPercent.current = 50
        Line.current.style.left = `${XPercent.current}%`
        UpdateClipPath()
    }

    useEffect(() => {
        Con?.current?.addEventListener('mousemove',MouseMove)
        Con?.current?.addEventListener('mouseleave',MouseLeave)
      return () => {
        Con?.current?.removeEventListener('mousemove',MouseMove)
        Con?.current?.removeEventListener('mouseleave',MouseLeave)
      }
    }, [])
    


  return (
    <div className='relative flex justify-center items-center border border-dashed  border-white ' style={{width,height}}>
        <div ref={Con} style={{width:width-10,height:height-10}} className="images border-dotted  relative overflow-hidden">
            <img className="inhanced absolute  w-full h-full top-1/2 left-1/2 -translate-1/2" src={InhancedImageURL} />
            <img ref={NonInRef} className="non-inhanced absolute  w-full h-full top-1/2 left-1/2 -translate-1/2" src={NonInhancesImageURL} />
            <div ref={Line} style={{height:height-10,width:2,left:`${XPercent.current}%`}} className="line absolute bg-white top-0   -translate-x-1/2 "></div>
          </div>
    </div>
  )
}

export default ImageView