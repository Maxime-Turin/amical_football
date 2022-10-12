import React, { useState, useEffect } from 'react';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import images from '../../constants/images';
import './HeaderNav.scss';
import { logout, resetApp, tryToken } from '../../actions/user';
import {
  Button, Header, Icon, Modal,
} from 'semantic-ui-react';

const HeaderNav = () => {
  const [toggle, setToggle] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLogged = useSelector((state) => state.user.logged);
  const teamName = useSelector((state) => state.user.teamName);

  const doug = useSelector((state) => state.user.doug);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(tryToken());
    if (!doug) {
      setOpenModal(true);
      setTimeout(() => {
        dispatch(resetApp());
        setOpenModal(false);
        navigate('/login');
      }, 1500);
    }
  });

  const classNameNav = ({ isActive }) => classNames('', { active_link: isActive });

  const handleClick = () => {
    dispatch(resetApp());
  };

  const handleClickLogo = () => {
    navigate('/');
  };

  return (
    <>

      <Modal
        basic
        open={openModal}
      >
        <Header icon>
          <Icon name="ban" />
          Votre connexion a expirée, vous allez être redirigé . . .
        </Header>

      </Modal>
      <nav className="app__navbar">
        <Link to="/" className="app__navbar-logo" onClick={handleClickLogo}>
          <img src={images.logoComplet} alt="logo" />
        </Link>
        <ul className="app__navbar-links">

          <li className="app__flex p-text">
            <div />
            <NavLink to="/" className={classNameNav}>Accueil</NavLink>
          </li>

          {
            !isLogged && (
            <>
              <li className="app__flex p-text">
                <div />
                <NavLink to="/inscription" className={classNameNav}>S&#39;inscrire</NavLink>
              </li>
              <li className="app__flex p-text">
                <div />
                <NavLink to="/login" className={classNameNav}>Se connecter</NavLink>
              </li>

            </>
            )
        }
          {
            isLogged && (
            <>
              <li className="app__flex p-text">
                <div />
                <NavLink to="/profil" className={classNameNav}>Profil</NavLink>
              </li>
              <li className="app__flex p-text">
                <div />
                <NavLink to="/annonces" className={classNameNav}>Mes annonces</NavLink>
              </li>
              <li className="app__flex p-text">
                <div />
                <NavLink className={classNameNav} to="/recherche">Recherche</NavLink>
              </li>
              <li className="app__flex p-text">
                <div />
                <NavLink className={classNameNav} to="/teamList">Liste des Equipes</NavLink>
              </li>
              <div className="deco">
                <p>
                  {teamName}
                </p>
                <Button
                  onClick={handleClick}
                  className="deco-btn"
                  inverted
                  color="red"
                >
                  <Icon name="user" />
                  {' '}
                  Déconnexion
                </Button>
              </div>

            </>

            )
        }

          <li className="app__flex p-text">
            <div />
            <NavLink className={classNameNav} to="/apropos">A propos</NavLink>
          </li>

        </ul>

        <div className="app__navbar-menu">
          <HiMenuAlt4 onClick={() => setToggle(true)} />

          {toggle && (
          <motion.div
            whileInView={{ x: [300, 0] }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
          >
            <HiX onClick={() => setToggle(false)} />
            <ul>
              <li className="app__flex p-text">

                <NavLink to="/" onClick={() => setToggle(false)}>Accueil</NavLink>
              </li>
              {!isLogged && (
              <>
                <li className="app__flex p-text">

                  <NavLink to="/inscription" onClick={() => setToggle(false)}>S&#39;inscrire</NavLink>
                </li>
                <li className="app__flex p-text">

                  <NavLink to="/login" onClick={() => setToggle(false)}>Se connecter</NavLink>
                </li>

              </>
              )}
              {isLogged && (
              <>
                <li className="app__flex p-text">

                  <NavLink to="/profil" onClick={() => setToggle(false)}>Profil</NavLink>
                </li>
                <li className="app__flex p-text">

                  <NavLink to="/annonces" onClick={() => setToggle(false)}>Mes annonces</NavLink>
                </li>
                <li className="app__flex p-text">

                  <NavLink to="/recherche" onClick={() => setToggle(false)}>Recherche</NavLink>
                </li>
                <li className="app__flex p-text">
                  <NavLink to="/teamList" onClick={() => setToggle(false)}>Liste des Equipes</NavLink>
                </li>
              </>
              )}

              <li className="app__flex p-text">

                <NavLink to="/apropos" onClick={() => setToggle(false)}>A propos</NavLink>
              </li>

              {
              isLogged && (
                <li className="app__flex p-text">

                  <NavLink
                    className="deco-btn-mobile"
                    to="/"
                    onClick={() => {
                      setToggle(false);
                      dispatch(logout());
                    }}
                  >
                    Deconnexion
                  </NavLink>
                </li>
              )
            }
            </ul>
          </motion.div>
          )}
        </div>
      </nav>
    </>
  );
};

export default HeaderNav;
