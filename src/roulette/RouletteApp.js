import React, { Component } from 'react';
import RouletteName from './RouletteName';
import Simplert from 'react-simplert';
import AES from '../common/AES';

class RouletteApp extends Component {
  id = 2
  state = {
    data: [
      { id: 0, name: '' },
      { id: 1, name: '' }
    ],
    showAlert: false,
    alertType: '',
    alertTitle: '',
    alertMessage: ''
  }

  alert = (type, title, msg) => {
    this.setState({
        alertType: type,
        alertTitle: title,
        showAlert: true,
        alertMessage: msg
    })
}

onCloseAlert = () => {
    this.setState({
        showAlert: false
    })
}

  add = () => {
    const { data } = this.state;
    this.setState({
      data: data.concat({ id: this.id++, ...data })
    })
  }

  update = (id, updated) => {
    const { data } = this.state;
    this.setState({
      data: data.map(
        d => id === d.id
          ? { ...d, ...updated }
          : d
      )
    })
  }

  remove = (id) => {
    if (this.state.data.length <= 2) {
      return
    }

    const { data } = this.state;
    this.setState({
      data: data.filter(d => d.id !== id)
    })
  }

  createGame = () => {
    if (this.state.data.length > 16) {
      this.alert(
          'error',
          'Max 16 names',
          ''
      )
      return;
  }

    if (this.state.data.some(d => d.name == null || d.name === '')) {
      this.alert(
          'error',
          'All names must be filled.',
          ''
      )
      return;
  }

    let names = [];

    this.state.data.forEach(d => {
      names.push(d['name'])
    });

    names = this.shuffle(names);

    let g = {
      names: names
    };

    let key = AES.encrypt(JSON.stringify(g));

    window.location.assign(window.location.origin + "/roulette/game?i=" + key)
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

  render() {
    const list = this.state.data.map(data => (
      <RouletteName key={data.id} data={data} onUpdate={this.update} onRemove={this.remove} />
    ));

    const { showAlert, alertType, alertTitle, alertMessage } = this.state;

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <td>
                <a className="btn-floating btn-large waves-effect waves-light blue" onClick={this.add}>+</a>
              </td>
            </tr>
          </thead>
          <tbody>
            {list}
          </tbody>
        </table>

        <div className="row">
          <a className="waves-effect waves-light btn-large col s6 offset-s2" onClick={this.createGame}>Submit</a>
        </div>

        <Simplert
          showSimplert={showAlert}
          type={alertType}
          title={alertTitle}
          message={alertMessage}
          onClose={this.onCloseAlert}
        />
      </div>
    );
  }
}

export default RouletteApp;
