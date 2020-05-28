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

  useEffect(() => {
    (async function fetch() {
      Promise.all([
        setCategories(), 
        setLinks()
      ]).then(
        res => setState({
          ...res[0],
          ...res[1]
        }),
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
      <div className='flex-column' style={{flex: state.visible ? 1 : 6}}>
        <Abstract/>
        <div className='divider-1'></div>
        <SearchBar _records={state._records} setState={setState} />
        <div className='divider-1'></div>
        <div style={{display: 'flex'}}>
          <CardContainer records={state.records} cardChange={setState} selectedCard={state.selectedCard} />
        </div>
      </div>
      <div className='sticky-top-0' style={{ flex: state.visible ? 5 : 0, top: '0', height: '100vh' }}>
        <DetailWindow visible={state.visible} onHide={hide} className='p-sidebar-lg'>
          <FullCard selectedCard={state.selectedCard} links={state.selectedLinks} />
        </DetailWindow>
      </div>
    </div>
  );
}

export default App;
