import React from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

const TileCard = ({displayName, imageURL, action, className = '', buttonIcon='eye'}) => {
  const headerImage = (
    typeof imageURL !== 'string' ?
      <div className='center-flex' style={{height: '150px'}}>No image available</div> :
      <img className='centered-image' alt={displayName} src={imageURL} style={{ height: '150px' }}/>
  )

  const icon = 'pi pi-' + buttonIcon;
  const footer = (
    <span style={{display: 'flex', justifyContent: 'flex-end'}}>
      <Button
        onClick={() => action()}
        label='View'
        icon={icon}
        iconPos='right'
        className="p-button-raised p-button-rounded" />
    </span>
  );

  return (
    <Card header={headerImage} footer={footer} className={className}>
      <h4 className='clamp-1'> {displayName} </h4>
    </Card>
  );
}

export default TileCard;