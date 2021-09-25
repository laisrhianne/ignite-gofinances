import React, { useState } from 'react';
import { Modal } from 'react-native';
import { useForm } from 'react-hook-form'

import { InputForm } from '../../components/Forms/InputForm';
import { Button } from '../../components/Forms/Button';

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from './styles';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { CategorySelect } from '../CategorySelect';
import { categories } from '../../utils/categories';

interface FormData {
  name: string;
  amount: string;
}

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  })

  const {
    control,
    handleSubmit,
  } = useForm();

  function handleTransactionTypeSelect(type: 'up' | 'down') {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  } 

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  } 

  function handleRegister(form: FormData) {
    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    }

    console.log(data);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <InputForm 
            name="name"
            control={control}
            placeholder='Nome' 
          />
          <InputForm
            name="amount"
            control={control}
            placeholder='Preço'
          />

          <TransactionsTypes>
            <TransactionTypeButton
              title='Income'
              type='up'
              onPress={() => handleTransactionTypeSelect('up')}
              isActive={transactionType === 'up'}
            />
            <TransactionTypeButton
              title='Outcome'
              type='down'
              onPress={() => handleTransactionTypeSelect('down')}
              isActive={transactionType === 'down'}
            />
          </TransactionsTypes>

          <CategorySelectButton title={category.name} onPress={handleOpenSelectCategoryModal} />
        </Fields>
        <Button title='Enviar' onPress={handleSubmit(handleRegister)} />
      </Form>

    <Modal visible={categoryModalOpen}>
      <CategorySelect
        category={category}
        setCategory={setCategory}
        closeSelectCategory={handleCloseSelectCategoryModal}
      />
    </Modal>
    </Container>
  );
}
