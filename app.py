import flask
from flask import request, jsonify
import joblib
import pandas as pd
import numpy as np
from waitress import serve
from sklearn.preprocessing import StandardScaler

# Load the trained model and scaler from the files
# model = joblib.load('nural_network2.pkl')  # Load the model from 'nural_network2.pkl'
# scaler = joblib.load('scaler.pkl')  # Load the scaler from 'scaler.pkl'
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

# Initialize Flask app
app = flask.Flask(__name__)

@app.route('/')
def home():
    return "Welcome to the Car Price Prediction API!"

# Inverse Box-Cox transformation for 'Price'
def inverse_boxcox(transformed_data, lambda_param):
    if lambda_param == 0:
        return np.exp(transformed_data)
    else:
        return (lambda_param * transformed_data + 1) ** (1 / lambda_param)

# Endpoint to predict car price
@app.route('/predict', methods=['POST'])
def predict():
    
    try:
        # Get data from POST request
        data = request.get_json()

        # Convert data into a DataFrame
        real_df = pd.DataFrame([data])

        # Ensure 'Year' is an integer
        real_df['Year'] = float(real_df['Year'])

        # Feature engineering: Add 'Car Age' feature
        real_df['Car Age'] = float(2025 - real_df['Year'])  # Assuming 'Year' is provided
        real_df['Year'] = float(real_df['Year'])  # Convert 'Year' to float properly

        # One-hot encode categorical columns
        real_df = pd.get_dummies(real_df, columns=['Car Makes', 'Tax Type', 'Condition', 'Body Type', 'Fuel', 'Transmission', 'Color', 'Car Model'])

        
        df = pd.read_csv('./data/columns_list.csv')
        columns_list = df['Column Names'].tolist()


        # Ensure all columns that the model expects are present
        real_df = real_df.reindex(columns=columns_list, fill_value=0)
        real_df = real_df.drop(columns=['Price'], errors='ignore')
        real_df_scaled = StandardScaler().transform(real_df)

        # # Assuming you have the lambda used for the Box-Cox transformation during training
        price_lambda = -0.02832931484315432

        # Initialize a DataFrame to store results
        results = pd.DataFrame()

        # Print the shape to check if it's still empty
        print("Shape of real_df after reindexing:", real_df.shape)

        # Proceed if there are rows in real_df
        if real_df.shape[0] > 0:
            # # Scale the transformed data using the scaler
            # predicted_price = model.predict(real_df_scaled)
            
            # print(predicted_price)

            # # Convert the predicted price back to the original scale
            # predicted_price_original = inverse_boxcox(predicted_price.flatten(), price_lambda)

            # Predict prices for each model
            for model_name, model in models.items():
                predicted_price = model.predict(real_df_scaled)
                predicted_price_original = inverse_boxcox(predicted_price.flatten(), price_lambda)
                results[model_name] = [f"${predicted:,.2f}" for predicted in predicted_price_original]

            # Display the results
            print(results)

            # Output the predicted price
            return jsonify({'predicted_price'})
        else:
            return jsonify({'error': 'The DataFrame is empty, please check your data.'})

    except Exception as e:
        return jsonify({'error': str(e)})

# Run the app
if __name__ == '__main__':# Load columns from a CSV to ensure the model columns are aligned
    app.run(debug=True, threaded=True)
