import React, { useState } from 'react';
import styled from 'styled-components';

const MyImage = ({ imgs }) => {
  const [mainImage, setMainImage] = useState(imgs[0]);

  return (
    <Wrapper>
      <div className="grid grid-four-column">
        {imgs.map((curElm, index) => {
          return (
            <figure>
              <img
                src={curElm.src}
                alt={curElm.alt}
                className="box-image--style"
                key={index}
                onClick={() => setMainImage(curElm)}
              />
            </figure>

            // <Zoom />
          );
        })}
      </div>
      {/* 2nd column  */}

      <div className="main-screen">
        <img src={mainImage.src} alt={mainImage.alt} loading="lazy"/>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 0.4fr 0.9fr;
  gap: 0em;
  .grid {
    flex-direction: row;
    justify-items: center;
    align-items: center;
    width: 100%;
    gap: 1rem;
    /* order: 2; */
    img {
      max-width: 100%;
      margin-left: 30px;
      max-height: 100%;
      background-size: cover;
      object-fit: contain;
      cursor: pointer;
    }
  }
  .main-screen {
    display: grid;
    place-items: center;
    order: 1;
    img {
      max-width: 100%;
      height: 100%;
      // box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
      object-fit: contain;
    }
  }

  // .main-screen img {
  //   transition: all 0.3s ease-in-out;
  // }

  // .main-screen img:hover {
  //   transform: scale(1.2);
  //   cursor: zoom-in;
  // }

  .grid-four-column {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 0fr);
    // margin-top: -1em;
  }

  @media (min-width: 300px) {
    .grid-four-column {
      margin-left: -4em;
    }
    // .main-screen img {
    //   margin-left: -8em;
    // }
  }

  @media (min-width: 2000px) {
    display: flex;
    flex-direction: column;
    order: 1;
    .grid-four-column {
      grid-template-rows: 1fr;
      grid-template-columns: repeat(4, 0fr);
    }
  }
`;

export default MyImage;
