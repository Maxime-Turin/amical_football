import { Card, Icon, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './About.scss';
import { Link } from 'react-router-dom';

const AboutCard = ({
  name, firstname, role, desc, profilePicture, ghUrl, lknUrl,
}) => (
  <Card as={Link} to="" color="orange" className="app__about-card">
    <Image src={profilePicture} wrapped ui={false} />
    <Card.Content>
      <Card.Header>
        {name}
        {' '}
        {firstname}
      </Card.Header>
      <Card.Meta>
        <span className="role">{role}</span>
      </Card.Meta>
      <Card.Description>
        {desc}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a href={ghUrl}>
        <Icon name="github" size="big" color="black" />
      </a>
      <a href={lknUrl}>
        <Icon name="linkedin" size="big" color="blue" />
      </a>
    </Card.Content>
  </Card>
);
export default AboutCard;

AboutCard.propTypes = {
  name: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  profilePicture: PropTypes.string.isRequired,
  ghUrl: PropTypes.string.isRequired,
  lknUrl: PropTypes.string.isRequired,
};
