import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class List extends Component {

    async editaCliente(cliente) {

        await fetch(`http://localhost:3000/alterar/${cliente.id}`,
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {nome: cliente.nome, sobrenome: cliente.sobrenome, data: cliente.data, sexo: cliente.sexo}
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
                                        <a className="edit" href="" onClick={() => this.editaCliente(cliente)} size="lg">
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

            </div>
        );
    }
}

export default List;