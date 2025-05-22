// src/components/modals/CreateTypeModal.tsx
import React, { useState } from 'react';
import cl from './CreateTypeModal.module.css';
import { useCreateTypeMutation } from '../../../api/typeApi';

interface CreateTypeProps {
  show: boolean;
  onHide: () => void;
}

const CreateType: React.FC<CreateTypeProps> = ({ show, onHide }) => {
  const [value, setValue] = useState('');
  // хук для мутации создания типа
  const [createType, { isLoading, error }] = useCreateTypeMutation();

  const addType = async () => {
    try {
      // вызываем мутацию, передаём { name: value }
      await createType({ name: value }).unwrap();
      setValue('');
      onHide();
    } catch (e: any) {
      console.error('Error adding type:', e.data?.message || e.message);
    }
  };

  if (!show) return null;

  return (
    <div className={cl.modalOverlay} onClick={onHide}>
      <div className={cl.modalContainer} onClick={(e) => e.stopPropagation()}>
        <div className={cl.modalHeader}>
          <h3>Add Type</h3>
          <button className={cl.modalCloseBtn} onClick={onHide}>
            &times;
          </button>
        </div>

        <div className={cl.modalBody}>
          <input
            className={cl.modalInput}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter type name"
            disabled={isLoading}
          />
          {error && (
            <div className={cl.errorText}>
              {(error as any).data?.message || 'Failed to create type'}
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
            onClick={addType}
            disabled={isLoading || !value.trim()}
          >
            {isLoading ? 'Adding...' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateType;
