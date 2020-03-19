import sys
from flask import Flask, request

from motorrefgen.config import ExperimentConfig
from motorrefgen.experiment import Experiment

app = Flask(__name__)
config = ExperimentConfig()

@app.route('/getconfig')
def get_experiment_config():
    data = config.get_config_json()
    return data

@app.route('/setconfig', methods=['POST'])
def set_experiment_config():
    data = request.get_json()
    print ('here', data, flush=True)
    config.set_config_from_json(data)
    return data
