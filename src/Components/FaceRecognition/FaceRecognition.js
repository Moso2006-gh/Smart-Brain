import React from "react";
import "./FaceRecognition.css"

const FaceRecognition = ({imgUrl, box}) => {
    return(
        <div className="FaceReognition pv4 center ma">
            <div className="absolute mt2">
                <img id="InputImage" className="FaceImage shadow-1 mb4" src={imgUrl} alt="Foto"
                height="auto"/>
                {console.log(box)}
                <div style={{
                    left: box.leftCol, 
                    top: box.topRow, 
                    right: box.rightCol, 
                    bottom: box.bottomRow 
                }} 
                className="bounding-box"/>
            </div>
        </div>
    )
}

export default FaceRecognition;