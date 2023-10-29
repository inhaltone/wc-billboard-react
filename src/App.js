import './App.css';
import Billboard from "./Components/Billboard/Billboard";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Billboard>
                    <h5>React Component: Billboard</h5>
                </Billboard>
                <Billboard rate={2}>
                    <h5>React Component: Billboard</h5>
                </Billboard>
                <Billboard rate={3}>
                    <h5>React Component: Billboard</h5>
                </Billboard>
                <Billboard rate={3} direction='right'>
                    <h5>React Component: Billboard</h5>
                </Billboard>
                <Billboard rate={2} direction='right'>
                    <h5>React Component: Billboard</h5>
                </Billboard>
                <Billboard rate={.5} direction='right'>
                    <h5>React Component: Billboard</h5>
                </Billboard>
            </header>
        </div>
    );
}

export default App;
