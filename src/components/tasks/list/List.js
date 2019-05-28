import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class List extends Component {

    close(){
        this.setState({ showModal: false });
    }

    open(cliente){
        this.setState({ showModal: true, id: cliente.id, nome: cliente.nome, sobrenome: cliente.sobrenome, data: cliente.data, sexo: cliente.sexo });
    }

    async editaCliente(id,nome,sobrenome,data,sexo) {
        await fetch(`http://localhost:3000/alterar/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    { nome: nome, sobrenome: sobrenome, data: data, sexo: sexo}
                )
            }
        );
        this.props.listaClientes();
    }

    async apagaCliente(cliente) {
        if (window.confirm(`Are you sure you want to delete: "${cliente.nome}"`)) {
            await fetch(`http://localhost:3000/deletar/${cliente.id}`, {method: 'DELETE'});
            this.props.listaClientes();
        }
    }

    mudaNome(e) {
        var value = e.target.value;
        this.setState({nome: value});
    }
    mudaSobrenome(e) {
        var value = e.target.value;
        this.setState({sobrenome: value});
    }
    mudaData(e) {
        var value = e.target.value;
        this.setState({data: value});
    }
    mudaSexo(e) {
        var value = e.target.value;
        this.setState({sexo: value});
    }

    render() {
        return (
            <div>
                <Card>
                    <Card.Body>
                        <Table responsive>
                            <tbody>
                            {this.props.clientes.map((cliente, index) => {
                                return <tr key={cliente.id}>
                                    <td className="col-md-10">{cliente.nome}</td>
                                    <td className="col-md-10">{cliente.sobrenome}</td>
                                    <td className="col-md-10">{cliente.data}</td>
                                    <td className="col-md-10">{cliente.sexo}</td>
                                    <td>
                                        <a className="edit" href="" onClick={this.open.bind(this,cliente)} size="lg">
                                            <FontAwesomeIcon icon="pen-alt"/>
                                        </a>
                                    </td>
                                    <td>
                                        <a className="delete" href="" onClick={() => this.apagaCliente(cliente)} size="lg">
                                            <FontAwesomeIcon icon="trash-alt"/>
                                        </a>
                                    </td>
                                </tr>;
                            })}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>

        <Modal show={this.state.showModal}
               onHide={this.close}
               keyboard={true}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control type="text" placeholder="Nome" value={this.state.nome || ''} onChange={e => this.mudaNome(e)} />
                <Form.Control type="text" placeholder="Sobrenome" value={this.state.sobrenome || ''} onChange={e => this.mudaSobrenome(e)} />
                <Form.Control type="date" placeholder="Data de Nascimento" value={this.state.data || ''} onChange={e => this.mudaData(e)} />
                <Form.Control type="text" placeholder="Sexo" value={this.state.sexo || ''} onChange={e => this.mudaSexo(e)} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.close}>
                    Close
                </Button>
                <form onSubmit={this.editaCliente(this.state.id,this.state.nome,this.state.sobrenome,this.state.data,this.state.sexo)}>
                    <Button variant="dark" type="submit">
                        Editar
                    </Button>
                </form>
            </Modal.Footer>
        </Modal>
            </div>
        );
    }
}

export default List;