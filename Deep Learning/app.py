

# Importing Dependencies
from flask import Flask, request, jsonify, send_file, render_template
import re
from io import BytesIO
# nltk.download('stopwords')
from nltk.corpus import stopwords
from keras_preprocessing.text import Tokenizer
from nltk.stem.porter import PorterStemmer
from keras_preprocessing.sequence import pad_sequences
import matplotlib.pyplot as plt
from keras.models import load_model
import pandas as pd
import base64
from flask_cors import CORS
STOPWORDS = set(stopwords.words("english"))
stemmer = PorterStemmer()
word_tokenizer = Tokenizer()
# Loading models
predictor = load_model('bigru.h5')
app = Flask(__name__)
CORS(app)

@app.route("/test", methods=["GET"])
def test():
    return "Test request received successfully. Service is running."



@app.route("/predict", methods=["POST"])
def predict():

    try:
        # Check if the request contains a file (for bulk prediction) or text input
        if "file" in request.files:
            # Bulk prediction from CSV file
            file = request.files["file"]
            data = pd.read_csv(file)

            predictions, graph = bulk_prediction(predictor, data)

            response = send_file(
                predictions,
                mimetype="text/csv",
                as_attachment=True,
                download_name="Predictions.csv",
            )

            response.headers["X-Graph-Exists"] = "true"
            response.headers["Access-Control-Expose-Headers"] = "X-Graph-Exists, X-Graph-Data"
            response.headers["X-Graph-Data"] = base64.b64encode(
                graph.getbuffer()
            ).decode("ascii")

            return response

        elif "text" in request.json:
            # Single string prediction
            text_input = request.json["text"]
            predicted_sentiment = single_prediction(predictor, text_input)

            return jsonify({"prediction": predicted_sentiment})

    except Exception as e:
        return jsonify({"error": str(e)})


def single_prediction(predictor, text_input):
    review = re.sub(r'<[^>]+>', "", text_input)
    review = re.sub("[^a-zA-Z]", " ", review)
    review = review.lower().split()
    review = [stemmer.stem(word) for word in review if not word in STOPWORDS]
    review = " ".join(review)
    word_tokenizer.fit_on_texts([review])
    review = word_tokenizer.texts_to_sequences([review])
    max_len=100
    review=pad_sequences(review, padding='post',maxlen=max_len)
    y_predictions=predictor.predict(review)
    y_predictions = (y_predictions>0.5).astype(int)

    return "Positive" if y_predictions == 1 else "Negative"


def bulk_prediction(predictor, data):
    corpus = []
    for i in range(0, data.shape[0]):
        review = re.sub(r'<[^>]+>', "", data.iloc[i]["Sentence"])
        review = re.sub("[^a-zA-Z]", " ", review)
        review = review.lower().split()
        review = [stemmer.stem(word) for word in review if not word in STOPWORDS]
        review = " ".join(review)
        corpus.append(review)
    word_tokenizer.fit_on_texts(corpus)
    corpus = word_tokenizer.texts_to_sequences(corpus)
    max_len=100
    corpus=pad_sequences(corpus, padding='post',maxlen=max_len)
    y_predictions=predictor.predict(corpus)
    y_predictions = (y_predictions>0.5).astype(int)
    y_predictions = list(map(sentiment_mapping, y_predictions))

    data["Predicted sentiment"] = y_predictions
    predictions_csv = BytesIO()

    data.to_csv(predictions_csv, index=False)
    predictions_csv.seek(0)

    graph = get_distribution_graph(data)

    return predictions_csv, graph

# Pie Distribution Graph for Bulk Prediction
def get_distribution_graph(data):
    fig = plt.figure(figsize=(5, 5))
    colors = ("blue", "pink")
    wp = {"linewidth": 1, "edgecolor": "black"}
    tags = data["Predicted sentiment"].value_counts()
    explode = (0.01, 0.01)

    tags.plot(
        kind="pie",
        autopct="%1.1f%%",
        shadow=True,
        colors=colors,
        startangle=90,
        wedgeprops=wp,
        explode=explode,
        title="Sentiment Distribution",
        xlabel="",
        ylabel="",
    )

    graph = BytesIO()
    plt.savefig(graph, format="png")
    plt.close()

    return graph


def sentiment_mapping(x):
    if x == 1:
        return "Positive"
    else:
        return "Negative"


if __name__ == "__main__":
    app.run(port=5000, debug=True)





