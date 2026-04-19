import './App.scss';
import Intro from './components/Intro.tsx';
import MobileOnly from './components/MobileOnly.tsx';

function App() {
  return (
    <MobileOnly>
      <Intro />
    </MobileOnly>
  );
}

export default App;
