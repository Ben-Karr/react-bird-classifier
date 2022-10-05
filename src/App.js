import FileUpload from './components/FileUpload'
import React from 'react'

const API = "https://bird-classifier-api.herokuapp.com/"

export default function App(){
    const [image, setImage] = React.useState();
    const [preview, setPreview] = React.useState();
    const [predictions, setPredictions] = React.useState();

    React.useEffect(() => {
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(image);
        } else {
            setPreview(null);
        }
    }, [image]);

    function predict() {
        const formData = new FormData();
        formData.append(
            "file",
            image,
            image.name
        );
        const requestOptions = {
            method: 'POST',
            body: formData
        };

        fetch(API, requestOptions)
        .then(res => res.json())
        .then(res => {
            setPredictions(res);
        })
    }

    function clear() {
        setImage(null);
        setPredictions(null);
    }

    function clickHandler() {
        predictions ? clear() : predict();
    }

    return (
        <div className="App">
            <h1>Bird Classifier</h1>
            <p>Upload a photo of a bird and check which kind it is.</p>
            <div>
                <br/>
                {preview ? <img alt="preview" src={preview} className="content" onClick={clear}/> : <FileUpload image={image} setImage={setImage}/>}
                <div className="predict--card content">
                    {preview && <button onClick={clickHandler}>{predictions ? "Clear" : "Predict"}</button>}
                </div>
                {predictions && (
                    <div className="results content">
                        <h2>Your bird appears to be a {predictions.label}!</h2>
                        <div className="results--details">
                            <h4> The models results:</h4>
                            <div className="results--list">
                                <ul>
                                    {Object.keys(predictions.confidences).map(label => <li key={label}>{label}: {(predictions.confidences[label]*100).toFixed(2)}%</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}