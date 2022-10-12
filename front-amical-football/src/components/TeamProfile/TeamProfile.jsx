import React from 'react';
import './TeamProfile.scss';
import { useSelector } from 'react-redux';
import { CgProfile } from 'react-icons/cg';

import { FiBarChart } from 'react-icons/fi';
import { TbSoccerField } from 'react-icons/tb';
import { FaCity } from 'react-icons/fa';
import { GiPositionMarker } from 'react-icons/gi';
import { AiOutlineMail } from 'react-icons/ai';
import { BsChatSquareText } from 'react-icons/bs';

import { Button } from 'semantic-ui-react';
import Category from '../Profile/Category/Category';

import category from '../../data/category';

const TeamProfile = () => {
  const teamName = useSelector((state) => state.teamInfo.teamName);
  const level = useSelector((state) => state.teamInfo.level);
  const field = useSelector((state) => state.teamInfo.field);
  const city = useSelector((state) => state.teamInfo.city);
  const postalCode = useSelector((state) => state.teamInfo.postalCode);
  const mail = useSelector((state) => state.teamInfo.mail);

  const description = useSelector((state) => state.teamInfo.description);
  const picture = useSelector((state) => state.teamInfo.picture);

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
      selectOption: [
        {
          value: 'Domicile',
          text: 'Domicile',
        },
        {
          value: 'Exterieur',
          text: 'Exterieur',
        },
      ],

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

  ];

  return (
    <div className="app__profil">
      <div className="app__profil-imgdesc">
        <div>

          <img src={picture} alt="logo" />

        </div>
        <div>

          <Category icon={<BsChatSquareText />} text={description} />

        </div>

      </div>
      <div className="app__profil-allInfos">
        <div className="infosDesktop">
          <div className="infoLeft">

            {

                categoryLeft.map((item) => (
                  <Category key={item.id} icon={item.icon} text={item.text} />

                ))
            }

          </div>
          <div className="infoRight">
            {

                categoryRight.map((item) => (
                  <Category key={item.id} icon={item.icon} text={item.text} />

                ))

            }
            <Button className="mail-button" color="blue">Envoyer un mail </Button>

          </div>
        </div>

      </div>
    </div>
  );
};

export default TeamProfile;
