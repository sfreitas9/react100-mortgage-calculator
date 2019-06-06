import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: '',
      rate: '',
      term: 15,
      payment: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  handleChange(event) {
    switch (event.target.name) {
      case 'balance':
        this.setState({
          balance: event.target.value
        });
        break;
      case 'rate':
        this.setState({
          rate: event.target.value
        });
        break;
      case 'term':
        this.setState({
          term: event.target.value
        });
        break;
      default:
        break;
    }
  }

  calculate() {
    const balance = this.state.balance;
    const r = this.state.rate / 100 / 12;
    const n = this.state.term * 12;
    const temp = Math.pow((1 + r), n);
    const payment = ((balance * r * temp) / (temp - 1));
    this.setState({
      payment: `$${payment.toFixed(2)} is your payment.`
    });
  }

  renderTable() {
    if (this.state.payment === '') {
      return null;
    }
    const r = this.state.rate / 100 / 12;
    let curBal = this.state.balance;
    const pay = this.state.payment.match(/[0-9]+\.[0-9]+/g);
    const table = [];
    for (let i = 1; i <= this.state.term * 12; i++) {
      const curInt = (curBal * r).toFixed(2);
      const curPrin = (pay - curInt).toFixed(2);
      curBal = (curBal - curPrin).toFixed(2);
      table.push(<tr key={ i }><td>{i}</td><td>${curInt}</td><td>${curPrin}</td
        ><td>${curBal}</td></tr>);
    }
    return (
      <div>
        <table className='table table-bordered table-condensed table-striped'><thead><tr><th>#</th>
          <th>Interest</th><th>Principal</th><th>Balance</th></tr></thead>
          <tbody><tr><td /><td /><td /><td>${this.state.balance}</td></tr>
          { table }</tbody></table>
        <p>**Your final payment will be adjusted to pay off the loan to $0 balance.</p>
      </div>
    );
  }

  render() {
    return (
      <div className='container bg-warning mt-5'>
        <h3>Mortgage Calculator</h3>
        <div className='row mt-5'>
          <div className='col-md-2'>
            <label htmlFor='balance'>Loan Balance</label>
          </div>
          <div className='col-md-10'>
            <input
              type='number' name='balance' value={ this.state.balance }
              onChange={ this.handleChange }
            />
          </div>
        </div>
        <div className='row mt-3'>
          <div className='col-md-2'>
            <label htmlFor='rate'>Interest Rate (%)</label>
          </div>
          <div className='col-md-10'>
            <input
              type='number' name='rate' step='0.01' value={ this.state.rate }
              onChange={ this.handleChange }
            />
          </div>
        </div>
        <div className='row mt-3'>
          <div className='col-md-2'>
            <label htmlFor='term'>Loan Terms (years)</label>
          </div>
          <div className='col-md-10'>
            <select name='term' value={ this.state.term } onChange={ this.handleChange } >
              <option value='15' >15</option>
              <option value='30'>30</option>
            </select>
          </div>
        </div>
        <div className='row mt-3'>
          <div className='col-md-2' />
          <div className='col-md-10'>
            <button className='btn btn-primary' name='submit' onClick={ () => this.calculate() }>Calculate</button>
          </div>
        </div>
        <div className='row mt-5 '>
          <div className='col-md-4'>
            <p id='output' className='text-success'>
              { this.state.payment }</p>
          </div>
          <div className='col-md-8' />
        </div>
        <div className='row mt-3'>
          <div className='col-md-6'>
            {this.renderTable()}
          </div>
          <div className='col-md-6' />
        </div>
      </div>
    );
  }
}
