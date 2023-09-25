import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faArrowsUpDownLeftRight } from '@fortawesome/free-solid-svg-icons';
import "./ModalGallery.scss";

const ModalGallery = ({ isOpen, toggleModal, toggleModalAdd, data }) => {
  const [images, setImages] = useState(data);

  useEffect(() => {
    setImages(data);
  }, [data]);

  const deleteImage = async (index) => {
    try {
      const imageIdToDelete = images[index].id;
      const response = await fetch(`http://localhost:5678/api/works/${imageIdToDelete}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        // Si la suppression côté serveur est réussie, mettez à jour l'état local pour refléter la suppression
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
      } else {
        console.error('Erreur lors de la suppression de l\'image côté serveur');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'image côté serveur :', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={toggleModal} contentLabel='Modale Gallerie Projets' className="modalGallery" overlayClassName="modalGalleryOverlay">
      <span className="closeButton" onClick={toggleModal}>
        &times;
      </span>
      <h2>Galerie photo</h2>
      <div className='projectsImageModal'>
        {images.map((item, index) => (
          <div key={item.id} className="projectItemModal">
            {index === 0 && (
              <FontAwesomeIcon icon={faArrowsUpDownLeftRight} className="enlarge" />
            )}
            <FontAwesomeIcon
              icon={faTrashCan}
              className="deleteProject"
              onClick={() => deleteImage(index)}
            />
            <img src={item.imageUrl} alt={item.title} />
            <h3 className="edit">éditer</h3>
          </div>
        ))}
      </div>
      <div className='borderModal'></div>
      <button className='goToModalAdd' onClick={() => { toggleModal(); toggleModalAdd(); }}>Ajouter une photo</button>
      <p className='deleteGallery'>Supprimer la galerie</p>
    </Modal>
  );
};

export default ModalGallery;
















