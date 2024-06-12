import React, { useEffect, useState } from 'react'
import { Container, Button, InputGroup, Card } from 'react-bootstrap';
import useAxiosPrivate from '../hook/useAxiosPrivate';
import { Modal } from 'react-bootstrap';

const SubjectCurrent_URL = 'subject/current/';
const SubjectMark_URL = 'subject/mark/';

export const QRGenPage = () => {
    const [qrCode, setQrCode] = useState("");
    const size = 300;
    const bgColor = "ffffff";
    const [subject, setSubject] = useState(null);
    const [isModalEnabled, setModalEnabled] = useState(false);
    const axiosPrivate = useAxiosPrivate();

    const handleClose = () => setModalEnabled(false);

    useEffect(() => {
        const fetchSubject = async () => {
            try {
              const response = await axiosPrivate.get(SubjectCurrent_URL);
  
              if (response.status !== 200) {
                console.log(response?.data);
                throw new Error(response?.data);
              }           
              
              console.log(response?.data);
              setSubject(response?.data);
              console.log(SubjectMark_URL + response?.data?.subjectId);            
            } catch (error) {
              console.error('Произошла ошибка:', error);
              setSubject(null);
            }
          };
        
        fetchSubject();

    }, [axiosPrivate]);

    const formatTime = (time) => {
        const [hours, minutes] = time.split(':');
        return `${hours}:${minutes}`;
    };

    const handleClick = () => {
        if (!subject){
            setModalEnabled(true);
            return;
        }
        setQrCode(`http://api.qrserver.com/v1/create-qr-code/?data=${SubjectMark_URL + subject.subjectId}!&size=${size}x${size}&bgcolor=${bgColor}`);
    }

    return (
        <Container className="d-flex flex-column align-items-center w-75 p-0 gap-4">
            <div>
                {subject ? 
                (<>
                <Card style={{ width: '18rem' }} className="mb-4">
                    <Card.Body>
                    <Card.Title>Занятие сейчас</Card.Title>
                    <Card.Text>
                        {subject.subjectName}
                    </Card.Text>
                    <Card.Text>
                        {subject.groupName}
                    </Card.Text>
                    <Card.Text>
                        {subject.placeName}
                    </Card.Text>
                    <Card.Text>
                        {"C " + formatTime(subject.from) + ' до ' + formatTime(subject.to)}
                    </Card.Text>
                    <Card.Text>
                        {subject.date}
                    </Card.Text>
                    </Card.Body>
                </Card>
                </>) 
                : 
                (<>
                </>)}
                <InputGroup className="mb-3">
                    <Button
                        variant="outline-secondary"
                        onClick={handleClick}
                    >
                        Сгенерировать QR-код
                    </Button>
                </InputGroup>
                <Modal show={isModalEnabled} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Предупреждение</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Сегодня у вас нет занятий</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                        Отлично
                        </Button>
                    </Modal.Footer>
                </Modal>           
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