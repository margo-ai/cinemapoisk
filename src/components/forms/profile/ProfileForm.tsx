import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';

import { IProfile, IProfileForm } from './types';

import { FormErrorStyled, FormItemStyled, FormStyled } from '../forms-styled-components';

import Input from '../../input/Input';

yup.setLocale({
  mixed: {
    required: 'является обязательным',
    default: 'не валидно',
  },
  string: {
    email: 'неверный адрес почты',
  },
  number: {
    positive: 'Число должно быть больше 0',
  },
});

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().required().email(),
  })
  .required();

const ProfileForm = ({ profile }: IProfileForm) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: profile,
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  return (
    <FormStyled>
      <FormItemStyled>
        <Controller
          name="name"
          control={control}
          render={({ field }) => <Input placeholder="Имя" required {...field} />}
        />
        {errors.name && <FormErrorStyled>{errors.name?.message}</FormErrorStyled>}
      </FormItemStyled>

      <FormItemStyled>
        <Controller
          name="email"
          control={control}
          render={({ field }) => <Input placeholder="Почта" required {...field} />}
        />
        {errors.email && <FormErrorStyled>{errors.email?.message}</FormErrorStyled>}
      </FormItemStyled>

      <input className="button button--primary button--medium" type="submit" value="Обновить данные" />
    </FormStyled>
  );
};

export default ProfileForm;
