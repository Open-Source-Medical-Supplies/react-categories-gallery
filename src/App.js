import "primeflex/primeflex.css";
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/nova-light/theme.css';
import React, { useEffect, useRef, useState } from 'react';
import CardContainer from './components/card-container/card-container';
import DetailWindow from './components/detail-window/detail-window';
import FullCard from "./components/detail-window/full-card";
import { SearchBar } from "./components/search-bar/search-bar";
import { fetchData } from "./service/app.service";
import { MapCardToJSON } from "./service/mapCardToJSON";
import './shared/css/_prime.scss';
import detectMobile from "./shared/detect-mobile.utility";
import { empty } from "./shared/utilities";

/* eslint-disable react-hooks/exhaustive-deps */

/**
 * @type {{
       _records: Array<{}>
       records: Array<{}>
       selectedCard: {}
       visible: boolean
  }} _records
 */
const StateDefault = {
  _records: [], // immutable
  records: [],
  selectedCard: {},
  visible: false,
  projectLinks: {},
  selectedLinks: []
};

const App = () => {
  let [state, baseSetState] = useState(StateDefault);
  const setState = (props) => baseSetState({...state, ...props});
  const hide = () => setState({selectedCard: {}, visible: false});
  
  const isMobileRef = useRef(false);
  
  useEffect(() => {
    isMobileRef.current = detectMobile();
    fetchData(setState);
  }, []);

  useEffect(() => {
    if (empty(state.selectedCard)) { return; }
    const {categoryKey} = MapCardToJSON(state.selectedCard);
    setState({selectedLinks: state.projectLinks[categoryKey]});
  }, [state.selectedCard]);

  const leftFlex = `${state.visible ? 1 : 6} 0 ${state.visible ? '20%' : '100%'}`;
  const rightFlex = `${state.visible ? 5 : 0} 0 ${isMobileRef.current ? '0%' : '80%'}`;

  return (
    <div style={{display: 'flex'}}>
      <div id='app__left-column' className='flex-column' style={{ flex: leftFlex }}>
        {/* <Abstract/> */}
        <div className='divider-1'></div>
        <SearchBar _records={state._records} setState={setState} />
        <div className='divider-1'></div>
        <CardContainer
          isMobile={isMobileRef.current}
          records={state.records}
          cardChange={setState}
          selectedCard={state.selectedCard} />
      </div>
      <div id='app__detail-window' style={{ flex: rightFlex, maxWidth: '79vw' }}>
        <DetailWindow visible={state.visible} onHide={hide} className='p-sidebar-lg'>
          <FullCard selectedCard={state.selectedCard} links={state.selectedLinks} />
        </DetailWindow>
      </div>
    </div>
  );
}

export default App;
