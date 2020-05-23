import "primeflex/primeflex.css";
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/nova-light/theme.css';
import React, { useState, useEffect } from 'react';
import CardContainer from './components/card-container/card-container';
import DetailWindow from './components/detail-window/detail-window';
import FullCard from "./components/detail-window/full-card";
import './shared/css/_prime.scss';
import { getCategories } from "./service/airtable";
import { Abstract } from "./components/abstract";
import { SearchBar } from "./components/search-bar/search-bar";

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
};

const App = () => {
  let [state, baseSetState] = useState(StateDefault);
  const setState = (props) => baseSetState({...state, ...props});

  const hide = () => setState({...StateDefault, records: state.records});

  useEffect(() => {
    (async function fetch() {
      const rows = await getCategories();
      rows.eachPage(
        (records, fetchNextPage) => {
          const simpleRecords = records
            .map(({fields}) => fields) // strip Airtable operations
            .filter(field => field.staging !== true);
          setState({records: simpleRecords, _records: simpleRecords});
        },
        (err) => {
          if (err) { console.error(err); return; }
        }
      );
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
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
          <FullCard selectedCard={state.selectedCard} />
        </DetailWindow>
      </div>
    </div>
  );
}

export default App;
