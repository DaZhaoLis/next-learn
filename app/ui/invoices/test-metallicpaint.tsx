"use client";


import { useState, useEffect } from 'react';
import MetallicPaint, { parseLogoImage }  from '@/app/ui/MetallicPaint.jsx';


export default  function TestMetallicpatint() {
     const [imageData, setImageData] = useState<ImageData | null>(null);
    
      useEffect(() => {
        async function loadDefaultImage() {
          try {
            const response = await fetch('/logo.svg');
            const blob = await response.blob();
            console.log('xxxx', blob)
            const file = new File([blob], "default.png", { type: blob.type });
    
            const parsedData = await parseLogoImage(file);
            setImageData(parsedData?.imageData ?? null);
            console.log('imageData', parsedData?.imageData)
    
          } catch (err) {
            console.error("Error loading default image:", err);
          }
        }
    
        loadDefaultImage();
        
      }, []);

        if(typeof window !== 'undefined') {
            return  (<div style={{ width: '100%', height: '100vh' }}>
                <MetallicPaint 
                        imageData={imageData} 
                        params={{ edge: 2, patternBlur: 0.005, patternScale: 2, refraction: 0.015, speed: 0.3, liquid: 0.07 }} 
                    />
            </div>)
        }else {
            return (
                <div>111</div>
            )
        }
       
}