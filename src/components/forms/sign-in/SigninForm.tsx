import React, { PropsWithChildren } from 'react';

import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { useTranslation, withTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';

/** Components */
import Input from 'src/components/input/Input';

/** Styled Components */
import { FormStyled, FormItemStyled, FormErrorStyled } from '../forms-styled-components';

import { Inputs, ISigninForm } from './types';

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
  })
  .required();

const SigninForm = ({ onSubmitHandler, errorMessage }: PropsWithChildren<ISigninForm>) => {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
    resolver: yupResolver<Inputs>(schema),
  });

  const customHandleSubmit: SubmitHandler<Inputs> = (values) => {
    onSubmitHandler(values);
    console.log({ values });
    reset();
  };

  return (
    <FormStyled onSubmit={handleSubmit(customHandleSubmit)}>
      <FormItemStyled className="form__item">
        <Controller
          name="email"
          control={control}
          render={({ field }) => <Input id="form-login--email" placeholder="Электронная почта" {...field} />}
        />
        {errors.email && <FormErrorStyled className="form--error">{errors.email?.message}</FormErrorStyled>}
      </FormItemStyled>

      <FormItemStyled className="form__item">
        <Controller
          name="password"
          control={control}
          render={({ field }) => <Input id="form-login--passwrd" type="password" placeholder="Пароль" {...field} />}
        />
        {errors.password && <FormErrorStyled className="form--error">{errors.password?.message}</FormErrorStyled>}
        {errorMessage && <FormErrorStyled className="form--error">{errorMessage}</FormErrorStyled>}
      </FormItemStyled>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <input className="button button--primary button--medium" type="submit" value="Войти" />
      </div>
    </FormStyled>
  );
};

export default SigninForm;
