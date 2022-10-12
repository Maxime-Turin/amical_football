import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDevTeam } from '../../actions/data';
import './About.scss';
import AboutCard from './AboutCard';

const About = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDevTeam());
  }, []);

  const devTeam = useSelector((state) => state.data.devTeam);

  return (

    <div className="app__about">

      { devTeam && devTeam.map((dev) => (
        <AboutCard
          key={dev.id}
          name={dev.name}
          firstname={dev.firstname}
          role={dev.role}
          desc={dev.desc}
          profilePicture={dev.profilePicture}
          ghUrl={dev.ghUrl}
          lknUrl={dev.lknUrl}
        />
      ))}
    </div>
  );
};

export default About;
