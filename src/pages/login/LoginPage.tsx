import React from 'react';

import SigninForm from '../../components/forms/sign-in/SigninForm';

const LoginPage = () => <SigninForm onSubmitHandler={() => console.log('koko')} />;

export default LoginPage;
