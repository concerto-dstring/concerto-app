  /**
   * Copyright Schrodinger, LLC
   */

  "use strict";

  import React from 'react';
  
  import MainTableDataStore from './maintable/MainTableDataStore';
  import MiniSidebar from './Sidebar.js'
  
  class App extends React.Component {
  
    render() {

      var datastore = new MainTableDataStore();
      datastore.createFakeObjectData();

      return (
          <MiniSidebar dataset={datastore} />
      );
    }
  }

  export default App;