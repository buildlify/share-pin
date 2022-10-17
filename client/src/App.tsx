import { HashRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<>test</>} />
      </Routes>
    </HashRouter>
  );
};

export default App;
