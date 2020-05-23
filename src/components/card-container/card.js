import React from 'react';
import {Card} from 'primereact/card';
import {Button} from 'primereact/button';
import classNames from "classnames";
import { MapCardToJSON } from '../../service/mapCardToJSON';

const ProjectCard = ({data, setCard, selectedCard}) =>{
  const {
    categoryName, imageURL
  } = MapCardToJSON(data);

  const selectCard = () => {
    setCard({selectedCard: data, visible: true});
  }
  
  const headerImage = (
    typeof imageURL !== 'string' ?
      <div className='center-flex' style={{height: '150px'}}>No image available</div> :
      <img className='centered-image' alt={categoryName} src={imageURL} style={{ height: '150px' }}/>
  )
  const footer = (
    <span style={{display: 'flex', justifyContent: 'flex-end'}}>
      <Button
        onClick={selectCard}
        label='View'
        icon='pi
        pi-eye'
        iconPos='right'
        className="p-button-raised p-button-rounded" />
    </span>
  );
  
  const selectedName = selectedCard['CategoryName'];

  const highlight = classNames({
    "card-selected": !!selectedName && selectedName === categoryName
  });
  const sizing = classNames({
    'p-col-3': !selectedName,
    'p-col-12': !!selectedName
  })
  return (
    <div key={categoryName} className={sizing}>
      <Card header={headerImage} footer={footer} className={highlight}>
        <h2 className='clamp-1'> {categoryName} </h2>
      </Card>
    </div>
  );
}
export default ProjectCard;