import { Button } from 'primereact/button';
import React from 'react';
import { MapCardToJSON } from '../../service/mapCardToJSON';
import { OpenExternalSafely, openExternal } from '../../shared/utilities';
import ReactMarkdown from 'react-markdown';

const FullCard = ({selectedCard}) => {
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

  // const externalLinks = externalLink?.split(';') || [];
  // const source = (
  //   <section alt='Sources' >
  //     <h3>Source</h3>
  //     {
  //       externalLinks.map(link => ( 
  //         // eslint-disable-next-line react/jsx-no-target-blank
  //         <a key={link.slice(0,-10)} href={link} target='_blank' rel={OpenExternalSafely}>
  //           <span className='clamp-1'>{link}</span>
  //         </a>
  //       ))
  //     }
  //   </section>
  // );

  // const footer = (
  //   <span alt='footer' className="full-card__footer">
  //     <Button
  //       onClick={openExternal(externalLinks[0])}
  //       tooltip='Link will open in a new tab'
  //       label='Make it!'
  //       icon='pi pi-external-link'
  //       iconPos='right'
  //       className="p-button-raised p-button-rounded" />
  //   </span>
  // );

  return (
    <div className="full-card">
      <div className="full-card__content">
        {headerImage}
        <h1>{categoryName}</h1>
        {
          Object.entries(cardData.sectionKeys).map(entry => {
            const [key, label] = entry;
            return markdownSection(label, cardData[key])
          })
        }
      </div>
    </div>
  );
}
export default FullCard;