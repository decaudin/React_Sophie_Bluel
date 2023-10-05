import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import "./ModalAdd.scss";

const ModalAdd = ({ isOpen, toggleModal, toggleModalAdd, addProject }) => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [isValidationError, setIsValidationError] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(image !== null && title.trim() !== '' && category !== '');
  }, [image, title, category]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
      
    if (file) {
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setImage(reader.result);
      }; 
      
      reader.readAsDataURL(file);
    } else {
      setImage(null);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (image && title && category) {
      setIsValidationError(false);
    } else {
      setIsValidationError(true);
      return;
    }

    if (!isValidationError) {
      const formData = new FormData();
      formData.append('imageUrl', image);
      formData.append('title', title);
      formData.append('categoryId', category);

      try {
        const response = await fetch('http://localhost:5678/api/works', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
            'Content-Type': `multipart/form-data`,
          },
          body: formData,
        });
  
        if (response.ok) {
          console.log('Données soumises avec succès !');
          
          addProject({
            image: URL.createObjectURL(image),
            title,
            category,
          });
  
          setImage(null);
          setTitle('');
          setCategory('');
          toggleModalAdd();
          toggleModal();
        } else {
          console.error('Erreur lors de la soumission du formulaire :', response.status);
        }
      } catch (error) {
        console.error('Erreur lors de la soumission du formulaire :', error);
      }
    }
  };
  
  return (
    <Modal isOpen={isOpen} onRequestClose={toggleModalAdd} contentLabel='Modale Ajout Projet' className="modalAdd" overlayClassName="modalAddOverlay">
      <div className="fontIcon">
        <FontAwesomeIcon icon={faArrowLeft} className="goBack" onClick={() => { toggleModal(); toggleModalAdd(); }} />
        <span className="closeButton" onClick={toggleModalAdd}>
          &times;
        </span>
      </div>
      <h2>Ajout photo</h2>
      <form onSubmit={handleSubmit}>
      <div className="projectUpload">
        {image ? (
          <img src={image} alt="Nouveau projet de Sophie Bluel" className="uploadedImage" />
        ) : (
          <>
            <FontAwesomeIcon icon={faImage} className="mountains" />
            <label htmlFor="imageUpload" className="imageAdd">+ Ajouter photo</label>
            <input type="file" accept="image/*" id="imageUpload" onChange={handleImageUpload} />
            <p className="imageType">jpg, png : 4mo max</p>
          </>
        )}
      </div>
      <div className="titleProject">
        <label htmlFor="title" className="labelTitle">Titre</label>
        <input type="text" id="title" value={title} onChange={handleTitleChange} />
      </div>
      <div className="categoryProject">
        <label htmlFor="category" className="categoryName">Catégorie</label>
        <select id="category" value={category} onChange={handleCategoryChange}>
          <option value=""></option>
          <option value="1">Objets</option>
          <option value="2">Appartements</option>
          <option value="3">Hôtels & restaurants</option>
        </select>
      </div>
      {isValidationError && <div className='errorText'>Champs vide ou invalide</div>}
      <div className='borderModal'></div>
      <input type="submit" className={`submitButton ${isFormValid ? 'validButton' : ''}`} value="Valider" />
      </form>
    </Modal>
  );
};

export default ModalAdd;




