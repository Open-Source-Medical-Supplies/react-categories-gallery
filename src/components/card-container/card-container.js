import React from 'react';
import ProjectCard from './card';

const CardContainer = ({records, cardChange, selectedCard, isMobile}) => {
  return (
    <div className='p-grid'>
      {
        records.reduce((acc, fields) => {
            acc.push(
              <ProjectCard
                key={fields['Medical Supply Category']}
                data={fields}
                isMobile={isMobile}
                setCard={cardChange}
                selectedCard={selectedCard}/>
            ); 
          return acc;
        }, [])
      }
    </div>
  );
}

export default CardContainer;