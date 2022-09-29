import { getSpaceUntilMaxLength } from '@testing-library/user-event/dist/utils';
import React from 'react'

export default function FileUpload(params){

    const fileInputRef = React.useRef();
    
    const handleChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.substr(0,5)==="image"){
            params.setImage(file);
        } else {
            params.setImage(null);
        }
    }

    const handleClick = (event) => {
        event.preventDefault();
        fileInputRef.current.click();        
    }

    return (
        <div>
            <div className="content upload--card">
                <div className="upload--input">
                    <input type="file" accept="image/*" onChange={handleChange} ref={fileInputRef}/>
                    <button onClick={handleClick} className="button">Select image</button>
                </div>
                <p>Supportet files:</p>
                <p>.png, .jpg, .jpeg, .tif</p>
            </div>
        </div>
    )
}