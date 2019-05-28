import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import List from './list/List';
import CadastraCliente from './create_tasks/CadastraCliente';

class Tasks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clientes: []
        };
        this.listaClientes = this.listaClientes.bind(this);
    }

    async listaClientes() {
        let response = await fetch(`http://localhost:3000/listar`);
        const clientesCadastrados = await response.json();
        this.setState({ clientes: clientesCadastrados });
    }

    componentDidMount() {
        this.listaClientes();
    }

    render() {
        return (
            <Row>
                <Col xs={{ span: 8, offset: 2 }} className="tasks_list">
                    <p className="title">Cadastrados</p>
                    <List listaClientes={this.listaClientes} clientes={this.state.clientes}/>
                    <CadastraCliente/>
                </Col>
            </Row>
        );
    }
}

export default Tasks;
