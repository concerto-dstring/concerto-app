  /**
   * Copyright Schrodinger, LLC
   */

  "use strict";

  import React from 'react';
  
  import MainTableDataStore from './maintable/MainTableDataStore';

  import MainPage from './MainPage.js'
  
  class App extends React.Component {
  
    render() {

      var dataset = new MainTableDataStore();
      dataset.createFakeObjectData();

      return (
          <MainPage dataset={dataset} />
      );
    }
  }

  export default App;