import React, {useEffect, useState} from 'react';

import logo from './logo.svg';
import './App.css';

import CiteTable from './CiteTable';
import {generateCiteTableDataFromListOfCitations, fetchCitationsForArXivId} from './Utils';

function App() {

  const [data, setData] = useState([]);
  const [paperCount, setPaperCount] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);

  const [paperIds, setPaperIds] = useState({"p1_id": "", "p2_id": "", "p3_id": "", "p4_id": ""});

  return (
    <div className="App">
      <div>
        <h2 style={{fontFamily: 'Times New Roman'}}><b>CiteSeer</b></h2>
      </div>
      <br></br>
      <div style={{width: '80%', margin: 'auto'}}>
      <fieldset style={{borderRadius: '10px', padding: '16px'}}>
      <legend style={{textAlign: 'center'}}>Paper Inputs</legend>

      <div>
        <div style={{display: 'flex', flexDirection: 'row'}}>

          <div style={{padding: '16px', display: 'flex', width: '25%'}}>
            <span style={{marginRight: '8px'}}>Paper 1 ArXiv Id: </span>
            <input onChange={(e) => {setPaperIds({...paperIds, "p1_id": e.target.value})}} placeholder="2003.08934"></input>
          </div>
          <div style={{padding: '16px', display: 'flex', width: '25%'}}>
            <span style={{marginRight: '8px'}}>Paper 2 ArXiv Id: </span>
            <input onChange={(e) => {setPaperIds({...paperIds, "p2_id": e.target.value})}} placeholder="2006.09661"></input>
          </div>
          <div style={{padding: '16px', display: 'flex', width: '25%'}}>
            <span style={{marginRight: '8px'}}>Paper 3 ArXiv Id: </span>
            <input onChange={(e) => {setPaperIds({...paperIds, "p3_id": e.target.value})}} placeholder="1609.09106"></input>
          </div>
          <div style={{padding: '16px', display: 'flex', width: '25%'}}>
            <span style={{marginRight: '8px'}}>Paper 4 ArXiv Id: </span>
            <input onChange={(e) => {setPaperIds({...paperIds, "p4_id": e.target.value})}} placeholder="2101.06742"></input>
          </div>
        </div>

      </div>
      <div style={{width: '80%', margin: 'auto'}}>
        <button onClick={async (e) => {
          var t0 = performance.now()
          let out = await generateCiteTableDataFromListOfCitations([await fetchCitationsForArXivId(paperIds.p1_id), await fetchCitationsForArXivId(paperIds.p2_id), await fetchCitationsForArXivId(paperIds.p3_id), await fetchCitationsForArXivId(paperIds.p4_id)]);
          var t1 = performance.now()
          setPaperCount(out[0]);
          setData(out[1]);
          setTimeTaken(t1 - t0);
        }}>Find Common Citations</button>
      </div>
      </fieldset>
      </div>
      <br></br>
      {data.length > 0 && <div style={{display: 'flex', width: '80%', margin: 'auto'}}>
          <p style={{textAlign: 'left', width: '50%'}}><b>{paperCount}</b> unique papers found</p>
          <p style={{textAlign: 'right', width: '50%'}}>in <b>{timeTaken.toFixed(2)}</b> ms</p>
      </div>}
      {data.length > 0 && <>
      <div style={{width: '80%', margin: 'auto'}}>
        <div style={{display: 'block'}}>
          <CiteTable data={data} />
        </div>
      </div>
      <br></br>
      </>}
      
      <footer style={{fontSize: '12px'}}>
        <span>powered by Semantic Scholar API</span>
        <br></br>
        <span><a href="https://egrigokhan.github.io">@Gokhan Egri, 2021</a></span>
        <br></br>
        <span>[<b>last updated:</b> 9/16/21 14:02 EDT]</span>
      </footer>
    </div>
  );
}

export default App;
