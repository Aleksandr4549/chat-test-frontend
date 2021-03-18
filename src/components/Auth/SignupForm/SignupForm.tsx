import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';

export interface SignupI {
  name: string
  email: string
  password: string
}

interface Props {
  signupSubmit: (name: string, email: string, password: string) => void
  isDisabled: boolean
  authErrors: Array<string | undefined>
}

const validate = (values: SignupI) => {
  const errors: SignupI = {} as SignupI;
  if (!values.email) {
    errors.email = 'Это поле обязательно для заполнения';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Некорректный email';
  }

  if (!values.password) {
    errors.password = 'Это поле обязательно для заполнения';
  }

  if (!values.name) {
    errors.name = 'Это поле обязательно для заполнения';
  }

  return errors;
};

const SignupForm: React.FC<Props> = ({ signupSubmit, authErrors, isDisabled }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validate,
    onSubmit: (values) => signupSubmit(values.name, values.email, values.password)
  });

  return (
    <div className='auth__form__container'>
      <form className='auth__form' onSubmit={formik.handleSubmit}>
        <label htmlFor="name"></label>
        <input
          className={formik.touched.name && formik.errors.name ? 'auth__form__input input_error' 
                                                               : 'auth__form__input'}
          id="name"
          name="name"
          type="text"
          placeholder='введите имя'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className='form__error'>{formik.errors.name}</div>
        ) : null}

        <label htmlFor="email"></label>
        <input
          className={formik.touched.email && formik.errors.email ? 'auth__form__input input_error' 
                                                                 : 'auth__form__input'}
          id="email"
          name="email"
          type="text"
          placeholder='введите email'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
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
          placeholder='введите пароль'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className='form__error'>{formik.errors.password}</div>
        ) : null}

        <button className='auth__form__btn' type='submit' disabled={isDisabled}>Зарегистрироваться</button>
      </form>
      {authErrors.length > 0 &&  authErrors.map((error, i) => <div key={i} className='error__message'>{error}</div>)}
      <Link to='/login'>Войти</Link>
    </div>
  );
};

export default SignupForm;