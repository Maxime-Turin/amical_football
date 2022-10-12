import React, { useEffect, useState } from 'react';
import {
  Button, Card, CardGroup, Confirm, Dropdown, Icon, Menu, Segment, Select,
} from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import './Announces.scss';
import { useNavigate } from 'react-router-dom';
import announces from '../../data/announces';
import AnnounceModal from './AnnounceModal/AnnounceModal';
import { deleteAnnounce, getTeamAnnounces } from '../../actions/data';
import { getTeamInfo } from '../../actions/user';
import ValidateAnnounceModal from './ValidateAnnounceModal/ValidateAnnounceModal';
import RejectAnnounceModal from './RejectAnnounceModal/RejectAnnounceModal';
import formatDate from '../../utils/formatDate';

const Announces = () => {
  const dispatch = useDispatch();

  const [announceValue, setAnnounceValue] = useState('');
  const [openAnnounceModal, setOpenAnnounceModal] = useState(false);

  // const { announcements: teamAnnounce } = useSelector((state) => state.data.teamAnnounce);
  const { teamAnnounce } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(getTeamAnnounces());
  }, [announceValue]);

  const picture = useSelector((state) => state.user.picture);

  const handleAnnouncesChange = (e, data) => {
    setAnnounceValue(data.value);
    setOpenAnnounceModal(false);
  };

  // suppression announce modal

  const [modalDeleteAnnounce, setModalDeleteAnnounce] = useState(false);
  const [announceId, setAnnounceId] = useState('');

  const switchAnnounceModal = (id) => {
    setAnnounceId(id);
    setModalDeleteAnnounce(true);
  };

  const handleDeleteAnnounce = () => {
    setModalDeleteAnnounce(false);
    dispatch(deleteAnnounce(announceId));
  };

  // received request

  // console.log(teamAnnounce);
  const requestsReceived = useSelector((state) => state.data.requestsReceived);
  // console.log(requestsReceived);

  const requestsSended = useSelector((state) => state.data.requestsSended);
  // console.log(requestsSended);

  // setting profile page

  const navigate = useNavigate();
  const handleClick = (id) => {
    dispatch(getTeamInfo(id));
    navigate('/teamProfile');
  };

  return (
    <div className="app__annonce">
      <div className="app__annonce-publish">
        <img className="image-annonce" src={picture} alt="" />
        <AnnounceModal />
      </div>
      <Menu className="menu-announces" compact>

        <Dropdown
          value={announceValue}
          name="field-search"
          placeholder="Voir mes annonces"
          onChange={handleAnnouncesChange}
          options={announces}
          simple
          item
        />
      </Menu>
      {!openAnnounceModal && announceValue === 'Mes annonces crées' && (
        <CardGroup className="card-annonce-group">

          {teamAnnounce.map((announcement) => (

            <Card className="card-annonce-annonce" key={announcement.announcementId} href="" target="_blank">

              <Card.Content className="card-annonce-content">

                <Card.Header>{formatDate(announcement.announcementDate)}</Card.Header>
                <Card.Description>
                  <span>
                    <span className="desc-name">CATEGORIE :</span>
                    {' '}
                    {announcement.announcementLevel}
                  </span>
                </Card.Description>
                <Card.Description>
                  <span>
                    <span className="desc-name">LIEU :</span>
                    {' '}
                    {announcement.announcementPlace}
                  </span>
                </Card.Description>
                <Card.Description>
                  <p>
                    <span className="desc-name">TERRAIN :</span>
                    {' '}
                    {announcement.announcementField}
                  </p>
                </Card.Description>
                <Button onClick={() => switchAnnounceModal(announcement.announcementId)} className="btn-profile" color="red">
                  Supprimer votre annonce
                </Button>

              </Card.Content>

            </Card>
          ))}

        </CardGroup>
      )}
      {!openAnnounceModal && announceValue === 'Demandes reçues' && (
      <CardGroup className="card-annonce-group">

        {requestsReceived.map((request) => {
          if (request.requestRequestStatus === 'waiting') {
            return (
              <Card key={request.requestId} href="" target="_blank">
                <img
                  className="img"
                  src={request.userRequestPicture}
                  size="medium"
                  alt="team logo"
                />
                <Card.Content className="card-annonce-content">
                  <Card.Description>
                    <Button className="button-profile" onClick={() => handleClick(request.requestUserId)} color="green">
                      <Icon name="checkmark" />
                      {' '}
                      Voir le profil de l&#39;équipe
                    </Button>
                  </Card.Description>
                  <Card.Header className="date">
                    {formatDate(request.announcementDate)}
                  </Card.Header>
                  <Card.Description>
                    <span>
                      <span className="desc-name">EQUIPE :</span>
                      {' '}
                      {request.userRequestTeamName}
                    </span>
                  </Card.Description>
                  <Card.Description>
                    <span>
                      <span className="desc-name">LIEU :</span>
                      {' '}
                      {request.announcementPlace}
                    </span>
                  </Card.Description>
                  <Card.Description>
                    <p>
                      <span className="desc-name">TERRAIN :</span>
                      {' '}
                      {request.announcementField}
                    </p>
                  </Card.Description>
                  <Card.Description>
                    <p>
                      <span className="desc-name">STATUT REQUETE :</span>
                      {' '}
                      <span className="desc-doug">En attente de validation</span>
                    </p>
                  </Card.Description>
                  <Card.Description>
                    <ValidateAnnounceModal
                      date={request.announcementDate}
                      team={request.userRequestTeamName}
                      place={request.announcementPlace}
                      field={request.announcementField}
                      id={request.requestId}
                    />
                    <RejectAnnounceModal
                      date={request.announcementDate}
                      team={request.userRequestTeamName}
                      place={request.announcementPlace}
                      field={request.announcementField}
                      id={request.requestId}
                    />
                  </Card.Description>
                </Card.Content>
              </Card>
            );
          }
        })}

      </CardGroup>
      )}
      {!openAnnounceModal && announceValue === 'Demandes envoyées (en attente)' && (
      <CardGroup className="card-annonce-group">

        {requestsSended.map((sendrequest) => {
          if (sendrequest.requestRequestStatus === 'waiting') {
            return (
              <Card className="card-annonce-sended" key={sendrequest.announcementId} href="" target="_blank">
                <img
                  className="card-img-sended"
                  src={sendrequest.announcementUserPicture}
                  size="medium"
                  alt="team logo"
                />

                <Card.Content className="card-annonce-content">
                  <Button className="button-profile" onClick={() => handleClick(sendrequest.announcementUserId)} color="green">
                    <Icon name="checkmark" />
                    {' '}
                    Voir le profil de l&#39;équipe
                  </Button>
                  <Card.Header>{formatDate(sendrequest.announcementDate)}</Card.Header>
                  <Card.Description>
                    <span>
                      <span className="desc-name">EQUIPE :</span>
                      {' '}
                      {sendrequest.announcementUserTeamName}
                    </span>
                  </Card.Description>

                  <Card.Description>
                    <span>
                      <span className="desc-name">CATEGORIE :</span>
                      {' '}
                      {sendrequest.announcementLevel}
                    </span>
                  </Card.Description>
                  <Card.Description>
                    <p>
                      <span className="desc-name">TERRAIN :</span>
                      {' '}
                      {(sendrequest.announcementField)}
                    </p>
                  </Card.Description>
                  <Card.Description>
                    <p>
                      <span className="desc-name">STATUT REQUETE :</span>
                      {' '}
                      <span className="desc-doug">En attente de validation par l&#39;équipe adverse</span>
                    </p>
                  </Card.Description>

                </Card.Content>

              </Card>

            );
          }
        })}

      </CardGroup>
      )}
      {!openAnnounceModal && announceValue === 'Demandes validées (matchs à venir)' && (
      <CardGroup className="card-annonce-group">

        {requestsReceived.map((request) => {
          if (request.requestRequestStatus === 'accepted') {
            return (
              <Card className="card-annonce" key={request.requestId} href="" target="_blank">
                <img
                  className="img"
                  src={request.userRequestPicture}
                  size="medium"
                  alt="team logo"
                />
                <Card.Content className="card-annonce-content">
                  <Card.Description>
                    <Button onClick={() => handleClick(request.requestUserId)} color="green">
                      <Icon name="checkmark" />
                      {' '}
                      Voir le profil de l&#39;équipe
                    </Button>

                  </Card.Description>
                  <Card.Header className="date">{formatDate(request.announcementDate)}</Card.Header>
                  <Card.Description>
                    <span>
                      <span className="desc-name">EQUIPE :</span>
                      {' '}
                      {request.userRequestTeamName}
                    </span>
                  </Card.Description>
                  <Card.Description>
                    <span>
                      <span className="desc-name">LIEU :</span>
                      {' '}
                      {request.announcementPlace}
                    </span>
                  </Card.Description>
                  <Card.Description>
                    <p>
                      <span className="desc-name">TERRAIN :</span>
                      {' '}
                      {request.announcementField}
                    </p>
                  </Card.Description>
                  <Card.Description>
                    <p>
                      <span className="desc-name">STATUT REQUETE :</span>
                      {' '}
                      <span className="desc-dougger">Validée</span>

                    </p>
                  </Card.Description>
                  <Card.Description />

                </Card.Content>

              </Card>
            );
          }
        })}
        {requestsSended.map((request) => {
          if (request.requestRequestStatus === 'accepted') {
            return (
              <Card className="card-annonce" key={request.announcementId} href="" target="_blank">
                <img
                  className="img"
                  src={request.announcementUserPicture}
                  size="medium"
                  alt="team logo"
                />
                <Card.Content className="card-annonce-content">
                  <Card.Description>
                    <Button onClick={() => handleClick(request.announcementUserId)} color="green">
                      <Icon name="checkmark" />
                      {' '}
                      Voir le profil de l&#39;équipe
                    </Button>

                  </Card.Description>
                  <Card.Header className="date">{formatDate(request.announcementDate)}</Card.Header>
                  <Card.Description>
                    <span>
                      <span className="desc-name">EQUIPE :</span>
                      {' '}
                      {request.announcementUserTeamName}
                    </span>
                  </Card.Description>
                  <Card.Description>
                    <span>
                      <span className="desc-name">LIEU :</span>
                      {' '}
                      {request.announcementPlace}
                    </span>
                  </Card.Description>
                  <Card.Description>
                    <p>
                      <span className="desc-name">TERRAIN :</span>
                      {' '}
                      {request.announcementField}
                    </p>
                  </Card.Description>
                  <Card.Description>
                    <p>
                      <span className="desc-name">STATUT REQUETE :</span>
                      {' '}
                      <span className="desc-dougger">Validée</span>

                    </p>
                  </Card.Description>
                  <Card.Description />

                </Card.Content>

              </Card>
            );
          }
        })}

      </CardGroup>
      )}
      {openAnnounceModal && (
        <AnnounceModal closeAnnounceModal={setOpenAnnounceModal} />
      )}

      <Confirm
        open={modalDeleteAnnounce}
        content="Veux tu vraiment supprimer cette annonce ?"
        onCancel={() => setModalDeleteAnnounce(false)}
        onConfirm={handleDeleteAnnounce}
      />
    </div>
  );
};

export default Announces;
