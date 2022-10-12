import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardGroup,
  Icon, Image, Input, Loader, Segment,
} from 'semantic-ui-react';
import { getAllTeams } from '../../actions/data';
import { changeUserField } from '../../actions/user';

import TeamCard from './TeamCard/TeamCard';
import './TeamList.scss';

const TeamList = () => {
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.data.loader);
  const allTeams = useSelector((state) => state.data.users) || [];
  const [results, setResults] = useState([]);

  useEffect(() => {
    dispatch(getAllTeams());

    setResults(allTeams);
  }, [loader]);

  const teamSearch = useSelector((state) => state.user.teamSearch);

  useEffect(() => {
    const data = allTeams.filter((item) => item.teamName.toLowerCase().includes(teamSearch));
    setResults(data);
  }, [teamSearch]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(changeUserField(e.target.value, 'teamSearch'));
  };

  return (
    <div className="app__teamlist">
      <Segment>
        {/* <form onSubmit={handleSearch} action="submit"> */}
        <Input value={teamSearch} onChange={handleSearch} placeholder="Rechercher une équipe" className="app__teamlist-input" />
        <Icon name="search" size="big" className="app__teamlist-icon" />
        {/* <button type="submit" /> */}
        {/* </form> */}
      </Segment>
      <Loader active={loader} />
      {
        !loader && (

        <CardGroup className="teamlist-group">
          {
        results.map((team) => (
          <TeamCard
            key={team.id}
            id={team.id}
            picture={team.picture}
            teamName={team.teamName}
            city={team.city}
            description={team.description}
          />
        ))
      }
        </CardGroup>
        )
      }
    </div>
  );
};
export default TeamList;
