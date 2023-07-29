import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function CustomInput({ setUsers }) {
  const { register, handleSubmit, setValue } = useForm();
  const [checked, setChecked] = useState('desc');

  const submit = async (data) => {
    const res = await axios.get(
      `https://api.github.com/search/users?q=${data.search}&per_page=20&sort=repositories&order=${checked}`,
    );
    setUsers(res.data.items);
    setValue('search', '');
  };
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}
    >
      <form onSubmit={handleSubmit(submit)}>
        <label className="form-label">
          Сортировать по возрастанию
          <input
            style={{ marginLeft: '7px' }}
            className="form-check-input"
            type="checkbox"
            name="sortAsc"
            onChange={() => {
              checked === 'desc' ? setChecked('asc') : setChecked('desc');
            }}
          />
          <input
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Введите имя"
            type="text"
            {...register('search', { required: true })}
            style={{ width: '400px' }}
          ></input>
        </label>

        <button style={{ margin: '5px', height: '55px' }} type="submit" className="btn btn-primary">
          Найти
        </button>
      </form>
    </div>
  );
}
