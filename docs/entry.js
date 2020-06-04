
    window.reactComponents = {};

    window.vueComponents = {};

  
      import React from "react";

      import ReactDOM from "react-dom";


      import ReactWrapper from '../node_modules/better-docs/lib/react-wrapper.js';

      window.React = React;

      window.ReactDOM = ReactDOM;

      window.ReactWrapper = ReactWrapper;

    
    import './styles/reset.css';

    import './styles/iframe.css';

  import Component0 from '../src/components/Envelopes/index.jsx';
reactComponents['Envelopes'] = Component0;

import Component1 from '../src/components/Ledger/index.jsx';
reactComponents['Ledger'] = Component1;

import Component2 from '../src/components/Transactions/index.jsx';
reactComponents['Transactions'] = Component2;

import Component3 from '../src/components/Envelopes/components/TransferModal/index.jsx';
reactComponents['TransferModal'] = Component3;