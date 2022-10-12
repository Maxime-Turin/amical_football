import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'semantic-ui-react';

import './CardAnnonce.scss';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ValidateModal from '../ValidateModal/ValidateModal';
import { getTeamInfo } from '../../../actions/user';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const CardAnnonce = ({
  date, team, level, field, picture, place, city, id, userId,

}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    dispatch(getTeamInfo(userId));
    navigate('/teamProfile');
  };

  return (

    <Card className="search-card" key="">
      <img
        className="img"
        src={picture}
        size="medium"
        alt="team logo"
      />

      <Card.Content>

        <Card.Header>{ formatDate(date) }</Card.Header>
        <Card.Description>
          <span>
            <span className="desc-name">EQUIPE :</span>
            {' '}
            {team}
          </span>
        </Card.Description>
        <Card.Description>
          <span>
            <span className="desc-name">VILLE :</span>
            {' '}
            {city}
          </span>
        </Card.Description>
        <Card.Description>
          <span>
            <span className="desc-name">CATEGORIE :</span>
            {' '}
            {level}
          </span>
        </Card.Description>
        <Card.Description>
          <p>
            <span className="desc-name">TERRAIN :</span>
            {' '}
            {field}
          </p>
        </Card.Description>
        <Card.Description>
          <p>
            {team}
            {' '}
            veut jouer à :
            {' '}
            {place}
          </p>
        </Card.Description>
        <div className="search-button-card">

          <ValidateModal date={date} team={team} place={place} field={field} id={id} />
          <Button className="validate-button-card" onClick={handleClick}>Voir le profil</Button>
        </div>
      </Card.Content>

    </Card>
  );
};
CardAnnonce.propTypes = {
  date: PropTypes.string.isRequired,
  team: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
};

export default CardAnnonce;
