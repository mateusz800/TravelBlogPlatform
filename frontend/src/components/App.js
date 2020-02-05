import React from 'react'
import ReactDOM from 'react-dom'


const App = () => {
    return <div>Hello World</div>;
}
    


export default App;

const container = document.querySelector('#app');
ReactDOM.render(<App/>, container);