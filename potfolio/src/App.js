import List from './pages/list/List';
import New from './pages/new/New';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { userInputs } from './formSource';
import './style/dark.scss';
import { useContext } from 'react';
import { DarkModeContext } from './context/darkModeContext';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<List />} />
              <Route
                path="users/new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
