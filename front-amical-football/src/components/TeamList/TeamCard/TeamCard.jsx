import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';
import { getTeamInfo } from '../../../actions/user';
import '../TeamList.scss';

const TeamCard = ({
  picture, teamName, city, description, id,
}) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(getTeamInfo(id));
  };

  return (
    <Card as={Link} onClick={handleClick} to="/teamProfile" className="teamCard">
      <img alt="team-logo" className="teamCard-img" src={picture} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{teamName}</Card.Header>
        <Card.Meta>
          <span>{city}</span>
        </Card.Meta>
        <Card.Description>
          {description}
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

TeamCard.propTypes = {
  teamName: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  picture: PropTypes.string.isRequired,
};

export default TeamCard;
