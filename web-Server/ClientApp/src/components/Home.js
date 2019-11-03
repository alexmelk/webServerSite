import React, { Component } from 'react';
export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = { table: [], loading: true };
    }

    static tableComp(table) {
        return (<div>
            <h2>Таблица из БД</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ФИО</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        table[0].map((element) => (<tr><td>{element}</td></tr>))
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
  render () {
    return (
        <div>
            <form>
                <div className="form-group">
                    <label> ФИО</label>
                    <input className="form-text text-muted" placeholder="Введите ФИО" />
                </div>
                <button className="btn btn-success" style={{ marginRight: 3 + 'px' }} onClick={this.Connect}>Подключиться</button>
                    <button className="btn btn-success">Добавить</button>
            </form>
            <br/>

            {Home.tableComp([this.state.table])}
        </div>
    );
    }
}
