import sys
import copy
import time

from flask import Flask, request

from motorrefgen.config import ExperimentConfig
from motorrefgen.experiment import Experiment

from motorsim.simconfig import SimConfig
from motorsim.simulators.conn_python import Py2Mat

from motormetrics.ee import *

app = Flask(__name__)
config = ExperimentConfig()
simconfig = SimConfig()
simconfig.set_config_from_json({'Data_Ts': 0.001})
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

@app.route('/randsimulate')
def rand_simulate():
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

@app.route('/manualsimulate', methods=['POST'])
def manual_simulate():
    data = request.get_json()
    global experiment
    experiment = Experiment(config=config)
    experiment.set_manual_reference(data)

    experiment.simulate(simulator)
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

    return {'voltage_d': voltage_d,
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

@app.route('/computemetrics')
def compute_metrics():
    global experiment

    ref_speed = experiment.reference_speed
    ref_torque = experiment.reference_torque
    ref_speed_t = experiment.speed_time
    ref_torque_t = experiment.torque_time

    ref_speed_interp = experiment.reference_speed_interp
    ref_torque_interp = experiment.reference_torque_interp

    sim_speed = experiment.speed
    sim_torque = experiment.torque

    sim_time = experiment.time

    ramp_scopes = get_ramps_from_raw_reference(ref_speed, ref_speed_t)

    ramp_start_times = []
    perc2_times = []
    perc95_times = []
    following_errs = []
    following_times = []
    overshoot_errs = []
    overshoot_times = []

    for ramp_scope in ramp_scopes:
        sim_ramp_scope = get_ramp_from_sim_reference(sim_time, ramp_scope)

        first_value = ref_speed_interp[sim_ramp_scope[0]]

        ref_speed_scope = ref_speed_interp[sim_ramp_scope[1]: sim_ramp_scope[-1] + 1]
        sim_speed_scope = sim_speed[sim_ramp_scope[1]: sim_ramp_scope[-1] + 1]
        sim_time_scope = sim_time[sim_ramp_scope[1]: sim_ramp_scope[-1] + 1]
        ramp_start_times.append(sim_time[sim_ramp_scope[1]])

        ref_speed_scope, sim_speed_scope = mirror(ref_speed_scope, sim_speed_scope, first_value)

        perc2_time = response_time_2perc(ref_speed_scope,
                            sim_speed_scope, sim_time_scope)
        perc2_times.append(round(perc2_time, 5))

        perc95_time = response_time_95perc(ref_speed_scope,
                            sim_speed_scope, sim_time_scope)
        perc95_times.append(round(perc95_time, 5))

        following_err, following_time = following_error(ref_speed_scope,
                                        sim_speed_scope, sim_time_scope)
        following_errs.append(round(following_err,4))
        following_times.append(round(following_time, 5))

        minn = min(ref_speed_scope)
        maxx = max(ref_speed_scope)

        ref_speed_scope = ref_speed_interp[sim_ramp_scope[2]: sim_ramp_scope[-1] + 1]
        sim_speed_scope = sim_speed[sim_ramp_scope[2]: sim_ramp_scope[-1] + 1]
        sim_time_scope = sim_time[sim_ramp_scope[2]: sim_ramp_scope[-1] + 1]

        ref_speed_scope, sim_speed_scope = mirror(ref_speed_scope, sim_speed_scope, first_value)

        overshoot_err, overshoot_time = overshoot(ref_speed_scope, sim_speed_scope,
                                        minn, maxx, sim_time_scope)

        overshoot_errs.append(round(overshoot_err,4))
        overshoot_times.append(round(overshoot_time, 5))


    return {'perc2_times': perc2_times,
            'perc95_times': perc95_times,
            'following_errs': following_errs,
            'following_times': following_times,
            'overshoot_errs': overshoot_errs,
            'overshoot_times': overshoot_times,
            'ramp_start_times': ramp_start_times}
