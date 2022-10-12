import PropTypes from 'prop-types';
import '../Profile.scss';

const EditProfile = ({
  icon, text, name, onChange, isSelect, selectOption,
}) => {
  const handleChange = (evt) => {
    onChange(evt.target.value, name);
  };

  return (
    <div className="app__profil-infos">
      {icon}
      {
        !isSelect && <input className="infos-team" value={text} name={name} type="text" onChange={handleChange} />
      }
      {
        isSelect && (
          <>
            <label />
            <select className="selectItemProfile" onChange={handleChange}>
              {
                selectOption.map((item) => (
                  <option key={item.vaue} value={item.value}>{item.text}</option>
                ))
              }
            </select>
          </>
        )
      }
    </div>

  );
};
export default EditProfile;

EditProfile.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isSelect: PropTypes.bool,
  selectOption: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
  ),
};

EditProfile.defaultProps = {
  isSelect: false,
  selectOption: [],
};
