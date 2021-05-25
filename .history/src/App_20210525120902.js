import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = ( ) => {
    const [data, setData] = useState([]);
    
    function fetchData() {
        axios.get('')
    } 
    return (
        <div>App</div>
    )
}

export default App;
