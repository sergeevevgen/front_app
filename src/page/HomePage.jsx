import React from 'react';
import { Carousel } from 'react-bootstrap';

export const HomePage = () => {
  return (
    <Carousel interval={3000} indicators={false}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://ulstu.ru/upload/iblock/a4a/7w17n75rgek6wj9i2phziifdyb63agl8/image_265.png"
          alt="First slide"
        />
        <Carousel.Caption>
          <p>УлГТУ приглашает школьников на летние образовательные смены</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://ulstu.ru/upload/iblock/b2c/1ra51gyiginbc0ti4ks1n0pxh2j4twtu/Frame_78.png"
          alt="Second slide"
        />
        <Carousel.Caption>
          <p>Лицей при УлГТУ объявляет набор в 10-е классы</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://ulstu.ru/upload/iblock/5d9/z4kfofl69i98zcae1cgdscjix8je2eyj/Ssylki.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>          
          <p>Будьте в курсе всех событий, подписывайтесь на соц. сети</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}
