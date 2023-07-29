/** @jest-environment jsdom */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomInput from '../src/Components/CustomInput';
import Pagination from '../src/Components/Pagination';
import axios from 'axios';

// Имитация ответа от сервера
jest.mock('axios');
const mockResponse = {
  data: {
    items: [{ login: 'user1' }, { login: 'user2' }, { login: 'user3' }],
  },
};
axios.get.mockResolvedValue(mockResponse);

test('Отображает инпут, кнопку и чекбокс', () => {
  render(<CustomInput setUsers={jest.fn()} />);

  // Проверяем наличие input и button на странице
  const inputElement = screen.getByPlaceholderText('Введите имя');
  const buttonElement = screen.getByRole('button', { name: 'Найти' });
  const checkboxElement = screen.getByRole('checkbox', { class: 'form-check-input' });

  expect(inputElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
  expect(checkboxElement).toBeInTheDocument();
});

test('Данные с формы отправляются', async () => {
  // Функция setUsers для проверки вызовов
  const setUsersMock = jest.fn();

  render(<CustomInput setUsers={setUsersMock} />);

  // Ввод данных
  const inputElement = screen.getByPlaceholderText('Введите имя');
  fireEvent.change(inputElement, { target: { value: 'testUser' } });

  // Имитируем клик на checkbox
  const checkboxElement = screen.getByRole('checkbox', { class: 'form-check-input' });
  fireEvent.click(checkboxElement);

  // Отправка формы
  const buttonElement = screen.getByRole('button', { name: 'Найти' });
  fireEvent.click(buttonElement);

  // Ждем, пока вызов axios.get будет выполнен и обработан
  await waitFor(() => {
    expect(setUsersMock).toHaveBeenCalledTimes(1);
    expect(setUsersMock).toHaveBeenCalledWith(mockResponse.data.items);
  });

  // Очистка поля формы
  expect(inputElement.value).toBe('');
});

test('Отображает пагинацию когда есть юзеры', () => {
  const users = ['user1', 'user2', 'user3'];

  const setPageMock = jest.fn();

  // Рендерим компонент с заданными параметрами
  const { getByText } = render(<Pagination users={users} setPage={setPageMock} itemsPerPage={1} />);

  // Проверяем что кнопки  присутствуют
  const prevButton = getByText('Назад');
  const nextButton = getByText('Вперед');

  expect(prevButton).toBeInTheDocument();
  expect(nextButton).toBeInTheDocument();
});

test('Не отображает паганиацию', () => {
  const users = [];

  const setPageMock = jest.fn();

  // Рендерим компонент
  const { queryByText } = render(
    <Pagination users={users} setPage={setPageMock} itemsPerPage={1} />,
  );

  const prevButton = queryByText('Назад');
  const nextButton = queryByText('Вперед');

  // Проверяем что кнопки  отсутствуют
  expect(prevButton).toBeNull();
  expect(nextButton).toBeNull();
});
