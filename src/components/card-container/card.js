import classNames from "classnames";
import React from 'react';
import { MapCardToJSON } from '../../service/mapCardToJSON';
import TileCard from '../../shared/components/tile-card';

const ProjectCard = ({data, setCard, selectedCard, isMobile}) =>{
  const { categoryName, imageURL } = MapCardToJSON(data);
  const selectedName = selectedCard['CategoryName'] ? selectedCard['CategoryName'][0] : '';

  const selectCard = () => setCard({selectedCard: data, visible: true});
  
  const highlight = classNames({
    "card-selected": !!selectedName && selectedName === categoryName
  });

  let sizing;
  if (!!selectedName) {
    sizing = 'p-col-12';
  } else if (isMobile) { // show all, mobile
    sizing = 'p-col-4';
  } else { // show all, not mobile
    sizing = 'p-col-2';
  }
  
  return (
    <div key={categoryName} className={sizing}>
      <TileCard displayName={categoryName} imageURL={imageURL} action={selectCard} className={highlight}/>
    </div>
  );
}
export default ProjectCard;