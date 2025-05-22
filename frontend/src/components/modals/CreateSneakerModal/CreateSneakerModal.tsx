// src/components/modals/CreateSneakerModal.tsx
import React, { useEffect, useState } from 'react';
import cl from './CreateSneakerModal.module.css';
import { useCreateSneakerMutation } from '../../../api/sneakerApi';
import { useGetBrandsQuery } from '../../../api/brandApi';
import { useGetTypesQuery } from '../../../api/typeApi';

interface CreateSneakerProps {
  show: boolean;
  onHide: () => void;
}

const CreateSneaker: React.FC<CreateSneakerProps> = ({ show, onHide }) => {
  // RTK Query hooks
  const { data: typesResponse } = useGetTypesQuery();
  const { data: brandsResponse } = useGetBrandsQuery();
  const [createSneaker, { isLoading, error }] = useCreateSneakerMutation();

  const types = typesResponse?.data || [];
  const brands = brandsResponse?.data || [];

  const [selectedTypeId, setSelectedTypeId] = useState<string>('');
  const [selectedBrandId, setSelectedBrandId] = useState<string>('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [file, setFile] = useState<File | null>(null);
  const [info, setInfo] = useState<
    { title: string; description: string; id: number }[]
  >([]);

  const addInfo = () => {
    setInfo((prev) => [
      ...prev,
      { title: '', description: '', id: Date.now() },
    ]);
  };

  const removeInfo = (id: number) => {
    setInfo((prev) => prev.filter((item) => item.id !== id));
  };

  const changeInfo = (
    id: number,
    key: 'title' | 'description',
    val: string,
  ) => {
    setInfo((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [key]: val } : item)),
    );
  };

  const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  const addSneakerHandler = async () => {
    if (!name || !price || !file || !selectedTypeId || !selectedBrandId) {
      console.log('Fill in all required fields');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price.toString());
    formData.append('file', file);
    formData.append('type_id', selectedTypeId);
    formData.append('brand_id', selectedBrandId);
    formData.append('info', JSON.stringify(info));

    try {
      await createSneaker(formData).unwrap();
      onHide();
    } catch (e: any) {
      console.error('Error creating sneaker', e.data?.message || e.message);
    }
  };

  useEffect(() => {
    console.log(selectedBrandId, 'brand');
    console.log(selectedTypeId, 'type');
  }, [selectedBrandId, selectedTypeId]);

  if (!show) return null;

  return (
    <div className={cl.modalOverlay} onClick={onHide}>
      <div className={cl.modalContainer} onClick={(e) => e.stopPropagation()}>
        <div className={cl.modalHeader}>
          <h3>Add Sneaker</h3>
          <button className={cl.modalCloseBtn} onClick={onHide}>
            &times;
          </button>
        </div>

        <div className={cl.modalBody}>
          <div className={cl.formGroup}>
            <label>Type</label>
            <select
              className={cl.modalSelect}
              value={selectedTypeId}
              onChange={(e) => setSelectedTypeId(e.target.value)}
              disabled={isLoading}
            >
              <option value="" disabled>
                Choose type
              </option>
              {types.map((t) => (
                <option key={t.id} value={t.id.toString()}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          <div className={cl.formGroup}>
            <label>Brand</label>
            <select
              className={cl.modalSelect}
              value={selectedBrandId}
              onChange={(e) => setSelectedBrandId(e.target.value)}
              disabled={isLoading}
            >
              <option value="" disabled>
                Choose brand
              </option>
              {brands.map((b) => (
                <option key={b.id} value={b.id.toString()}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          <div className={cl.formGroup}>
            <label>Name</label>
            <input
              type="text"
              className={cl.modalInput}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter sneaker name"
              disabled={isLoading}
            />
          </div>

          <div className={cl.formGroup}>
            <label>Price</label>
            <input
              type="number"
              className={cl.modalInput}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              placeholder="Enter sneaker price"
              disabled={isLoading}
            />
          </div>

          <div className={cl.formGroup}>
            <label>Image</label>
            <input
              type="file"
              className={cl.modalInput}
              onChange={selectFile}
              disabled={isLoading}
            />
          </div>

          <hr />

          <button
            className={`${cl.btn} ${cl.btnOutlineDark}`}
            onClick={addInfo}
            disabled={isLoading}
          >
            Add Property
          </button>

          {info.map((item) => (
            <div className={cl.infoRow} key={item.id}>
              <input
                className={`${cl.modalInput} ${cl.infoInput}`}
                value={item.title}
                onChange={(e) => changeInfo(item.id, 'title', e.target.value)}
                placeholder="Property name"
                disabled={isLoading}
              />
              <input
                className={`${cl.modalInput} ${cl.infoInput}`}
                value={item.description}
                onChange={(e) =>
                  changeInfo(item.id, 'description', e.target.value)
                }
                placeholder="Property description"
                disabled={isLoading}
              />
              <button
                className={`${cl.btn} ${cl.btnOutlineDanger} ${cl.infoDelete}`}
                onClick={() => removeInfo(item.id)}
                disabled={isLoading}
              >
                Delete
              </button>
            </div>
          ))}

          {error && (
            <div className={cl.errorText}>
              {(error as any).data?.message || 'Failed to create sneaker'}
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
            onClick={addSneakerHandler}
            disabled={isLoading}
          >
            {isLoading ? 'Adding...' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSneaker;
