import React, {Fragment} from 'react';
import './FaceRecognition.css';


const FaceRecognition = ({imageUrl, box}) => {
    return (
        <Fragment>
            <div className='center ma'>
                <div className='absolute mt2'>
                    { imageUrl ? <img id='inputImage' src={imageUrl} alt="uploaded foto" width='500px' height='auto'/> : null }
                    <div
                        style={{
                            top: `${box.topRow}%`,
                            right: `${box.rightCol}%`,
                            bottom: `${box.bottomRow}%`,
                            left: `${box.leftCol}%`
                        }}
                        className='face-box'
                    ></div>
                </div>
            </div>
        </Fragment>


    );
};

export default FaceRecognition;
