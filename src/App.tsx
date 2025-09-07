import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { Step3 } from './Step3';

function App() {
  return (
    <div>
      <Router 
        // убрал консольные предупреждения react-router-dom
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          <Route path='/' element={<Step1 />} />
          <Route path='/step2' element={<Step2 />} />
          <Route path='/step3' element={<Step3 />} />
        </Routes>  
      </Router>
    </div>
  );
}

export default App;
