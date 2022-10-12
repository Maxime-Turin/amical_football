import PropTypes from 'prop-types';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button, Header, Icon, Modal,
} from 'semantic-ui-react';
import { makeNewRequest } from '../../../actions/request';

const ValidateModal = ({
  date, team, place, field, id,
}) => {
  const [open, setOpen] = useState(false);
  const [validated, setValidated] = useState(false);

  const dispatch = useDispatch();

  const validate = () => {
    setValidated(true);
    setOpen(false);
    setTimeout(() => {
      setValidated(false);
    }, 1500);
    dispatch(makeNewRequest(id));
    console.log('le match a bien été validé');
  };

  return (
    <Modal
      closeIcon
      open={open}
      trigger={<Button color="green">Faire une demande</Button>}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon="soccer" content="On valide ?" />
      <Modal.Content>
        <p>
          Voici les infos du match selectionné :
        </p>
        <h1>{team}</h1>
        <p>
          Le :
          {' '}
          {date}
        </p>
        <p>
          Se jouant a :
          {' '}
          {place}
        </p>
        <p>
          Sur un terrain :
          {' '}
          {field}
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => setOpen(false)}>
          <Icon name="remove" />
          {' '}
          Non
        </Button>
        <Button color="green" onClick={validate}>
          <Icon name="checkmark" />
          {' '}
          Oui
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ValidateModal;

ValidateModal.propTypes = {
  date: PropTypes.string.isRequired,
  team: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
};
