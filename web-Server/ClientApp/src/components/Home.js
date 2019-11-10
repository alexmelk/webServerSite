import React, { Component } from 'react';
import react from './pictures/react.png'
import netcore from './pictures/netcore.png'
import mssql from './pictures/mssql.png'
export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = { table: [[],[]], loading: true, rowFIO: '', rowID:''};
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeRemove = this.handleChangeRemove.bind(this);
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
                        table[0].map((element, index) => (<tr><td>{element[0]}</td><td>{element[1]}</td></tr>))
                    }
                </tbody>
            </table>
        </div>);
    }


    Connect = () =>{
    try {
        fetch("Home/Index").then(response => response.json()).then(repos => { this.setState({ table: repos, loading: false }); console.log(repos) });
    }
    catch (err) {
        console.log(err);
    }
    }


    Add = () =>{
        try {
            console.log(this.state.rowFIO);
            fetch("Home/Add?FIO=" + this.state.rowFIO).then(this.Connect);
        }
        catch (err) {
            console.log(err);
        }
    }


    Remove = () => {
        try {
            fetch("Home/Remove?ID=" + this.state.rowID).then(this.Connect);
        }
        catch (err) {
            console.log(err);
        }
    }


    handleChange(event){
        this.setState({ rowFIO: event.target.value });
    }
    handleChangeRemove(event) {
        this.setState({ rowID: event.target.value });
    }

  render () {
    return (
        <div>
            <div className="row">
                <div className="form-group" style={{ marginLeft:17+'px' }}>
                    <label> ФИО</label>
                    <input className="form-text text-muted" placeholder="Введите ФИО" style={{ width:95+'%' }} onChange={this.handleChange} />
                    <div className="btnStyle" style={{ marginTop: 10 + 'px' }}>
                        <button className="btn btn-success" onClick={this.Add}>Добавить</button>
                    </div>
                </div>
                <div className="form-group" style={{ marginLeft: 17 + 'px' }}>
                    <label> ID </label>
                    <input className="form-text text-muted" placeholder="Удаление записи" style={{ width: 95 + '%' }} onChange={this.handleChangeRemove} />
                    <div className="btnStyle" style={{ marginTop: 10 + 'px' }}>
                        <button className="btn btn-danger" onClick={this.Remove}>Удалить</button>
                    </div>
                </div>

                <div className="row" style={{ marginLeft: 5 + '%', marginTop:3 + '%' }}>
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
