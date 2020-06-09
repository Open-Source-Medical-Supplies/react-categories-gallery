import "primeflex/primeflex.css";
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/nova-light/theme.css';
import React, { useState, useEffect } from 'react';
import CardContainer from './components/card-container/card-container';
import DetailWindow from './components/detail-window/detail-window';
import FullCard from "./components/detail-window/full-card";
import './shared/css/_prime.scss';
import { Abstract } from "./components/abstract";
import { SearchBar } from "./components/search-bar/search-bar";
import { setCategories, setLinks } from "./service/app.service";
import { MapCardToJSON } from "./service/mapCardToJSON";
import { empty, notEmpty } from "./shared/utilities";

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

  const getParam = () => window.location && window.location.search ?
    decodeURI(window.location.search.split('category=')[1]) :
    undefined;
  
  useEffect(() => {
    (async function fetch() {
      Promise.all([
        setCategories(), 
        setLinks()
      ]).then(
        res => {
          const param = getParam();
          if (param) {
            const selectedCard = res[0]._records.find(r => r['CategoryName'][0] === param) || {};

            setState({
              ...res[0],
              ...res[1],
              selectedCard,
              visible: notEmpty(selectedCard)
            });
          } else {
            setState({
              ...res[0],
              ...res[1]
            });
          }
        },
        e => console.warn(e)
      )
    })();
  }, []);

  useEffect(() => {
    if (empty(state.selectedCard)) { return; }
    const {categoryKey} = MapCardToJSON(state.selectedCard);
    setState({selectedLinks: state.projectLinks[categoryKey]});
  }, [state.selectedCard]);

  return (
    <div style={{display: 'flex'}}>
      <div id='app__left-column' className='flex-column' style={{flex: state.visible ? 1 : 6}}>
        {/* <Abstract/> */}
        <div className='divider-1'></div>
        <SearchBar id='app__search-bar' _records={state._records} setState={setState} />
        <div className='divider-1'></div>
        <CardContainer id='app__card-container' records={state.records} cardChange={setState} selectedCard={state.selectedCard} />
      </div>
      <div id='app__detail-window' style={{ flex: state.visible ? 5 : 0 }}>
        <DetailWindow visible={state.visible} onHide={hide} className='p-sidebar-lg'>
          <FullCard selectedCard={state.selectedCard} links={state.selectedLinks} />
        </DetailWindow>
      </div>
    </div>
  );
}

export default App;
