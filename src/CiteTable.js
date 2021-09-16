import React, {useState} from 'react';
 
import SortableTable from 'react-sortable-table';

window.React = require('react');

const CiteTable = ({data}) => {
    const columns = [
        /*
      {
        header: 'ID',
        key: 'paperId',
        sortable: false,
        headerStyle: { fontSize: '15px', backgroundColor: '#FFDAB9', width: '100px' },
        dataStyle: { fontSize: '15px', backgroundColor: '#FFDAB9'},
        dataProps: { className: 'align-left padding-8' }
      },
      */
      {
        header: 'TITLE',
        key: 'title',
        headerStyle: { fontSize: '15px', borderBottom: 'solid 2px black'  },
        headerProps: { className: 'align-left padding-8' },
        dataProps: {className: 'align-left padding-8'},
        defaultSorting: 'ASC',
        render: (title) => { return <b>{title}</b>; }
      },
      {
        header: 'AUTHORS',
        key: 'author_text',
        headerStyle: { fontSize: '15px', borderBottom: 'solid 2px black'  },
        headerProps: { className: 'align-left padding-8' },
        dataProps: {className: 'align-left padding-8'},
        sortable: false
      },
      {
        header: 'YEAR',
        key: 'year',
        headerStyle: { fontSize: '15px', borderBottom: 'solid 2px black' },
        headerProps: { className: 'align-left padding-8' },
        dataProps: {className: 'align-left padding-8'},
        defaultSorting: 'DESC'
      },
      {
        header: 'URL',
        key: 'url',
        headerStyle: { fontSize: '15px', borderBottom: 'solid 2px black'  },
        headerProps: { className: 'align-left padding-8' },
        // defaultSorting: 'ASC',
        render: (url) => { return <a href={url}>semantic scholar</a>; }
      },
      {
        header: 'CITES PAPER 1',
        key: 'cites_paper_1',
        headerStyle: { fontSize: '15px', borderBottom: 'solid 2px black'  },
        sortable: false,
        render: (c) => { return <div style={{backgroundColor: c ? 'green' : 'red'}}><span>{c}</span></div>; }
      },
      {
        header: 'CITES PAPER 2',
        key: 'cites_paper_2',
        headerStyle: { fontSize: '15px', borderBottom: 'solid 2px black'  },
        sortable: false,
        render: (c) => { return <div style={{backgroundColor: c ? 'green' : 'red'}}><span>{c}</span></div>; }
      },
      {
        header: 'CITES PAPER 3',
        key: 'cites_paper_3',
        headerStyle: { fontSize: '15px', borderBottom: 'solid 2px black'  },
        sortable: false,
        render: (c) => { return <div style={{backgroundColor: c ? 'green' : 'red'}}><span>{c}</span></div>; }
      },
      {
        header: 'CITES PAPER 4',
        key: 'cites_paper_4',
        headerStyle: { fontSize: '15px', borderBottom: 'solid 2px black'  },
        sortable: false,
        render: (c) => { return <div style={{backgroundColor: c ? 'green' : 'red'}}><span>{c}</span></div>; }
      },
      {
        header: 'CITES COUNT',
        key: 'cites_count',
        headerStyle: { fontSize: '15px', borderBottom: 'solid 2px black'  },
        defaultSorting: 'DESC',
      }
    ];
 
    const style = {
      backgroundColor: '#eee'
    };
 
    const iconStyle = {
      color: '#aaa',
      paddingLeft: '5px',
      paddingRight: '5px'
    };
 
    return (
      <SortableTable
        data={data}
        columns={columns}
        style={style}
        iconStyle={iconStyle} />
    );
}

export default CiteTable;