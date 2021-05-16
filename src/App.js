import "./App.css";
import Slider from "./Slider";
const data = [{
  interval: false,
}];

function App() {
  return (
    <div>
      <Slider data={data}/>
    </div>
  );
}

export default App;
