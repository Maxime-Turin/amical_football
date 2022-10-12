import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import images from '../../constants/images';

import './Home.scss';

const Home = () => {
  const isLogged = useSelector((state) => state.user.logged);
  const teamName = useSelector((state) => state.user.teamName);

  return (
    <div className="app__accueil">
      <div className="app__accueil-mainInfos">
        <h1 className="title">Amical Football</h1>
        <h2 className="text">Vous cherchez des adversaires pour un match amical?</h2>
        <h2 className="text">Trouvez et organisez un match en quelques clics</h2>

        {
          !isLogged && (
          <>
            <Link to="/inscription">
              <Button
                className="button"
                color="green"
              >
                <Icon name="sign-in" />
                {' '}
                Inscription
              </Button>

            </Link>
            <h2 className="connexion-text">J&#39;ai déjà un compte!</h2>
            <Link to="/login">
              <Button
                className="button"
                color="teal"
              >
                <Icon name="user" />
                {' '}
                Connexion
              </Button>

            </Link>
          </>

          )
        }
        {
          isLogged && (
            <h1 className="loggedText">
              SALUT A TOI
              {' '}
              {teamName}
            </h1>
          )
        }

      </div>
      <div className="app__accueil-desc">
        <div className="app__accueil-desc-infos">
          <div>
            <img className="img" src={images.home1} alt="" />
          </div>
          <div className="infos">
            <h1>
              <span className="infos-span">Crée un compte</span>
              {' '}
              Amical Football
            </h1>
            <p>Crée un compte pour ton équipe, note les informations sur ton équipe</p>
          </div>
        </div>

        <div className="app__accueil-desc-infos">
          <div className="infos">
            <h1>
              <span className="infos-span">Ajoute</span>
              {' '}
              une date
            </h1>
            <p>Publie une annonce afin de la rendre visible de tous</p>
          </div>
          <div>
            <img className="img" src={images.home2} alt="" />
          </div>
        </div>

        <div className="app__accueil-desc-infos">
          <div>
            <img className="img" src={images.home3} alt="" />
          </div>
          <div className="infos">
            <h1>

              {' '}
              <span className="infos-span">

                Trouve un match

              </span>
              {' '}
              dans ton département
            </h1>
            <p>Fais une recherche selon tes critères (lieux, niveaux, type de terrain)</p>
            <p>Tu pourras prendre contact avec l&#39;équipe</p>
          </div>
        </div>

        <div className="app__accueil-desc-infos">
          <div className="infos">
            <h1>
              <span className="infos-span">Du fun</span>
              , et du football
            </h1>
            <p>Profite de ton match de football, et crée toi de supers souvenirs</p>
          </div>
          <div>
            <img className="img" src={images.home4} alt="" />
          </div>
        </div>

      </div>

    </div>
  );
};

export default Home;
