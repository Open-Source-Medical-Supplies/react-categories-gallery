import React from 'react';
import ReactMarkdown from 'react-markdown';
import { MapCardToJSON, CardSections } from '../../service/mapCardToJSON';
import ImageCarousel from './image-carousel';

const FullCard = ({selectedCard, links}) => {
  const cardData = MapCardToJSON(selectedCard);
  const {categoryName, imageURL} = cardData;
  
  const headerImage = (
    typeof imageURL !== 'string' ?
      <div className='center-flex' style={{height: '150px'}}>No image available</div> :
      <img className='centered-image' alt={categoryName} src={imageURL} style={{ height: '250px' }}/>
  )

  const markdownSection = (sectionName, md) => (
    <div key={sectionName}>
      <h3>{sectionName}</h3>
      <ReactMarkdown source={md} />
    </div>
  );

  return (
    <div className="full-card">
      <div className="full-card__content">
        {headerImage}
        <h1>{categoryName}</h1>
        {
          Array.from(CardSections, ([key, label]) => cardData[key] ? markdownSection(label, cardData[key]) : null)
        }
        {links ? <ImageCarousel links={links}/> : null}
      </div>
    </div>
  );
}
export default FullCard;