import React from 'react';
import Table from 'react-bootstrap/Table';

export const Timetable = ({ timetable, week }) => {
    // Определяем расписание для каждого дня недели
    const weekDays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const timetableData = {};
    
    const startTimes = {
        '1-я': '08:30-09:50', 
        '2-я': '10:00-11:20', 
        '3-я': '11:30-12:50',
        '4-я': '13:30-14:50',
        '5-я': '15:00-16:20', 
        '6-я': '16:30-17:50',
        '7-я': '18:00-19:20',
        '8-я': '19:30-20:50'
    };

    timetable?.forEach(item => {
        if (!timetableData[item.day]) {
            timetableData[item.day] = [];
        }
        timetableData[item.day][item.number - 1] = item;
    });

    // Функция для рендеринга данных в ячейке
    const renderCell = (day, number) => {
        const lesson = timetable?.find(
            lesson => lesson.day === day && lesson.number === number
          );
        
        if (lesson) {
            return (
                <div>
                    <div>{lesson.lessonName}</div>
                    <div>{lesson.teacherName}</div>
                    <div>{lesson.placeName}</div>
                    <div>{lesson.groupName}</div>
                </div>
            );
        } else {
            return <div>-</div>;
        }
    };

    return (
        <div className="container p-0"><strong>Неделя {week}</strong>
            <div className="table-responsive">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th scope="col">Пара / Время</th>
                            {Object.entries(startTimes).map(([key, time]) => (
                            <th key={key} scope="col">{key}<br />{time}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {weekDays.map((day, index) => (
                            <tr key={index}>
                            <td>{day}</td>
                            {Object.keys(startTimes).map((key, idx) => (
                                <td key={idx}>{renderCell(index + 1, idx + 1)}</td>
                            ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}