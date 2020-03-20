import sys
import copy

from flask import Flask, request

from motorrefgen.config import ExperimentConfig
from motorrefgen.experiment import Experiment

from motorsim.simconfig import SimConfig
from motorsim.simulators.conn_python import Py2Mat

app = Flask(__name__)
config = ExperimentConfig()
simconfig = SimConfig()
simulator = Py2Mat(simconfig)
experiment = Experiment(config=config)

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
    print (data)
    config.set_config_from_json(data)
    return data

@app.route('/setsimconfig', methods=['POST'])
def set_simulator_config():
    data = request.get_json()
    simconfig.set_config_from_json(data)
    simulator.reconfigure(simconfig)

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

@app.route('/simulate')
def simulate():
    experiment.simulate(simulator)
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

    voltage_d = []
    for i in range(len(experiment.time)):
        voltage_d.append({'x': experiment.time[i],
                          'y': experiment.voltage_d[i]})

    voltage_q = []
    for i in range(len(experiment.time)):
        voltage_q.append({'x': experiment.time[i],
                          'y': experiment.voltage_q[i]})

    current_d = []
    for i in range(len(experiment.time)):
        current_d.append({'x': experiment.time[i],
                          'y': experiment.current_d[i]})

    current_q = []
    for i in range(len(experiment.time)):
        current_q.append({'x': experiment.time[i],
                          'y': experiment.current_q[i]})

    torque = []
    for i in range(len(experiment.time)):
        torque.append({'x': experiment.time[i],
                          'y': experiment.torque[i]})

    speed = []
    for i in range(len(experiment.time)):
        speed.append({'x': experiment.time[i],
                          'y': experiment.speed[i]})

    statorPuls = []
    for i in range(len(experiment.time)):
        statorPuls.append({'x': experiment.time[i],
                          'y': experiment.statorPuls[i]})

    reference_torque_interp = []
    for i in range(len(experiment.time)):
        reference_torque_interp.append({'x': experiment.time[i],
                          'y': experiment.reference_torque_interp[i]})

    reference_speed_interp = []
    for i in range(len(experiment.time)):
        reference_speed_interp.append({'x': experiment.time[i],
                          'y': experiment.reference_speed_interp[i]})

    return {'ref_speed': ref_speed,
            'ref_torque': ref_torque,
            'time_domain': time_domain,
            'speed_domain': speed_domain,
            'torque_domain': torque_domain,
            'voltage_d': voltage_d,
            'voltage_q': votlage_q,
            'current_d': current_d,
            'current_q': current_q,
            'torque': torque,
            'speed': speed,
            'statorPuls': statorPuls,
            'reference_torque_interp': reference_torque_interp,
            'reference_speed_interp': reference_speed_interp
            }
