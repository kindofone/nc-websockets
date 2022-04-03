import './App.css';
import useWebSocket from 'react-use-websocket';

const wsUrl = 'ws://localhost:8000';

function App() {
  const {
    sendMessage,
    lastMessage,
  } = useWebSocket(wsUrl);
  
  return (
    <div className="App">
      <button onClick={() => sendMessage("Hello")}>Hello</button>
      <div>
        {lastMessage?.data}
      </div>
    </div>
  );
}

export default App;
