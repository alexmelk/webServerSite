import React, { Component } from 'react';
export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = { table: [], loading: true, value: '' };
        this.handleChange = this.handleChange.bind(this);
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
    }

    handleChange(event){
         this.setState({ value: event.target.value });
    }

  render () {
    return (
        <div>
                <div className="form-group">
                <label> ФИО</label>
                <input className="form-text text-muted" placeholder="Введите ФИО" onChange={this.handleChange}/>
                </div>
                <button className="btn btn-success" style={{ marginRight: 3 + 'px' }} onClick={this.Connect}>Обновить</button>
                <button className="btn btn-success" onClick={this.Add}>Добавить</button>
                <br />
                <br />
                <br />

            {Home.tableComp([this.state.table])}
        </div>
    );
    }
}
