import FileUpload from './components/FileUpload'
import React from 'react'

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
        fetch("https://hf.space/embed/benkarr/bird-classifier/+/api/predict", {
            method: "POST",
            body: JSON.stringify({data: [preview]}),
            headers: {"Content-Type": "application/json"}
        })
        .then((res) => res.json())
        .then( data => {
            console.log(data.data[0]);
            setPredictions(data.data[0]);
        });
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
                {preview ? <img src={preview} className="content" onClick={clear}/> : <FileUpload image={image} setImage={setImage}/>}
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
                                    {predictions.confidences.map(item => <li key={item.label}>{item.label}: {(item.confidence*100).toFixed(2)}%</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}