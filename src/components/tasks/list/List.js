import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class List extends Component {

    constructor(props) {
      super(props);

      this.state = {
        showModal: false,
        data: '',
        nome: '',
        sobrenome: '',
        sexo: ''
      }
   };

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
        this.close();
        this.props.listaClientes();
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
                                        <Button className="edit" href="" onClick={this.open.bind(this,cliente)} size="lg">
                                            <FontAwesomeIcon icon="pen-alt"/>
                                        </Button>
                                    </td>
                                </tr>;
                            })}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>

        <Modal show={this.state.showModal}
               onHide={e=> this.close(e)}
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
                <Button variant="secondary" onClick={e=> this.close(e)}>
                    Close
                </Button>

                    <Button variant="dark" onClick={() =>this.editaCliente(this.state.id,this.state.nome,this.state.sobrenome,this.state.data,this.state.sexo)}>
                        Editar
                    </Button>

            </Modal.Footer>
        </Modal>
            </div>
        );
    }
}

export default List;
