import PropTypes from 'prop-types';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Header, Icon, Modal,
} from 'semantic-ui-react';
import { rejectedRequest } from '../../../actions/request';

const RejectAnnounceModal = ({
  date, team, place, field, id,
}) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const teamName = useSelector((state) => state.user.teamName);

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const rejectAnnounce = () => {
    setOpen(false);
    console.log('MODALE ID >>> ', id);
    dispatch(rejectedRequest(id));
    console.log('le match a bien été validé');
  };

  return (
    <Modal
      closeIcon
      open={open}
      trigger={<Button color="red">Refuser</Button>}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon="soccer" content="ohh, tu refuses le match?" />
      <Modal.Content>
        <p>
          c'est ton dernier mot?
        </p>
        <h1>
          {teamName}
          {' '}
          contre
          {' '}
          {team}
        </h1>
        <p>
          Le :
          {' '}
          {formatDate(date)}
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
        <Button
          color="green"
          onClick={rejectAnnounce}
        >
          <Icon name="checkmark" />
          {' '}
          Oui
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

RejectAnnounceModal.propTypes = {
  date: PropTypes.string.isRequired,
  team: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default RejectAnnounceModal;
