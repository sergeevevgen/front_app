import { Html5QrcodeScanner } from "html5-qrcode";
import React, { useEffect, useState, useRef } from 'react';
import useAxiosPrivate from '../hook/useAxiosPrivate';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';

export const QRScannerPage = () => {
  const [isEnabled, setEnabled] = useState(false);
  const [isModalEnabled, setModalEnabled] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalBody, setModalBody] = useState('');
  const scannerRef = useRef(null);
  const axiosPrivate = useAxiosPrivate();

  const handleClose = () => setModalEnabled(false);

  useEffect(() => {

    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      disableFlip: false,
    };

    const postSubject = async (text) => {
      try {
        const response = await axiosPrivate.post(text);

        if (response.status !== 200) {
          console.log(response?.data);
          throw new Error(response?.data);
        }
        console.log(response?.data);

        setModalTitle("Успешно отметились!");
        setModalBody("На занятии: " + response?.data.subjectName);
      } catch (error) {
        console.error(error);

        setModalTitle("Ошибка!");
        if (!error?.response.data) {
          setModalBody('Произошла непредвиденная ошибка');
        }
        else {
          setModalBody(error?.response?.data);
        }
      }
    };

    const qrCodeSuccess = (text) => {      
      console.log('url: ' + text);
      postSubject(text);
      setEnabled(false);

      if (scannerRef.current) {
        scannerRef.current.clear().catch(error => {
          console.error("Failed to clear html5QrcodeScanner. ", error);
        });
      }

      setModalEnabled(true);
    };

    const qrCodeError = (errorMessage) => {
      console.log(errorMessage);
    };

    if (isEnabled) {
      if (!scannerRef.current) {
        scannerRef.current = new Html5QrcodeScanner("qrCodeContainer", config, false);
      }
      scannerRef.current.render(qrCodeSuccess, qrCodeError);
    } else if (scannerRef.current) {
      scannerRef.current.clear().catch(error => {
        console.error("Failed to clear html5QrcodeScanner. ", error);
      });
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(error => {
          console.error("Failed to clear html5QrcodeScanner. ", error);
        });
      }
    };
  }, [axiosPrivate, isEnabled]);

  return (
    <Container className="mt-5">
      <Row className="justify-content-center mt-3">
        <Col md={6} className="d-flex justify-content">
          <div className="scanner">
            <div id="qrCodeContainer"></div>
            <Button variant="info" onClick={() => setEnabled(!isEnabled)}>
              {isEnabled ? "Выключить" : "Включить"}
            </Button>
            <Modal show={isModalEnabled} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
              </Modal.Header>
              <Modal.Body>{modalBody}</Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                  Отлично
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </Col>
      </Row>
    </Container>
  );
};