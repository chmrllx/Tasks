import * as yup from 'yup';

export const subscriptionSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Назва занадто коротка')
    .required('Введіть назву сервісу'),
  price: yup
    .number()
    .typeError('Ціна має бути числом (використовуй крапку)')
    .positive('Ціна повинна бути більшою за 0')
    .required('Вкажіть ціну'),
  period: yup
    .string()
    .oneOf(['monthly', 'yearly'], 'Оберіть: monthly або yearly')
    .required('Вкажіть період'),
});