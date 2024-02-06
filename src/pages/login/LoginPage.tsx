import React from 'react';
import './login-page.scss';

import SigninForm from '../../components/forms/sign-in/SigninForm';
import SignupForm from 'src/components/forms/sign-up/SignupForm';

const LoginPage = () => {
  return (
    <div className="login-page">
      <SignupForm />
      <SigninForm onSubmitHandler={() => console.log('koko')} />
    </div>
  );
};

export default LoginPage;
