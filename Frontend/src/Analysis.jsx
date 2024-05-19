
import React, { useState } from "react";
const Analysis = () => {
    const [predictionResult, setPredictionResult] = useState("");
    const[graph,setGraph] = useState(false);


const predict = () => {
  const csvFileInput = document.getElementById("csvFileInput");
  const textInput = document.getElementById("textInput");

  // Reset prediction result to an empty string
  setPredictionResult("");

  // Set prediction result to "Loading..." when form is submitted
  setPredictionResult("Loading...");

  if (csvFileInput.files.length > 0) {
      const formData = new FormData();
      formData.append("file", csvFileInput.files[0]);

      fetch("http://localhost:5000/predict", {
          method: "POST",
          body: formData,
          headers: {
              "Accept": "application/json",
              "Access-Control-Allow-Headers": "x-requested-with, content-type, x-graph-data"
          }
      })
      .then(response => {
          console.log(response.headers.get("X-Graph-Exists"));
          if (response.headers.get("X-Graph-Exists") === "true") {
              console.log("Graph")
              const graphData = response.headers.get("X-Graph-Data");
              console.log(graphData)
              displayGraph(graphData);
              setPredictionResult("");
          }
          else {
              console.log(response.headers.get("X-Graph-Exists"))
          }

          return response.blob();
      })
      .then(blob => {
          console.log("Blob:", blob);

          document.getElementById("downloadBtn").style.display = "block";
          document.getElementById("downloadBtn").onclick = function () {
              console.log("Downloading...");
              var url = URL.createObjectURL(blob);
              console.log("URL:", url);

              var a = document.createElement("a");
              a.href = url;
              a.download = "Predictions.csv";
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
          };

          // Clear form data
          csvFileInput.value = "";
      })
      .catch(error => {
          console.log("Error:", error);
      });
  }
  else if (textInput.value.trim() !== "") {
      fetch("http://localhost:5000/predict", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ text: textInput.value.trim() })
      })
      .then(response => response.json()
      )
      .then(data => {
          console.log("Program runs ");
          console.log(data);
          // Handle the prediction result
          if(data.prediction){
              setPredictionResult(data.prediction);
              displayGraph(null);
          }
          else{
              setPredictionResult("Loading...");
          }

          // Clear form data
          textInput.value = "";
      })
      .catch(error => {
          console.log("Error:", error);
      });
  }
};

    
    const displayGraph = (graphData) => {
      if(graphData){

        const graphContainer = document.getElementById("graphContainer");
        graphContainer.innerHTML = "";
      const img = document.createElement("img");
      img.src = "data:image/png;base64," + graphData;
      graphContainer.appendChild(img);
      setGraph(true);
    }
    else{
      const graphContainer = document.getElementById("graphContainer");
        graphContainer.innerHTML = "";
        setGraph(false);
    }
    };
    const downloadPredictions = () => {
      // Implement download logic here
      console.log("Downloading predictions...");
    };
  
  return (
    <div>
    <section
      className="py-5"
      style={{
        position: "relative",
        paddingTop: "70px",
        // backgroundImage: "url('https://source.unsplash.com/1600x900/?movie')",
        backgroundColor:"#afafbd",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
      }}
    >
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="display-7 fw-bold mt-5">Reviews Sentiment Prediction</h1>
          <p className="lead">
            Analyze text sentiment to gain insights into emotions and
            viewpoints.
          </p>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card shadow p-4">
              <h2 className="h4 fw-bold mb-4 text-center">
                Sentiment Analysis
              </h2>
              <form id="predictionForm" className="mb-4">
                <div className="mb-3">
                  <label
                    htmlFor="csvFileInput"
                    className="form-label fw-bold"
                  >
                    Upload CSV File
                  </label>
                  <input
                    id="csvFileInput"
                    type="file"
                    accept=".csv"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="textInput"
                    className="form-label fw-bold"
                  >
                    Enter Text
                  </label>
                  <textarea
                    id="textInput"
                    className="form-control"
                    placeholder="Enter text..."
                  ></textarea>
                </div>
                <button
                  type="button"
                  onClick={predict}
                  className="btn btn-primary btn-block"
                >
                  Predict Sentiment
                </button>
              </form>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card shadow p-4">
              <h2 className="h4 fw-bold mb-4 text-center">
                Get a free online Sentiment Prediction
              </h2>
              <hr />
              <div className="mb-3">
                <h3 className="h5 fw-bold mb-3">Prediction Result:</h3>
                <input
                  id="predictionResult"
                  value={predictionResult}
                  className="form-control"
                  readOnly
                />
              </div>
              <div className="mb-3">
                <h3 className="h5 fw-bold mb-3">Graph Result:</h3>
                <div id="graphContainer" className="border p-3" style={{ maxWidth: "100%", overflowX: "auto" }}></div>
              </div>
              {graph
               ?
               (
                 <button
                 id="downloadBtn"
               className="btn btn-dark btn-block"
               style={{ display: "none" }}
               onClick={downloadPredictions}
               >
                Download Predictions
              </button>
              
            )
              :
              <></>
            }
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  )
}

export default Analysis