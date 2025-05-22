import React, { useState } from 'react';
import cl from '../styles/Admin.module.css';
import CreateBrand from '../components/modals/CreateBrandModal/CreateBrandModal';
import CreateType from '../components/modals/CreateTypeModal/CreateTypeModal';
import CreateSneaker from '../components/modals/CreateSneakerModal/CreateSneakerModal';
const Admin: React.FC = () => {
  const [brandVisible, setBrandVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);
  const [sneakerVisible, setSneakerVisible] = useState(false);

  return (
    <div className={cl.adminContainer}>
      <button className={cl.adminButton} onClick={() => setTypeVisible(true)}>
        Add Type
      </button>

      <button className={cl.adminButton} onClick={() => setBrandVisible(true)}>
        Add Brand
      </button>

      <button
        className={cl.adminButton}
        onClick={() => setSneakerVisible(true)}
      >
        Add Sneaker
      </button>

      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />

      <CreateSneaker
        show={sneakerVisible}
        onHide={() => setSneakerVisible(false)}
      />

      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
    </div>
  );
};

export default Admin;
