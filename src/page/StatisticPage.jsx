import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import useAxiosPrivate from '../hook/useAxiosPrivate';

const Subjects_URL = 'subject/lessons';

const StatisticPage = () => {
    const [disciplines, setDisciplines] = useState(null);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {        
        const fetchLessons = async () => {
          try {
            const response = await axiosPrivate.get(Subjects_URL);

            if (response.status !== 200) {
              throw new Error('Ошибка при загрузке данных');
            }            
            
            console.log(response?.data);
            setDisciplines(response?.data);
          } catch (error) {
            console.error('Произошла ошибка:', error);
            setDisciplines(null);
          }
        };
    
        fetchLessons();
    }, [axiosPrivate]);

    return (
        <section>
            <h1>Статистика посещаемости</h1>
            <br />
            <br />
            <Container>
                <Row>
                    {disciplines ? (disciplines?.map((discipline) => (
                        <Col md={4} key={discipline?.lessonId} className="mb-4">
                            <Card className="h-100 d-flex flex-column">
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>{discipline?.lessonName}</Card.Title>
                                        <div className="mt-auto">
                                        <Link to={`/statistic/${discipline?.lessonId}`} className="btn btn-primary">
                                            Перейти
                                        </Link>
                                        </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))) : 
                    <>
                    </>}
                </Row>
            </Container>
            <br />
        </section>
    )
}

export {StatisticPage}