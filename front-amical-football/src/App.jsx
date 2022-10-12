import { Navigate, Route, Routes } from 'react-router-dom';

import './App.css';
import { useSelector } from 'react-redux';
import Home from './components/Home/Home';
import HeaderNav from './components/HeaderNav/HeaderNav';
import About from './components/About/About';
import Announce from './components/Announces/Announces';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Search from './components/Search/Search';
import Profile from './components/Profile/Profile';
import NotFound from './components/NotFound/NotFound';
import TeamProfile from './components/TeamProfile/TeamProfile';
import TeamList from './components/TeamList/TeamList';

const App = () => {
  const isLogged = useSelector((state) => state.user.logged);

  return (
    <div className="App">
      <HeaderNav />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/inscription" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/apropos" element={<About />} />

        <Route path="/teamProfile" element={isLogged ? <TeamProfile /> : <Navigate to="/" />} />
        <Route path="/profil" element={isLogged ? <Profile /> : <Navigate to="/" />} />
        <Route path="/annonces" element={isLogged ? <Announce /> : <Navigate to="/" />} />
        <Route path="/recherche" element={isLogged ? <Search /> : <Navigate to="/" />} />
        <Route path="/teamList" element={isLogged ? <TeamList /> : <Navigate to="/" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </div>
  );
};

export default App;
