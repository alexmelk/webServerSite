import React, { Component } from 'react';
import react from './pictures/react.png'
import netcore from './pictures/netcore.png'
import mssql from './pictures/mssql.png'
export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = { table: [], loading: true, value: '' };
        this.handleChange = this.handleChange.bind(this);
        this.Connect();
    }

    static tableComp(table) {
        return (<div>
            <h2>Таблица из БД</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>ФИО</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        table[0].map((element, index) => (<tr><td>{index}</td><td>{element}</td></tr>))
                    }
                </tbody>
            </table>
        </div>);
    }


Connect = () => {
    try {
        fetch("Home/Index").then(response => response.json()).then(repos => { this.setState({ table: repos, loading: false }); console.log(repos) });
    }
    catch (err) {
        console.log(err);
    }
    }
    Add = () => {
        try {
            fetch("Home/Add?FIO=" + this.state.value);
        }
        catch (err) {
            console.log(err);
        }
        this.Connect();
    }

    handleChange(event){
         this.setState({ value: event.target.value });
    }

  render () {
    return (
        <div>
            <div className="row">
                <div className="form-group" style={{ marginLeft:17+'px' }}>
                    <label> ФИО</label>
                    <input className="form-text text-muted" placeholder="Введите ФИО" style={{ width:195+'px' }} onChange={this.handleChange} />
                    <div className="btnStyle" style={{ marginTop: 10 + 'px' }}>
                        <button className="btn btn-success" style={{ marginRight: 3 + 'px'}} onClick={this.Connect}>Обновить</button>
                        <button className="btn btn-success" onClick={this.Add}>Добавить</button>
                    </div>
                </div>
                <div className="row" style={{ marginLeft: 300 + 'px', marginTop: 50 + 'px' }}>
                    <h4 className="text-around-picture" style={{ marginRight:15+'px' }}><b>Stack:</b></h4>

                    <img src={netcore} className="img" />
                    <h4 className="text-around-picture"><b>+</b></h4>
                    <img src={react} className="img" /> 
                    <h4 className="text-around-picture"><b>+</b></h4>
                    <img src={mssql} className="img" /> 

                </div>
            </div>
            {Home.tableComp([this.state.table])}
        </div>

    );
    }
}
