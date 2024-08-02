import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Windows from './page/Windows';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Windows />} />
      </Routes>
    </Router>
  );
};

export default App;


