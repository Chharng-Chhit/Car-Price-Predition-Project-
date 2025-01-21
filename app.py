import flask
from flask import request, jsonify
import joblib
import pandas as pd
import numpy as np
from waitress import serve
from flask_cors import CORS

# Load the trained model and scaler from the files
models = {
    'Neural Network'    : joblib.load('./model/Neural-Network-Model.pkl'),
    'Random Forrest'    : joblib.load('./model/RFR-Model.pkl'),
    'Decision Tree'     : joblib.load('./model/DT-Model.pkl'),
    'Gradient Boosting' : joblib.load('./model/GB-Model.pkl'),
    'LightGBM'          : joblib.load('./model/LGB-Model.pkl'),
    'XGBoost'           : joblib.load('./model/XGB-Model.pkl'),
    'Elastic Net'       : joblib.load('./model/ENR-Model.pkl'),
    'Ridge'             : joblib.load('./model/Ridge-Model.pkl'),
    'Lasso'             : joblib.load('./model/Lasso-Model.pkl')
}

scaler = joblib.load('./model/scaler.pkl')

# Initialize Flask app
app = flask.Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Welcome to the Car Price Prediction API!"

# Inverse Box-Cox transformation for 'Price'
def inverse_boxcox(transformed_data, lambda_param):
    try:
        if lambda_param == 0:
            return np.exp(transformed_data)
        else:
            return (lambda_param * transformed_data + 1) ** (1 / lambda_param)
    except Exception as e:
        print(f"Error in Box-Cox transformation: {e}")
        return np.nan  # Return NaN if transformation fails

# Endpoint to predict car price
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get data from POST request
        data = request.get_json()
        print(data)

        # Convert data into a DataFrame
        real_df = pd.DataFrame([data])
        # print(float(real_df['Year']))

        # Ensure 'Year' is an integer
        real_df['Year'] = float(real_df['Year'])

        # Feature engineering: Add 'Car Age' feature
        real_df['Car Age'] = float(2025 - real_df['Year'])  # Assuming 'Year' is provided
        real_df['Year'] = float(real_df['Year'])  # Convert 'Year' to float properly

        # One-hot encode categorical columns
        real_df = pd.get_dummies(real_df, columns=['Car Makes', 'Tax Type', 'Condition', 'Body Type', 'Fuel', 'Transmission', 'Color', 'Car Model'])

        # Feature engineering (Add 'Car Age' feature)
        real_df['Car Age'] = 2025 - real_df['Year'].astype(float)
        real_df['Year'] = real_df['Year'].astype(float)

        

        # Load columns from a CSV to ensure the model columns are aligned
        df = pd.read_csv('./data/columns_list.csv')
        train_columns = df['Column Names'].tolist()

        # Ensure all columns that the model expects are present
        real_df = real_df.reindex(columns=train_columns, fill_value=0)

        real_df = real_df.drop(columns=['Price'], errors='ignore')

        real_df_scaled = scaler.transform(real_df)
        # Initialize a DataFrame to store results
        results = {}

        # Print the shape to check if it's still empty
        print("Shape of real_df after reindexing:", real_df.shape)

        # Proceed if there are rows in real_df
        if real_df.shape[0] > 0:
            # Predict prices for each model
            for model_name, model in models.items():
                if model_name != 'Neural Network':
                    predicted_price = model.predict(real_df_scaled)
                    predicted_price_original = inverse_boxcox(predicted_price.flatten(), -0.02832931484315432)
                    if not np.isnan(predicted_price_original[0]):  # Check if predicted value is not NaN
                        results[model_name] = [f"${predicted:,.2f}" for predicted in predicted_price_original]
                    else:
                        results[model_name] = ["Prediction failed"]
                else: 
                    predicted_price = model.predict(real_df)
                    predicted_price_original = inverse_boxcox(predicted_price.flatten(), -0.02832931484315432)
                    if not np.isnan(predicted_price_original[0]):  # Check if predicted value is not NaN
                        results[model_name] = [f"${predicted:,.2f}" for predicted in predicted_price_original]
                    else:
                        results[model_name] = ["Prediction failed"]

            # Display the results
            print(results)

            # Return the predicted price
            return jsonify({'predicted_prices': results})

        else:
            return jsonify({'error': 'The DataFrame is empty, please check your data.'})

    except Exception as e:
        return jsonify({'error': str(e)})

# Run the app
if __name__ == '__main__':
    app.run(debug=True, threaded=True)
