import React from 'react';
import './CreateModal.css'; // Import your CSS file for styling
import CustomSearch from '../ModalBody/CustomSearch';
import SelectedBreed from '../ModalBody/SelectedBreed';

const CreateModal = ({title,data, setOpenModal }) => {
  // if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className='modal-title'>
          <h2>{title}</h2>
          <button onClick={()=>setOpenModal(false)}>X</button>
        </div>
        <div className='modal-body'>
          {title ==="Custom Search"?<CustomSearch data={data} />:<SelectedBreed name={title}/>}
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
