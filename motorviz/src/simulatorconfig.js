import React from 'react';
import ReactDOM from 'react-dom';

class SimulatorConfig extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        Ts : 0.000250,
        Tpwm : 0.000250,
        Tfixe : 500e-6,
        Rs : 1.5,
        Rr : 0.9,
        Ls : 0.160,
        Lr : 0.160,
        Lm : 0.153,
        Lfs : 0.007,
        Lfr : 0.007,
        Lmt : 0.210,
        P1 : 0.7,
        P2 : 1.5,
        np : 2,
        Psdnom : 0.95,
        Uo : 15,
        Ulim : 415*(2/3)**0.5,
        Psinit : [ 0.95,  0 ],
        Prinit : [ 1,  0 ],
        Inom : 9.1,
        Prdnom : 1,
        SLP_Coeff : 100,
        Vnom : 400,
        SFC_Coeff : 100,
        J : 0.045,
        wrinit : 2*3.14*0,
        thrinit : 0,
        Jm : 0.045,
        tauL : 25,
        wL : 2*3.14*0,
        wCurr : 0,
        wSpeed_PI : 2*3.14*2.5,
        xiSpeed_PI : 1,
        wCurr_PI : 2*3.14*50,
        xiCurr_PI : 1/2,
        wSpeedEst : 2*3.14*500,
        wn : 2*3.14*50,
        Tn : 25
    };
  }
  componentDidMount() {
    fetch('/getsimconfig')
      .then(res => res.json())
      .then(data => this.setState({
        Ts : data.Ts,
        Tpwm : data.Tpwm,
        Tfixe : data.Tfixe,
        Rs : data.Rs,
        Rr : data.Rr,
        Ls : data.Ls,
        Lr : data.Lr,
        Lm : data.Lm,
        Lfs : data.Lfs,
        Lfr : data.Lfr,
        Lmt : data.Lmt,
        P1 : data.P1,
        P2 : data.P2,
        np : data.np,
        Psdnom : data.Psdnom,
        Uo : data.Up,
        Ulim : data.Ulim,
        Psinit : data.Psinit,
        Prinit : data.Prinit,
        Inom : data.Inom,
        Prdnom : data.Prdnom,
        SLP_Coeff : data.SLP_Coeff,
        Vnom : data.Vnom,
        SFC_Coeff : data.SFC_Coeff,
        J : data.J,
        wrinit : data.wrinit,
        thrinit : data.thrinit,
        Jm : data.Jm,
        tauL : data.tauL,
        wL : data.wL,
        wCurr : data.wCurr,
        wSpeed_PI : data.wSpeed_PI,
        xiSpeed_PI : data.xiSpeed_PI,
        wCurr_PI : data.wCurr_PI,
        xiCurr_PI : data.xiCurr_PI,
        wSpeedEst : data.wSpeedEst,
        wn : data.wn,
        Tn : data.Tn
      })
    );
  }
  parseFloatsList(str){
    if (!(typeof str == 'string')){
      return str
    }
    console.log(str);
    var split_str = str.split(",");
    var lst = [];
    for (var i=0; i<split_str.length; i++){
        lst.push(parseFloat(split_str[i]));
    }
    return lst;
  }
  simConfig = (event) => {
    event.preventDefault();
    let data = {
      Ts : parseFloat(this.state.Ts),
      Tpwm : parseFloat(this.state.Tpwm),
      Tfixe : parseFloat(this.state.Tfixe),
      Rs : parseFloat(this.state.Rs),
      Rr : parseFloat(this.state.Rr),
      Ls : parseFloat(this.state.Ls),
      Lr : parseFloat(this.state.Lr),
      Lm : parseFloat(this.state.Lm),
      Lfs : parseFloat(this.state.Lfs),
      Lfr : parseFloat(this.state.Lfr),
      Lmt : parseFloat(this.state.Lmt),
      P1 : parseFloat(this.state.P1),
      P2 : parseFloat(this.state.P2),
      np : parseInt(this.state.np),
      Psdnom : parseFloat(this.state.Psdnom),
      Uo : parseFloat(this.state.Up),
      Ulim : parseFloat(this.state.Ulim),
      Psinit : this.parseFloatsList(this.state.Psinit),
      Prinit : this.parseFloatsList(this.state.Prinit),
      Inom : parseFloat(this.state.Inom),
      Prdnom : parseFloat(this.state.Prdnom),
      SLP_Coeff : parseFloat(this.state.SLP_Coeff),
      Vnom : parseFloat(this.state.Vnom),
      SFC_Coeff : parseFloat(this.state.SFC_Coeff),
      J : parseFloat(this.state.J),
      wrinit : parseFloat(this.state.wrinit),
      thrinit : parseFloat(this.state.thrinit),
      Jm : parseFloat(this.state.Jm),
      tauL : parseFloat(this.state.tauL),
      wL : parseFloat(this.state.wL),
      wCurr : parseFloat(this.state.wCurr),
      wSpeed_PI : parseFloat(this.state.wSpeed_PI),
      xiSpeed_PI : parseFloat(this.state.xiSpeed_PI),
      wCurr_PI : parseFloat(this.state.wCurr_PI),
      xiCurr_PI : parseFloat(this.state.xiCurr_PI),
      wSpeedEst : parseFloat(this.state.wSpeedEst),
      wn : parseFloat(this.state.wn),
      Tn : parseFloat(this.state.Tn)
    }
    fetch('/setsimconfig', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json'}
    });
  }
  render() {
    return (
      <form onSubmit={this.simConfig}>
        <table>
          <tr>
            <td><label>Ts </label></td>
            <td><input
              type='text'
              name='Ts'
              value={this.state.Ts}
              //onChange={this.configure}
            /></td>
            <td><label>Tpwm </label></td>
            <td><input
              type='text'
              name='Tpwm'
              value={this.state.Tpwm}
              //onChange={this.configure}
            /></td>
            <td><label>Tfixe </label></td>
            <td><input
              type='text'
              name='Tfixe'
              value={this.state.Tfixe}
              //onChange={this.configure}
            /></td>
            <td><label>Rs </label></td>
            <td><input
              type='text'
              name='Rs'
              value={this.state.Rs}
              //onChange={this.configure}
            /></td>
            <td><label>Rr </label></td>
            <td><input
              type='text'
              name='Rr'
              value={this.state.Rr}
              //onChange={this.configure}
            /></td>
            <td><label>Ls </label></td>
            <td><input
              type='text'
              name='Ls'
              value={this.state.Ls}
              //onChange={this.configure}
            /></td>
          </tr>
          <tr>
            <td><label>Lr </label></td>
            <td><input
              type='text'
              name='Lr'
              value={this.state.Lr}
              //onChange={this.configure}
            /></td>
            <td><label>Lm </label></td>
            <td><input
              type='text'
              name='Lm'
              value={this.state.Lm}
              //onChange={this.configure}
            /></td>
            <td><label>Lfs </label></td>
            <td><input
              type='text'
              name='Lfs'
              value={this.state.Lfs}
              //onChange={this.configure}
            /></td>
            <td><label>Lfr </label></td>
            <td><input
              type='text'
              name='Lfr'
              value={this.state.Lfr}
              //onChange={this.configure}
            /></td>
            <td><label>Lmt </label></td>
            <td><input
              type='text'
              name='Lmt'
              value={this.state.Lmt}
              //onChange={this.configure}
            /></td>
            <td><label>P1 </label></td>
            <td><input
              type='text'
              name='P1'
              value={this.state.P1}
              //onChange={this.configure}
            /></td>
          </tr>
          <tr>
            <td><label>P2 </label></td>
            <td><input
              type='text'
              name='P2'
              value={this.state.P2}
              //onChange={this.configure}
            /></td>
            <td><label>Lm </label></td>
            <td><input
              type='text'
              name='Lm'
              value={this.state.Lm}
              //onChange={this.configure}
            /></td>
            <td><label>np </label></td>
            <td><input
              type='text'
              name='np'
              value={this.state.np}
              //onChange={this.configure}
            /></td>
            <td><label>Psdnom </label></td>
            <td><input
              type='text'
              name='Psdnom'
              value={this.state.Psdnom}
              //onChange={this.configure}
            /></td>
            <td><label>Uo </label></td>
            <td><input
              type='text'
              name='Uo'
              value={this.state.Uo}
              //onChange={this.configure}
            /></td>
            <td><label>Ulim </label></td>
            <td><input
              type='text'
              name='Ulim'
              value={this.state.Ulim}
              //onChange={this.configure}
            /></td>
          </tr>
          <tr>
            <td><label>Psinit </label></td>
            <td><input
              type='text'
              name='Psinit'
              value={this.state.Psinit}
              //onChange={this.configure}
            /></td>
            <td><label>Prinit </label></td>
            <td><input
              type='text'
              name='Prinit'
              value={this.state.Prinit}
              //onChange={this.configure}
            /></td>
            <td><label>Inom </label></td>
            <td><input
              type='text'
              name='Inom'
              value={this.state.Inom}
              //onChange={this.configure}
            /></td>
            <td><label>Prdnom </label></td>
            <td><input
              type='text'
              name='Prdnom'
              value={this.state.Prdnom}
              //onChange={this.configure}
            /></td>
            <td><label>SLP_Coeff </label></td>
            <td><input
              type='text'
              name='SLP_Coeff'
              value={this.state.SLP_Coeff}
              //onChange={this.configure}
            /></td>
            <td><label>Vnom </label></td>
            <td><input
              type='text'
              name='Vnom'
              value={this.state.Vnom}
              //onChange={this.configure}
            /></td>
          </tr>
          <tr>
            <td><label>SFC_Coeff </label></td>
            <td><input
              type='text'
              name='SFC_Coeff'
              value={this.state.SFC_Coeff}
              //onChange={this.configure}
            /></td>
            <td><label>J </label></td>
            <td><input
              type='text'
              name='J'
              value={this.state.J}
              //onChange={this.configure}
            /></td>
            <td><label>wrinit </label></td>
            <td><input
              type='text'
              name='wrinit'
              value={this.state.wrinit}
              //onChange={this.configure}
            /></td>
            <td><label>thrinit </label></td>
            <td><input
              type='text'
              name='thrinit'
              value={this.state.thrinit}
              //onChange={this.configure}
            /></td>
            <td><label>Jm </label></td>
            <td><input
              type='text'
              name='Jm'
              value={this.state.Jm}
              //onChange={this.configure}
            /></td>
            <td><label>tauL </label></td>
            <td><input
              type='text'
              name='tauL'
              value={this.state.tauL}
              //onChange={this.configure}
            /></td>
          </tr>
          <tr>
            <td><label>wl </label></td>
            <td><input
              type='text'
              name='wl'
              value={this.state.wL}
              //onChange={this.configure}
            /></td>
            <td><label>wCurr </label></td>
            <td><input
              type='text'
              name='wCurr'
              value={this.state.wCurr}
              //onChange={this.configure}
            /></td>
            <td><label>wSpeed_PI </label></td>
            <td><input
              type='text'
              name='wSpeed_PI'
              value={this.state.wSpeed_PI}
              //onChange={this.configure}
            /></td>
            <td><label>xiSpeed_PI</label></td>
            <td><input
              type='text'
              name='xiSpeed_PI'
              value={this.state.xiSpeed_PI}
              //onChange={this.configure}
            /></td>
            <td><label>wCurr_PI </label></td>
            <td><input
              type='text'
              name='wCurr_PI'
              value={this.state.wCurr_PI}
              //onChange={this.configure}
            /></td>
            <td><label>xiCurr_PI </label></td>
            <td><input
              type='text'
              name='xiCurr_PI'
              value={this.state.xiCurr_PI}
              //onChange={this.configure}
            /></td>
          </tr>
          <tr>
            <td><label>wSpeedEst </label></td>
            <td><input
              type='text'
              name='wSpeedEst'
              value={this.state.wSpeedEst}
              //onChange={this.configure}
            /></td>
            <td><label>wn </label></td>
            <td><input
              type='text'
              name='wn'
              value={this.state.wn}
              //onChange={this.configure}
            /></td>
            <td><label>Tn </label></td>
            <td><input
              type='text'
              name='Tn'
              value={this.state.Tn}
              //onChange={this.configure}
            /></td>
          </tr>
        </table>
        <input type="submit" value="Configure Simulator"/>
       </form>
    )
  }
}

export default SimulatorConfig;
