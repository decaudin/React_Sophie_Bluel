import SophieBluel from "../../assets/sophie-bluel.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import "./Banner.scss";

const Banner = ( {isAuthenticated}) => {
    return (
        <div className="presentation">
            <div className="sophieBluelPicture">
                <img src={SophieBluel} alt="portrait de Sophie Bluel" />
                <div className={`fictivModify ${isAuthenticated ? 'adminMode' : ''}`}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                    <p>modifier</p>
                </div>
            </div>
            <div className={`description ${isAuthenticated ? 'adminMode' : ''}`}>
                <h2>Designer d'espace</h2>
			    <p>Je raconte votre histoire, je valorise vos idées. Je vous accompagne de la conception à la livraison finale du chantier.</p>
			    <p>Chaque projet sera étudié en commun, de façon à mettre en valeur les volumes, les matières et les couleurs dans le respect de l’esprit des lieux et le choix adapté des matériaux. Le suivi du chantier sera assuré dans le souci du détail, le respect du planning et du budget.</p>
			    <p>En cas de besoin, une équipe pluridisciplinaire peut-être constituée : architecte DPLG, décorateur(trice)</p>
            </div>
        </div>
    )
}

export default Banner;