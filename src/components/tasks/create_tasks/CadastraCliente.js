import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function CadastraCliente(props) {
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [data, setDataN] = useState('');
    const [sexo, setSexo] = useState('');
    const [show, setShow] = useState('');

    const handleSubmit = (async () => {
        await fetch(`http://localhost:3000/cadastrar`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    { nome: nome, sobrenome: sobrenome, data: data, sexo: sexo}
                )
            }
        );
        setShow(false);
        setNome('');
        setSobrenome('');
        setDataN('');
        setSexo('');
        props.listaClientes();
    });

    return (
        <div>
            <Button onClick={e => setShow(true)} variant="dark" className="float-right create_task_btn">Cadastrar</Button>

            <Modal show={show || false} onHide={e => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Novo Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control type="text" placeholder="Nome" value={nome || ''} onChange={e => setNome(e.target.value)} />
                    <Form.Control type="text" placeholder="Sobrenome" value={sobrenome || ''} onChange={e => setSobrenome(e.target.value)} />
                    <Form.Control type="date" placeholder="Data de Nascimento" value={data || ''} onChange={e => setDataN(e.target.value)} />
                    <Form.Control type="text" placeholder="Sexo" value={sexo || ''} onChange={e => setSexo(e.target.value)} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={e => setShow(false)}>
                        Close
                    </Button>
                    <form onSubmit={handleSubmit}>
                        <Button variant="dark" type="submit">
                            Cadastrar
                        </Button>
                    </form>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default CadastraCliente;