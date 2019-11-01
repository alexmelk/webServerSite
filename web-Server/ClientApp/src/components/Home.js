import React, { Component } from 'react';
export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = { table: [], loading: true };
    }

    static tableComp(table) {
        return (<div>
            <h1>H W</h1>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <td>ФИО</td>
                    </tr>
                </thead>
                <tbody>
                    {table.map(row =>
                        <tr>
                            <td>{row}</td>
                        </tr>
                    )}
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
  render () {
    return (
        <div>
            {Home.tableComp([this.state.table])}
            <button className="btn btn-success" onClick={this.Connect}>Подключиться</button>
        </div>
    );
    }
}
