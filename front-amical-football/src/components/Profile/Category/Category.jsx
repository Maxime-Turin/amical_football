import PropTypes from 'prop-types';

const Category = ({ icon, text }) => (
  <div className="app__profil-infos">
    {icon}
    <p className="infos-team">{text}</p>
  </div>
);
export default Category;

Category.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
};
