import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import ModalGallery from '../ModalGallery/ModalGallery';
import ModalAdd from '../ModalAdd/ModalAdd';
import Modal from 'react-modal';
import "./Projects.scss";
import { useProjectContext } from '../ProjectContext';

Modal.setAppElement('#root');

const Projects = () => {
    const { projects, updateProjects } = useProjectContext(); // Utilisez le contexte pour accéder aux projets
    const [filter, setFilter] = useState("Tous");
    const [modalGalleryOpen, setModalGalleryOpen] = useState(false);
    const [modalAddOpen, setModalAddOpen] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            const apiUrl = 'http://localhost:5678/api/works';
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`La requête a échoué avec le statut ${response.status}`);
            }

            const responseData = await response.json();
            updateProjects(responseData); // Mettez à jour les projets dans le contexte
        } catch (error) {
            console.error('Erreur lors de la requête fetch : ', error);
        }
    }, [updateProjects]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const toggleModalGallery = () => {
        setModalGalleryOpen(!modalGalleryOpen);
    };

    const toggleModalAdd = () => {
        setModalAddOpen(!modalAddOpen);
    };

    return (
        <div className="projects">
            <div className="projectsTitle">
                <h2>Mes projets</h2>
                <div className={`modalOpen ${sessionStorage.getItem("token") ? 'adminMode' : ''}`} onClick={toggleModalGallery}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                    <p>modifier</p>
                </div>
            </div>
            <ModalGallery isOpen={modalGalleryOpen} toggleModal={toggleModalGallery} toggleModalAdd={toggleModalAdd} data={projects} />
            <ModalAdd isOpen={modalAddOpen} toggleModalAdd={toggleModalAdd} toggleModal={toggleModalGallery} />
            <div className={`btn ${sessionStorage.getItem("token") ? 'adminMode' : ''}`}>
                <ul>
                    <li className="btnAll" onClick={() => setFilter("Tous")}>Tous</li>
                    <li className="btnObjects" onClick={() => setFilter(1)}>Objets</li>
                    <li className="btnApartment" onClick={() => setFilter(2)}>Appartements</li>
                    <li className="btnHotel" onClick={() => setFilter(3)}>Hôtels & restaurants</li>
                </ul>
            </div>
            <div className="projectsImage">
                {projects
                    .filter((item) => {
                        if (filter === "Tous") {
                            return true;
                        } else {
                            return item.category.id === filter;
                        }
                    })
                    .map((item) => (
                        <div key={item.id} className="projectItem">
                            <img src={item.imageUrl} alt={item.title} />
                            <h3 className="projectTitle">{item.title}</h3>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Projects;





