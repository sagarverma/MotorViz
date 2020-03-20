# MotorViz
Visualize different modules related to motor control and operations.

### Matlab python engine installation (if not already done for MotorSim or MotorRefGen libraries(
```
cd /usr/local/MATLAB/{VERSION}/extern/engines/
sudo chmod -R 775 python
cd python
pip install -e .
```

### Install MotorSim library
```
git clone https://github.com/sagarverma/MotorSim.git
cd MotorSim
pip install -e .
```

### Install MotorRefGen library
```
git cline https://github.come/sagarverma/MotorRefGen.git
cd MotorRefGen
pip install -e .
```

### Install this library
```
pip install -r requirements.txt
pip install -e .
```

### Usage 
```
cd MotorViz/motorviz
npm start
cd MotorViz/motorviz/api
flask run 
```
