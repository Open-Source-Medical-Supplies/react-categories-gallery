import classNames from "classnames";
import React from 'react';
import { MapCardToJSON } from '../../service/mapCardToJSON';
import TileCard from '../../shared/components/tile-card';

const ProjectCard = ({data, setCard, selectedCard}) =>{
  const { categoryName, imageURL } = MapCardToJSON(data);
  const selectedName = selectedCard['CategoryName'];

  const selectCard = () => setCard({selectedCard: data, visible: true});
  
  const highlight = classNames({
    "card-selected": !!selectedName && selectedName === categoryName
  });
  const sizing = classNames({
    'p-col-3': !selectedName,
    'p-col-12': !!selectedName
  })
  return (
    <div key={categoryName} className={sizing}>
      <TileCard displayName={categoryName} imageURL={imageURL} action={selectCard} className={highlight}/>
    </div>
  );
}
export default ProjectCard;