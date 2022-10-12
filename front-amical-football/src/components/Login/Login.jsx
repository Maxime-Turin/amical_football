import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import { CgProfile } from 'react-icons/cg';
import { Link, Navigate } from 'react-router-dom';
import './Login.scss';
import Field from './Field/index';
import { changeUserField, login } from '../../actions/user';

const Login = () => {
  const dispatch = useDispatch();
  const mail = useSelector((state) => state.user.mail);
  const password = useSelector((state) => state.user.password);
  const isLogged = useSelector((state) => state.user.logged);
  const errorMsg = useSelector((state) => state.user.errorMsg);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login());
  };

  const changeField = (value, name) => {
    dispatch(changeUserField(value, name));
  };

  return (
    <div className="app__login">
      <div>
        <Link className="app__login-profile" to="/login" target="_blank" rel="noreferrer"><CgProfile /></Link>
      </div>
      <h1 className="app__login-title">Hey Salut</h1>
      <p className="app__login-text">Pour avoir accès à nos services, merci de vous connecter</p>
      <h1>{errorMsg}</h1>
      {isLogged && <Navigate to="/" replace />}
      {!isLogged && (
        <form autoComplete="off" className="app__login-form" onSubmit={handleLogin}>
          <Field
            name="mail"
            type="email"
            placeholder="Adresse Email"
            onChange={changeField}
            value={mail}
          />
          <Field
            name="password"
            type="password"
            placeholder="Mot de passe"
            onChange={changeField}
            value={password}
          />

          <Button
            type="submit"
            className="login-form-button"
            color="teal"
          >
            <Icon name="user" />
            {' '}
            Connexion
          </Button>

        </form>
      )}

    </div>

  );
};

export default Login;
