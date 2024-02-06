import React, { ReactNode, useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { IFormValues } from './types';
import { ICardProps } from '../../card/types';

import Input from '../../input/Input';
import Select from '../../select/Select';

import { FormStyled, FormItemStyled, FormErrorStyled } from '../forms-styled-components';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from 'src/graphql/queries/getCategories';

/** Graphql */

yup.setLocale({
  mixed: {
    required: 'является обязательным',
    default: 'не валидно',
  },
  string: {
    email: 'Неверный адрес почты',
    url: 'Неверный URL',
  },
  number: {
    positive: 'Число должно быть больше 0',
  },
});

const schema = yup
  .object()
  .shape({
    category: yup.string().required(),
    name: yup.string().required(),
    oldPrice: yup.number().positive().required(),
    price: yup.number().positive().required(),
    desc: yup.string().required(),
    photo: yup.string().url().required(),
  })
  .required();

interface IAddEditForm {
  cardData?: ICardProps;
  updateList?: () => void;
  onSuccessSubmit?: () => void;
}

const AddEditForm = ({ cardData, updateList, onSuccessSubmit }: IAddEditForm) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      category: null,
      name: '',
      price: 0,
      desc: '',
      photo: '',
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    console.log(data);
    reset();
  };

  const { data } = useQuery(GET_CATEGORIES);

  const result = data?.categories.getMany.data || [];
  const categories = result.map((item) => {
    return { value: item.name, name: item.name };
  });
  console.log(categories);

  useEffect(() => {
    if (!cardData) return;
    type TKeys = 'category' | 'name' | 'price' | 'desc' | 'photo';

    Object.keys(cardData).forEach((key) => {
      const uKey = cardData[key as TKeys];
      setValue(key as TKeys, typeof uKey === 'object' ? uKey.name : uKey);
    });
  }, [cardData]);

  return (
    <FormStyled onSubmit={handleSubmit(onSubmit)}>
      <FormItemStyled>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select returnObject={false} items={categories} placeholder="Жанр" required {...field} />
          )}
        />
        {errors.category && <FormErrorStyled>{errors.category?.message}</FormErrorStyled>}
      </FormItemStyled>

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
          name="price"
          control={control}
          render={({ field: { value, ...other } }) => (
            <Input placeholder="Цена" required {...other} value={value || ''} />
          )}
        />
        {errors.price && <FormErrorStyled>{errors.price?.message}</FormErrorStyled>}
      </FormItemStyled>

      <FormItemStyled>
        <Controller
          name="desc"
          control={control}
          render={({ field }) => <Input placeholder="Описание" required {...field} />}
        />
        {errors.desc && <FormErrorStyled>{errors.desc?.message}</FormErrorStyled>}
      </FormItemStyled>

      <FormItemStyled>
        <Controller
          name="photo"
          control={control}
          render={({ field }) => <Input placeholder="Ссылка на изображение" required {...field} />}
        />
        {errors.photo && <FormErrorStyled>{errors.photo?.message}</FormErrorStyled>}
      </FormItemStyled>

      <input className="button button--primary button--medium" type="submit" value="Сохранить" />
    </FormStyled>
  );
};

export default AddEditForm;
