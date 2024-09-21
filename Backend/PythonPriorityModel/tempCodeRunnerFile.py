from flask import Flask, request, jsonify
import nltk
import spacy
nltk.download('punkt')

nlp = spacy.load("en_core_web_sm")  # Load a spaCy model (adjust the model name if needed)

app = Flask(__name__)

# Function to assign priority based on keywords in a sentence
def assign_priority(sentence):
    doc = nlp(sentence)

    URG_keywords = ['war', 'floods', 'flood', 'natural disaster', 'rescue operation', 'earthquake', 'calamity', 'volcano eruption', 'refugees']
    highp_keywords = ['armed conflict', 'violence', 'cancer', 'death', 'emergency', 'pandemic', 'disease', 'immediate', 'dying']
    midp_keywords = ['ill', 'hospital', 'hunger', 'child', 'food', 'shelter', 'animal', 'stray animals', 'accident', 'water scarcity', 'surgery']
    lowp_keywords = ['trees', 'climate change', 'climate', 'pollution', 'abandoned', 'conservation', 'sustainable', 'future generation', 'future', 'planet', 'soil erosion', 'homeless', 'nutritional', 'foodsupplies']

    priority_score = 0

    # Assign priority based on keyword matches
    for token in doc:
        if token.text in URG_keywords:
            priority_score += 5
        elif token.text in highp_keywords:
            priority_score += 2
        elif token.text in midp_keywords:
            priority_score += 1.5
        elif token.text in lowp_keywords:
            priority_score += 1

    # Cap the priority score at 5
    priority_score = min(priority_score, 5)
    return priority_score

# Uncomment this section to test the function
# sentence='The floods have caused massive destruction in the city. The rescue operation is underway.'
# comment= assign_priority(sentence)
# print(comment)

@app.route('/assign_priority', methods=['POST'])
def get_priority():
    try:
        # Get the JSON data from the request
        data = request.get_json()

        # Ensure 'message' field is present
        if 'message' not in data:
            return jsonify({'error': 'No sentence field found in JSON data'}), 400

        para = data['message']

        # Call the assign_priority function
        priority = assign_priority(para)

        # Return the priority score as a JSON response
        return jsonify({'priority_score': priority})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)

