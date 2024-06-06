import React, { useEffect, useState } from 'react';
import { Timetable } from '../component/Timetable';
import useAxiosPrivate from '../hook/useAxiosPrivate';

const TimetablePupil_URL = 'Timetable/current';

export const TimetablePage = () => {
    const axiosPrivate = useAxiosPrivate();
    const [timetableData, setTimetableData] = useState(null);
    
    useEffect(() => {
        const fetchTimetable = async () => {
          try {
            const response = await axiosPrivate.get(TimetablePupil_URL);

            if (response.status === 204) {
              setTimetableData(null);
              return;
            }

            if (response.status !== 200) {
              throw new Error('Ошибка при загрузке данных');
            }            
            
            console.log(response?.data);
            setTimetableData(response?.data);
          } catch (error) {
            console.error('Произошла ошибка:', error);
          }
        };
    
        fetchTimetable();
      }, [axiosPrivate]);

    return (
        <div>
            {timetableData ? (
                <Timetable timetable={timetableData.timetable} week={timetableData.week} />
            ) : (
                <div>У вас нет занятий на текущей неделе...</div>
            )}
        </div>
    );
}