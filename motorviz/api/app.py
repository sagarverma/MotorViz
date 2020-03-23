import sys
import copy
import time

from flask import Flask, request

from motorrefgen.config import ExperimentConfig
from motorrefgen.experiment import Experiment

from motorsim.simconfig import SimConfig
from motorsim.simulators.conn_python import Py2Mat

app = Flask(__name__)
config = ExperimentConfig()
simconfig = SimConfig()
simulator = Py2Mat(simconfig)
experiment = None

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
    simulator.reconfigure(simconfig)

@app.route('/generate')
def generate_reference_data():
    global experiment
    experiment = Experiment(config=config)
    ref_speed = []
    for i in range(len(experiment.reference_speed)):
        ref_speed.append({'x': round(experiment.speed_time[i], 5),
                          'y': round(experiment.reference_speed[i], 2)})


    ref_torque = []
    for i in range(len(experiment.reference_torque)):
        ref_torque.append({'x': round(experiment.torque_time[i], 5),
                          'y': round(experiment.reference_torque[i], 2)})

    time_domain = [experiment.torque_time[0], experiment.torque_time[-1]]
    speed_domain = experiment.config.speed_range
    torque_domain = experiment.config.torque_range

    return {'ref_speed': ref_speed,
            'ref_torque': ref_torque,
            'time_domain': time_domain,
            'speed_domain': speed_domain,
            'torque_domain': torque_domain}

@app.route('/simulate')
def simulate():
    global experiment
    experiment.simulate(simulator)
    ref_speed = []
    for i in range(len(experiment.reference_speed)):
        ref_speed.append({'x': round(experiment.speed_time[i], 5),
                          'y': round(experiment.reference_speed[i], 2)})


    ref_torque = []
    for i in range(len(experiment.reference_torque)):
        ref_torque.append({'x': round(experiment.torque_time[i], 5),
                          'y': round(experiment.reference_torque[i], 2)})

    time_domain = [experiment.torque_time[0], experiment.torque_time[-1]]
    speed_domain = experiment.config.speed_range
    torque_domain = experiment.config.torque_range

    voltage_d = []
    for i in range(len(experiment.time)):
        voltage_d.append({'x': round(experiment.time[i], 5),
                          'y': round(experiment.voltage_d[i], 2)})

    voltage_q = []
    for i in range(len(experiment.time)):
        voltage_q.append({'x': round(experiment.time[i], 5),
                          'y': round(experiment.voltage_q[i], 2)})

    voltage_domain = [min(experiment.voltage_d.min(), experiment.voltage_q.min()),
                      max(experiment.voltage_d.max(), experiment.voltage_q.max())]

    current_d = []
    for i in range(len(experiment.time)):
        current_d.append({'x': round(experiment.time[i], 5),
                          'y': round(experiment.current_d[i], 2)})

    current_q = []
    for i in range(len(experiment.time)):
        current_q.append({'x': round(experiment.time[i], 5),
                          'y': round(experiment.current_q[i], 2)})

    current_domain = [min(experiment.current_d.min(), experiment.current_q.min()),
                      max(experiment.current_d.max(), experiment.current_q.max())]

    torque = []
    for i in range(len(experiment.time)):
        torque.append({'x': round(experiment.time[i], 5),
                          'y': round(experiment.torque[i], 2)})

    speed = []
    for i in range(len(experiment.time)):
        speed.append({'x': round(experiment.time[i], 5),
                          'y': round(experiment.speed[i], 2)})

    statorPuls = []
    for i in range(len(experiment.time)):
        statorPuls.append({'x': round(experiment.time[i], 5),
                          'y': round(experiment.statorPuls[i], 2)})

    reference_torque_interp = []
    for i in range(len(experiment.time)):
        reference_torque_interp.append({'x': round(experiment.time[i], 5),
                          'y': round(experiment.reference_torque_interp[i], 2)})

    reference_speed_interp = []
    for i in range(len(experiment.time)):
        reference_speed_interp.append({'x':round( experiment.time[i], 5),
                          'y': round(experiment.reference_speed_interp[i], 2)})

    print (ref_speed)
    return {'ref_speed': ref_speed,
            'ref_torque': ref_torque,
            'time_domain': time_domain,
            'speed_domain': speed_domain,
            'torque_domain': torque_domain,
            'voltage_d': voltage_d,
            'voltage_q': voltage_q,
            'current_d': current_d,
            'current_q': current_q,
            'torque': torque,
            'speed': speed,
            'statorPuls': statorPuls,
            'reference_torque_interp': reference_torque_interp,
            'reference_speed_interp': reference_speed_interp,
            'current_domain': current_domain,
            'voltage_domain': voltage_domain
            }
