import React from "react";
import "./FaceRecognition.css"

const FaceRecognition = ({imgUrl, boxes}) => {
    if(imgUrl == ""){
        return(<></>)
    }
    return(
        <div className="FaceReognition pv4 center ma">
            <div className="absolute mt2">
                <img id="InputImage" className="FaceImage shadow-1 mb4" src={imgUrl} alt="Foto"
                height="auto"/>
                {
                    boxes.map((box, i) => {
                        console.log(box)
                        return(
                            <div key={"box " + i} style={{
                                left: box.leftCol, 
                                top: box.topRow, 
                                right: box.rightCol, 
                                bottom: box.bottomRow 
                            }} 
                            className="bounding-box"/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default FaceRecognition;