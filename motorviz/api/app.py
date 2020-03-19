import sys
from flask import Flask, request

from motorrefgen.config import ExperimentConfig
from motorrefgen.experiment import Experiment

from motorsim.simconfig import SimConfig
from motorsim.simulators.conn_python import Py2Mat

app = Flask(__name__)
config = ExperimentConfig()
simconfig = SimConfig()

@app.route('/getconfig')
def get_experiment_config():
    data = config.get_config_json()
    return data

@app.route('/getsimconfig')
def get_simulator_config():
    data = simconfig.get_config_json()
    return data

@app.route('/setconfig', methods=['POST'])
def set_experiment_config():
    data = request.get_json()
    config.set_config_from_json(data)
    return data

@app.route('/setsimconfig', methods=['POST'])
def set_simulator_config():
    data = request.get_json()
    simconfig.set_config_from_json(data)
    return data

@app.route('/generate')
def generate_reference_data():
    experiment = Experiment(config=config)
    ref_speed = []
    for i in range(len(experiment.reference_speed)):
        ref_speed.append({'x': experiment.speed_time[i],
                          'y': experiment.reference_speed[i]})


    ref_torque = []
    for i in range(len(experiment.reference_torque)):
        ref_torque.append({'x': experiment.torque_time[i],
                          'y': experiment.reference_torque[i]})

    time_domain = [experiment.torque_time[0], experiment.torque_time[-1]]
    speed_domain = experiment.config.speed_range
    torque_domain = experiment.config.torque_range

    return {'ref_speed': ref_speed,
            'ref_torque': ref_torque,
            'time_domain': time_domain,
            'speed_domain': speed_domain,
            'torque_domain': torque_domain}
