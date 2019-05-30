import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import List from './list/List';
import CadastraCliente from './create_tasks/CadastraCliente';

class Tasks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clientes: [],
            input: '',
            nomeDeletar: ''
        };
        this.listaClientes = this.listaClientes.bind(this);
        this.buscaClientes = this.buscaClientes.bind(this);
        this.apagaCliente = this.apagaCliente.bind(this);
        this.handleChangeUPDATE = this.handleChangeUPDATE.bind(this);
        this.handleChangeDELETE = this.handleChangeDELETE.bind(this);
    }

    getInitialState() {
        return { input: '' , nomeDeletar: ''};
    }

    handleChangeUPDATE(e) {
        this.setState({ input: e.target.value});
    }
    handleChangeDELETE(e) {
        this.setState({ nomeDeletar: e.target.value});
    }

    async listaClientes() {
        let response = await fetch(`http://localhost:3000/listar`);
        const clientesCadastrados = await response.json();
        this.setState({ clientes: clientesCadastrados });
    }

    componentDidMount() {
        this.listaClientes();
    }

    async buscaClientes(e){
        const nome = this.state.input;
        if(!nome){
            this.listaClientes();
        }else{
            let response = await fetch(`http://localhost:3000/buscar/${nome}`);
            const clientesEncontrados = await response.json();
            this.setState({ clientes: clientesEncontrados });
        }
    }

    async apagaCliente(e) {
        const nome = this.state.nomeDeletar;
        if(nome){
            await fetch(`http://localhost:3000/deletar/${nome}`, {method: 'DELETE'});
        }
        this.listaClientes();
    }

    render() {
        return (
            <Row>
                <Col xs={{ span: 8, offset: 2 }} className="tasks_list">
                    <p className="title">Cadastrados</p>
                    <div>
                        <input type="text" onChange={ this.handleChangeUPDATE }/>
                        <input
                            type="button"
                            value="Pesquisar"
                            onClick={this.buscaClientes}
                        />
                    </div>
                    <div>
                        <input type="text" onChange={ this.handleChangeDELETE.bind(this) }/>
                        <input
                            type="button"
                            value="Deletar"
                            onClick={this.apagaCliente}
                        />
                    </div>
                    <List listaClientes={this.listaClientes} clientes={this.state.clientes}/>
                    <CadastraCliente/>
                </Col>
            </Row>
        );
    }
}

export default Tasks;
