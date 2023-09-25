import React, { createContext, useContext, useState } from 'react';

const ProjectContext = createContext();

const useProjectContext = () => useContext(ProjectContext);

const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);

  const updateProjects = (updatedProjects) => {
    setProjects(updatedProjects);
  };

  return (
    <ProjectContext.Provider value={{ projects, updateProjects }}>
      {children}
    </ProjectContext.Provider>
  );
};

export { useProjectContext, ProjectProvider };