import React from 'react';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';

import '../auth.scss';

export interface LoginI {
  email: string
  password: string
}

interface Props {
  loginSubmit: (email: string, password: string) => void
  authErrors: Array<string | undefined>
  isDisabled: boolean
}

const validate = (values: LoginI) => {
  const errors: LoginI = {} as LoginI;
  if (!values.email) {
    errors.email = 'Это поле обязательно для заполнения';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Некорректный email';
  }

  if (!values.password) {
    errors.password = 'Это поле обязательно для заполнения';
  }

  return errors;
};

const LoginForm: React.FC<Props> = ({ loginSubmit, authErrors, isDisabled }): React.ReactElement => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validate,
    onSubmit: (values) => loginSubmit(values.email, values.password)
  });

  return (
    <div className='auth__form__container'>
      <form className='auth__form' onSubmit={formik.handleSubmit}>
        <label htmlFor="email"></label>
        <input
          className={formik.touched.email && formik.errors.email ? 'auth__form__input input_error' 
                                                                 : 'auth__form__input'}
          id="email"
          name="email"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          placeholder='введите email'
        />
        {formik.touched.email && formik.errors.email ? (
          <div className='form__error'>{formik.errors.email}</div>
        ) : null}

        <label htmlFor="password"></label>
        <input
          className={formik.touched.password && formik.errors.password ? 'auth__form__input input_error' 
                                                                 : 'auth__form__input'}
          id="password"
          name="password"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          placeholder='введите пароль'
        />
        {formik.touched.password && formik.errors.password ? (
          <div className='form__error'>{formik.errors.password}</div>
        ) : null}

        <button className='auth__form__btn' type='submit' disabled={isDisabled}>Войти</button>
      </form>
      {authErrors.length > 0 &&  authErrors.map((error, i) => <div key={i} className='error__message'>{error}</div>)}
      <Link to='/signup'>Зарегистрироваться</Link>
    </div>
  );
};

export default LoginForm;