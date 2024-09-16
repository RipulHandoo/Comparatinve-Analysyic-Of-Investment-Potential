from flask import Flask, jsonify
import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, LSTM
import math
from sklearn.metrics import mean_squared_error

app = Flask(__name__)

@app.route('/run_model', methods=['GET'])
def run_model():
    # Load and prepare data
    df = pd.read_csv('data.csv')
    df2 = df.reset_index()['close']

    # Normalize the dataset
    scaler = MinMaxScaler(feature_range=(0, 1))
    df2 = scaler.fit_transform(np.array(df2).reshape(-1, 1))

    # Split data into train and test sets
    train_size = int(len(df2) * 0.65)
    test_size = len(df2) - train_size
    train_data, test_data = df2[0:train_size, :], df2[train_size:len(df2), :1]

    # Function to create dataset with given time step
    def create_dataset(dataset, time_step=1):
        dataX, dataY = [], []
        for i in range(len(dataset) - time_step - 1):
            a = dataset[i:(i + time_step), 0]
            dataX.append(a)
            dataY.append(dataset[i + time_step, 0])
        return np.array(dataX), np.array(dataY)

    # Create train and test datasets
    time_step = 100
    X_train, Y_train = create_dataset(train_data, time_step)
    X_test, Y_test = create_dataset(test_data, time_step)

    # Reshape input to be [samples, time steps, features]
    X_train = X_train.reshape(X_train.shape[0], X_train.shape[1], 1)
    X_test = X_test.reshape(X_test.shape[0], X_test.shape[1], 1)

    # Build and train the LSTM model
    model = Sequential()
    model.add(LSTM(50, return_sequences=True, input_shape=(X_train.shape[1], 1)))
    model.add(LSTM(50, return_sequences=True))
    model.add(LSTM(50))
    model.add(Dense(1))
    model.compile(loss='mean_squared_error', optimizer='adam')

    model.summary()

    model.fit(X_train, Y_train, validation_data=(X_test, Y_test), epochs=1, batch_size=64, verbose=1)

    # Predicting using the trained model
    train_predict = model.predict(X_train)
    test_predict = model.predict(X_test)

    # Inverse transform predictions and actual values
    train_predict = scaler.inverse_transform(train_predict)
    test_predict = scaler.inverse_transform(test_predict)
    Y_train = scaler.inverse_transform(Y_train.reshape(-1, 1))
    Y_test = scaler.inverse_transform(Y_test.reshape(-1, 1))

    # Calculate RMSE
    train_rmse = math.sqrt(mean_squared_error(Y_train, train_predict))
    test_rmse = math.sqrt(mean_squared_error(Y_test, test_predict))

    # Return the RMSE values as JSON
    return jsonify({
        'train_rmse': train_rmse,
        'test_rmse': test_rmse
    })

if __name__ == "__main__":
    app.run(debug=True)
