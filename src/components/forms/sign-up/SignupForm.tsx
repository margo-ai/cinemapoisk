import React, { ReactNode } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { withTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormStyled, FormItemStyled, FormErrorStyled } from '../forms-styled-components';

import Input from 'src/components/input/Input';

import { Inputs } from './types';

yup.setLocale({
  mixed: {
    required: 'является обязательным',
    default: 'не валидно',
  },
  string: { email: 'неверный адрес почты' },
});

const schema: yup.ObjectSchema<Inputs> = yup
  .object({
    email: yup.string().required().email(),
    password: yup.string().required(),
    password2: yup
      .string()
      .required()
      .oneOf([yup.ref('password'), null], 'пароли должны совпадать'),
  })
  .required();

const SignupForm = () => {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid, isSubmitted },
  } = useForm<Partial<Inputs>>({
    mode: 'onChange',
    defaultValues: { email: '', password: '', password2: '' },
    resolver: yupResolver<Inputs>(schema),
  });

  const customHandleSubmit: SubmitHandler<Inputs> = (values) => {
    console.log({ values });
    reset();
  };

  return (
    <FormStyled onSubmit={handleSubmit(customHandleSubmit)}>
      <FormItemStyled className="form__item">
        <Controller
          name="email"
          control={control}
          render={({ field }) => <Input placeholder="Электронная почта" {...field} />}
        />
        {errors.email && <FormErrorStyled className="form__error">{errors.email?.message}</FormErrorStyled>}
      </FormItemStyled>

      <FormItemStyled className="form__item">
        <Controller
          name="password"
          control={control}
          render={({ field }) => <Input placeholder="Пароль" {...field} />}
        />
        {errors.password && <FormErrorStyled className="form__error">{errors.password?.message}</FormErrorStyled>}
      </FormItemStyled>

      <FormItemStyled className="form__item">
        <Controller
          name="password2"
          control={control}
          render={({ field }) => <Input placeholder="Ещё раз пароль" {...field} />}
        />
        {errors.password2 && <FormErrorStyled className="form__error">{errors.password2?.message}</FormErrorStyled>}
      </FormItemStyled>

      <input className="button button--primary button--medium" type="submit" value="Регистрация" />
    </FormStyled>
  );
};

export default SignupForm;
