import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useAxiosPrivate from '../hook/useAxiosPrivate';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';

const SubjectStat_URL = 'subject/statistic/';

const LessonPage = () => {
    const {id} = useParams();
    const axiosPrivate = useAxiosPrivate();
    const [lesson, setLesson] = useState(null);

    useEffect(() => {        
        const fetchLessons = async () => {
          try {
            var url = SubjectStat_URL + id;
            const response = await axiosPrivate.get(url);

            if (response.status !== 200) {
              throw new Error('Ошибка при загрузке данных');
            }            
            
            // console.log(response?.data);
            setLesson(response?.data);
          } catch (error) {
            console.error('Произошла ошибка:', error);
            setLesson(null);
          }
        };
    
        fetchLessons();
    }, [axiosPrivate, id]);

    return (
        <>
            {lesson ? (
                <Container className="mt-5">
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Статистика</Card.Title>
                            <Card.Text>Процент посещаемости: {lesson?.perсentage}%</Card.Text>
                        </Card.Body>
                    </Card>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Имя ученика</th>
                                <th>Группа</th>
                                <th>Время отметки</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lesson?.students?.map((student, index) => (
                                <tr key={index}>
                                    <td>{student.studentName}</td>
                                    <td>{student.groupName}</td>
                                    <td>{new Date(student.markTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Container>
                ) : (
                <div>Нет статистики</div>
                )
            }
        </>
    )
}

export {LessonPage}
