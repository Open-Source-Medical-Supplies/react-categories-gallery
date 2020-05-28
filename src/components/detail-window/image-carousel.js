import { Carousel } from "primereact/carousel";
import React from "react";
import { MapProjectToJSON } from "../../service/mapProjectToJSON";
import TileCard from "../../shared/components/tile-card";
import { openExternal } from '../../shared/utilities';

const ImageCarousel = ({ links }) => {
  const responsiveOptions = [
    {
      breakpoint: "1024px",
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: "768px",
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: "560px",
      numVisible: 1,
      numScroll: 1,
    },
  ];
  
  const cardTemplate = (data) => {
    const {
      displayName, imageURL, externalLink
    } = MapProjectToJSON(data);

    return (
      <TileCard
        displayName={displayName}
        imageURL={imageURL}
        buttonIcon='external-link'
        action={openExternal(externalLink)}/>
    );
  };

  return (
    <Carousel
      value={links}
      itemTemplate={cardTemplate}
      numVisible={3}
      numScroll={2}
      responsiveOptions={responsiveOptions}
    ></Carousel>
  );
};

export default ImageCarousel;