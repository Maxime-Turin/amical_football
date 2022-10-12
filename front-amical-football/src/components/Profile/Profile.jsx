import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Profile.scss';
import { useSelector, useDispatch } from 'react-redux';
import { CgProfile } from 'react-icons/cg';
import { FiBarChart } from 'react-icons/fi';
import { TbSoccerField } from 'react-icons/tb';
import { FaCity } from 'react-icons/fa';
import { GiPositionMarker } from 'react-icons/gi';
import { AiOutlineMail } from 'react-icons/ai';
import { BsTelephone, BsChatSquareText } from 'react-icons/bs';

import {
  Button, Confirm, Loader, Modal,
} from 'semantic-ui-react';
import Category from './Category/Category';
import EditProfile from './EditProfile/EditProfile';
import {
  changeUserField, deleteAccount, getUserInfo, sendNewInfos,
} from '../../actions/user';
import { uploadPicture } from '../../actions/data';
import category from '../../data/category';
import fieldOptions from '../../data/field';

const uploadPreset = 'zuwrioya';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [edit, setEdit] = useState(false);
  const [profilePic, setProfilePic] = useState('');

  const teamName = useSelector((state) => state.user.teamName);
  const level = useSelector((state) => state.user.level);
  const field = useSelector((state) => state.user.field);
  const city = useSelector((state) => state.user.city);
  const postalCode = useSelector((state) => state.user.postalCode);
  const mail = useSelector((state) => state.user.mail);
  const phone = useSelector((state) => state.user.phone);
  const description = useSelector((state) => state.user.description);
  const picture = useSelector((state) => state.user.picture);

  const categoryLeft = [
    {
      id: 1,
      icon: <CgProfile />,
      text: teamName,
      name: 'teamName',

    },
    {
      id: 2,
      icon: <FiBarChart />,
      text: level,
      name: 'level',
      isSelect: true,
      selectOption: category,
    },
    {
      id: 3,
      icon: <TbSoccerField />,
      text: field,
      name: 'field',
      isSelect: true,
      selectOption: fieldOptions,

    },
    {
      id: 4,
      icon: <FaCity />,
      text: city,
      name: 'city',

    },
  ];

  const categoryRight = [
    {
      id: 5,
      icon: <GiPositionMarker />,
      text: postalCode,
      name: 'postalCode',

    },
    {
      id: 6,
      icon: <AiOutlineMail />,
      text: mail,
      name: 'mail',

    },
    {
      id: 7,
      icon: <BsTelephone />,
      text: phone,
      name: 'phone',

    },
  ];

  const handleClickModify = (e) => {
    e.preventDefault();
    setEdit(true);
  };

  const handleClickData = (e) => {
    e.preventDefault();
    dispatch(sendNewInfos());
    setEdit(false);
  };

  const [modalDelete, setModalDelete] = useState(false);

  const switchModal = () => {
    setModalDelete(true);
  };

  const [deletedAccount, setDeletedAccount] = useState(false);

  const handleDeleteAccount = () => {
    setModalDelete(false);
    setDeletedAccount(true);
  };

  useEffect(() => {
    dispatch(getUserInfo());
    if (deletedAccount) {
      setTimeout(() => {
        dispatch(deleteAccount());
        navigate('/');
      }, 2000);
    }
  }, [deletedAccount]);

  const changeField = (value, name) => {
    dispatch(changeUserField(value, name));
  };

  const [loaderImg, setLoaderImg] = useState(false);

  const uploadImage = async (e) => {
    setLoaderImg(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', profilePic);
    formData.append('upload_preset', uploadPreset);
    dispatch(uploadPicture(formData));
    setTimeout(() => { setLoaderImg(false); }, 2000);
  };

  return (
    <div className="app__profil">
      <div className="app__profil-imgdesc">
        <div>
          {
          !edit && (
            <img src={picture} alt="logo" />

          )
        }
          {
          edit && (
            <div className="imgInfos">
              <img src={picture} alt="logo" />

              <input type="file" id="file" onChange={(e) => setProfilePic(e.target.files[0])} />
              <button type="submit" onClick={(e) => uploadImage(e)}>Importer mon Logo</button>
              {
                loaderImg && <Loader active>Chargement de l&#39;image</Loader>
              }
            </div>
          )
        }
        </div>
        <div>
          {
          !edit && (
            <Category icon={<BsChatSquareText />} text={description} />

          )
        }
          {
          edit && (
            <EditProfile icon={<BsChatSquareText />} text={description} onChange={changeField} name="description" value={description} />
          )
        }
        </div>

      </div>
      <div className="app__profil-allInfos">
        <Button as={Link} to="/annonces" className="btn-profile" basic color="green">
          Voir mes annonces
        </Button>
        <div className="infosDesktop">
          <div className="infoLeft">
            {
              !edit && (

                categoryLeft.map((item) => (
                  <Category key={item.id} icon={item.icon} text={item.text} />

                ))
              )

            }
            {
              edit && (
                categoryLeft.map((item) => (
                  <EditProfile
                    key={item.id}
                    icon={item.icon}
                    text={item.text}
                    onChange={changeField}
                    name={item.name}
                    value={item.text}
                    isSelect={item.isSelect}
                    selectOption={item.selectOption}
                  />
                ))
              )
            }
          </div>
          <div className="infoRight">
            {
              !edit && (
                categoryRight.map((item) => (
                  <Category key={item.id} icon={item.icon} text={item.text} />

                ))

              )
            }
            {
              edit && (
                categoryRight.map((item) => (
                  <EditProfile
                    key={item.id}
                    icon={item.icon}
                    text={item.text}
                    onChange={changeField}
                    name={item.name}
                    value={item.text}
                  />
                ))

              )
            }
          </div>
        </div>
        <Button onClick={handleClickModify} className="btn-profile" basic color="orange">
          Modifier vos informations
        </Button>
        <Button onClick={switchModal} className="btn-profile" color="red">
          Supprimer votre compte
        </Button>
        <Confirm
          open={modalDelete}
          content="Veux tu vraiment supprimer ton compte ?"
          onCancel={() => setModalDelete(false)}
          onConfirm={handleDeleteAccount}
        />

        <Modal
          basic
          open={deletedAccount}
        >
          <Modal.Content>
            <p>
              Votre compte a bien été supprimé, vous allez être redirigé
            </p>
            <Loader active />
          </Modal.Content>
        </Modal>

        {
          edit && (
            <Button onClick={handleClickData} className="btn-profile" basic color="green">
              Valider
            </Button>
          )
        }
      </div>
    </div>
  );
};

export default Profile;
