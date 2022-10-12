import React, { useState, useEffect } from 'react';
import './AnnounceModal.scss';
import {
  Button, Header, Select, Modal,
} from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import categoryOptions from '../../../data/category';
import fieldOptions from '../../../data/field';
import placeOptions from '../../../data/place';
import '../Announces.scss';
import { changeAnnouncefield, createNewAnnounce } from '../../../actions/data';

const AnnounceModal = () => {
  const dispatch = useDispatch();

  const date = useSelector((state) => state.data.date);
  const place = useSelector((state) => state.data.place);
  const category = useSelector((state) => state.data.category);
  const field = useSelector((state) => state.data.field);

  const handleChange = (_, data) => {
    dispatch(changeAnnouncefield(data.value, data.name));
  };

  const handleChangeDate = (e) => {
    dispatch(changeAnnouncefield(e.target.value, e.target.name));
  };

  const [open, setOpen] = useState(false);
  const [validated, setValidated] = useState(false);

  const HandleValidateAnnounceClick = () => {
    setValidated(true);
    setOpen(false);
    setTimeout(() => {
      setValidated(false);
    }, 1500);
    dispatch(createNewAnnounce());
  };

  return (
    <>

      <Modal
        closeIcon
        open={open}
        trigger={<Button className="button-publish" color="green">Publier une annonce</Button>}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <Header icon="soccer" content="On le joue ce match?" />
        <Modal.Content>
          <div className="inputAnnounce">
            <div>
              <input
                type="date"
                value={date}
                name="date"
                className="announce-select"
                placeholder="terrain"
                onChange={handleChangeDate}
              />
              <Select
                value={field}
                name="field"
                className="announce-select"
                placeholder="terrain"
                onChange={handleChange}
                options={fieldOptions}
              />
            </div>
            <div>
              <Select
                value={category}
                name="category"
                className="announce-select"
                placeholder="catégorie"
                onChange={handleChange}
                options={categoryOptions}
              />

              <Select
                value={place}
                name="place"
                className="announce-select"
                placeholder="Dom/Ext"
                onChange={handleChange}
                options={placeOptions}
              />
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" className="validate-btn" onClick={() => HandleValidateAnnounceClick()}>Publier</Button>
          <Button color="red" className="cancel-btn" onClick={() => setOpen(false)}>Annuler</Button>
        </Modal.Actions>
      </Modal>
      <Modal
        content="Votre annonce a bien été crée"
        open={validated}
      />
    </>
  );
};

export default AnnounceModal;
