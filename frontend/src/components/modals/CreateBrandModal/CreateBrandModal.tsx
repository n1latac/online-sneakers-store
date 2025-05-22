import React, { useState } from 'react';
import cl from './CreateBrandModal.module.css';
import { useCreateBrandMutation } from '../../../api/brandApi';

interface CreateBrandProps {
  show: boolean;
  onHide: () => void;
}

const CreateBrand: React.FC<CreateBrandProps> = ({ show, onHide }) => {
  const [value, setValue] = useState('');
  const [createBrand, { isLoading, error }] = useCreateBrandMutation();

  const addBrand = async () => {
    try {
      await createBrand({ name: value }).unwrap();
      setValue('');
      onHide();
    } catch (e: any) {
      console.error('Error adding brand:', e.data?.message || e.message);
    }
  };

  if (!show) return null;

  return (
    <div className={cl.modalOverlay} onClick={onHide}>
      <div className={cl.modalContainer} onClick={(e) => e.stopPropagation()}>
        <div className={cl.modalHeader}>
          <h3>Add Brand</h3>
          <button className={cl.modalCloseBtn} onClick={onHide}>
            &times;
          </button>
        </div>

        <div className={cl.modalBody}>
          <input
            className={cl.modalInput}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter brand name"
            disabled={isLoading}
          />
          {error && (
            <div className={cl.errorText}>
              {(error as any).data?.message || 'Failed to create brand'}
            </div>
          )}
        </div>

        <div className={cl.modalFooter}>
          <button
            className={`${cl.btn} ${cl.btnOutlineDanger}`}
            onClick={onHide}
            disabled={isLoading}
          >
            Close
          </button>
          <button
            className={`${cl.btn} ${cl.btnOutlineSuccess}`}
            onClick={addBrand}
            disabled={isLoading || !value.trim()}
          >
            {isLoading ? 'Adding...' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBrand;
