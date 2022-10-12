import React, { useEffect, useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Signup.scss';
import { Button, Icon, Loader } from 'semantic-ui-react';
import Field from '../Login/Field/index';
import {
  changeUserField, login, resetApp, setUserData, signup,
} from '../../actions/user';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mail = useSelector((state) => state.user.mail);
  const phone = useSelector((state) => state.user.phone);
  const postalCode = useSelector((state) => state.user.postalCode);
  const password = useSelector((state) => state.user.password);
  const passwordConfirm = useSelector((state) => state.user.passwordConfirm);
  const teamName = useSelector((state) => state.user.teamName);
  const errorMsg = useSelector((state) => state.user.errorMsg);
  const isSignup = useSelector((state) => state.user.signup);
  const [signinMsg, setSigninMsg] = useState('');
  const [loader, setLoader] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (phone.length !== 10) {
      dispatch(setUserData({ errorMsg: 'Le numéro de téléphone doit conternir 10 chiffres' }));
      return;
    }

    if (postalCode.length !== 5) {
      dispatch(setUserData({ errorMsg: 'Le code postal doit conternir 5 chiffres' }));
      return;
    }

    if (password !== passwordConfirm) {
      dispatch(setUserData({ errorMsg: 'Password différents' }));
      return;
    }
    if (password.length < 8) {
      dispatch(setUserData({ errorMsg: 'Le password doit contenir 8 caractères minimum' }));
      return;
    }

    dispatch(signup());
  };

  useEffect(() => {
    if (isSignup) {
      setLoader(true);
      setSigninMsg('Inscription OK, vous allez etre redirigé');

      setTimeout(() => {
        dispatch(login());
        navigate('/');
      }, 2000);
    }
  }, [isSignup]);

  const changeField = (value, name) => {
    dispatch(changeUserField(value, name));
  };

  return (
    <div className="app__signup">
      <div>
        <Link className="app__signup-profile" to="/signup" target="_blank" rel="noreferrer"><CgProfile /></Link>
      </div>
      <h1 className="app__signup-title">Inscription</h1>
      <p className="app__signup-text">Pour avoir accès à nos services, merci de créer un compte</p>
      {
        loader && (
          <>
            <h1>{signinMsg}</h1>
            <Loader size="big" active />
          </>
        )
      }
      {
        !loader && (
          <form onSubmit={handleSubmit} className="app__signup-form">
            <h1>{errorMsg}</h1>
            <Field
              name="teamName"
              type="text"
              placeholder="Nom d'Equipe"
              onChange={changeField}
              value={teamName}
            />
            <Field
              name="mail"
              type="email"
              placeholder="Adresse Email"
              onChange={changeField}
              value={mail}
            />
            <Field
              name="phone"
              type="phone"
              placeholder="Numéro de Téléphone"
              onChange={changeField}
              value={phone}
            />
            <Field
              name="postalCode"
              type="text"
              placeholder="Code Postal"
              onChange={changeField}
              value={postalCode}
            />
            <Field
              name="password"
              type="password"
              placeholder="Mot de passe"
              onChange={changeField}
              value={password}
            />
            <Field
              name="passwordConfirm"
              type="password"
              placeholder="Confirmer votre Mot de passe"
              onChange={changeField}
              value={passwordConfirm}
            />
            <Button
              classname="signup-btn"
              color="green"
            >
              <Icon name="sign-in" />
              {' '}
              S'inscrire
            </Button>
          </form>
        )
      }
    </div>
  );
};

export default Signup;
