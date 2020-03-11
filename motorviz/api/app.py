from flask import Flask

from motorrefgen.config import ExperimentConfig

app = Flask(__name__)

@app.route('/config')
def get_experiment_config():
    config = ExperimentConfig()
    data = config.get_config_json()

    return data
