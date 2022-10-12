import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Segment, Select, Icon, Button, CardGroup,
} from 'semantic-ui-react';
import {
  getAllAnnounces,
  getDepartmentList,
  doSearch,
} from '../../actions/data';
import CardAnnonce from './CardAnnonce/CardAnnonce';
import './Search.scss';
import category from '../../data/category';
import field from '../../data/field';
import formatDate from '../../utils/formatDate';

const Search = () => {
  const dispatch = useDispatch();
  const researchResult = useSelector((state) => state.data.researchResult);

  useEffect(() => {
    dispatch(getAllAnnounces());
    dispatch(getDepartmentList());
  }, []);

  let departmentFormatted = [];
  let departmentWithBlank = [];

  const departmentFromApi = useSelector((state) => state.data.departmentList);
  if (departmentFromApi) {
    departmentFormatted = departmentFromApi.map((element) => ({
      key: element.code,
      value: element.code,
      text: element.nom,
    }));
    departmentWithBlank = [
      { key: 0, value: '', text: '' },
      ...departmentFormatted,
    ];
  }

  const [depValue, setDepValue] = useState('');
  const [fieldValue, setFieldValue] = useState('');
  const [categoryValue, setCategoryValue] = useState('');
  const [dateValue, setDateValue] = useState('');

  const handleDepChange = (e, data) => {
    setDepValue(data.value);
  };
  const handleFieldChange = (e, data) => {
    setFieldValue(data.value);
  };
  const handleCategoryChange = (e, data) => {
    setCategoryValue(data.value);
  };
  const handleDateChange = (e) => {
    setDateValue(e.target.value);
  };

  const handleClick = () => {
    dispatch(doSearch({
      depValue, fieldValue, dateValue, categoryValue,
    }));
  };

  return (
    <div className="app__search">
      <Segment className="app__search-segment">
        <Icon className="icon-search" name="search" size="big" />
        <Select
          value={depValue}
          name="dept-search"
          className="search-select"
          placeholder="Département"
          onChange={handleDepChange}
          options={departmentWithBlank}
        />
        <Select
          value={categoryValue}
          name="field-search"
          className="search-select"
          placeholder="Catégorie"
          onChange={handleCategoryChange}
          options={category}
        />
        <Select
          value={fieldValue}
          name="cat-search"
          className="search-select"
          placeholder="Type de terrain"
          onChange={handleFieldChange}
          options={field}
        />
        <div className="input_select">
          <input
            type="date"
            value={dateValue}
            onChange={handleDateChange}
          />
        </div>

        <div className="search-container">
          <Icon className="search-icon" name="search" size="big" />

          <Button
            onClick={() => handleClick()}
            className="search-button"
            basic
            color="green"
          >
            Rechercher
          </Button>
        </div>
      </Segment>
      <Segment>
        Résultats :
        {' '}
        {researchResult && researchResult.length}
        {' '}
        {researchResult && (researchResult.length === 1 ? 'match disponible' : 'matchs disponibles')}
      </Segment>
      <CardGroup className="card-group">
        {researchResult
        && researchResult.map((announce) => (
          <CardAnnonce
            key={announce.announcementId}
            id={announce.announcementId}
            userId={announce.announcementUserId}
            date={announce.announcementDate}
            city={announce.userCity}
            team={announce.userTeamName}
            level={announce.announcementLevel}
            field={announce.announcementField}
            picture={announce.userPicture}
            place={announce.announcementPlace}
          />
        ))}
      </CardGroup>

    </div>
  );
};

export default Search;
