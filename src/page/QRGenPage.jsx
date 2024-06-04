import React, { useEffect, useState } from 'react'
import { Container, Button, InputGroup, Form } from 'react-bootstrap';
import { useAuth } from '../hook/useAuth'

export const QRGenPage = () => {
    const [qrCode, setQrCode] = useState("");
    const [temp, setTemp] = useState("");
    const [word, setWord] = useState("");
    const [size, setSize] = useState(300);
    const [bgColor, setBgColor] = useState("ffffff");
    const [value, setValue] = useState("");

    useEffect(() => {
        setQrCode(`http://api.qrserver.com/v1/create-qr-code/?data=${word}!&size=${size}x${size}&bgcolor=${bgColor}`);
    }, [word, size, bgColor]);

    function handleClick() {
        setWord(temp);
    }

    return (
        <Container className="d-flex flex-column align-items-center w-75 p-0 gap-4">
            <div>
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="Начните вводить занятие"
                        type="text"
                        onChange={(e) => { setTemp(e.target.value) }}
                    />
                    <Button
                        variant="outline-secondary"
                        onClick={handleClick}
                    >
                        Сгенерировать QR-код
                    </Button>
                </InputGroup>
                <Form.Label htmlFor="ColorInput">Цвет фона:</Form.Label>
                <Form.Control
                    id="ColorInput"
                    type="color"
                    defaultValue="#ffffff"
                    onChange={(e) => { setBgColor(e.target.value.substring(1)) }}
                />
            </div>
            <div>
                <img src={qrCode} alt="" />
            </div>
            <div>
                <a href={qrCode} download="QRCode">
                    <Button
                        type="button"
                        className="btn-secondary"
                    >
                        Скачать
                    </Button>
                </a>
            </div>
        </Container>
    );
}