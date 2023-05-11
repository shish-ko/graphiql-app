import React, { FC } from 'react';
import { Button, CssBaseline, Grid, Paper, styled, TextField, Typography } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IFormData } from '~interfaces/*';
import { grey, indigo, red } from '@mui/material/colors';
import { authState } from '~configs/firebase';
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from 'react-firebase-hooks/auth';
import { useAppDispatch } from '~utils/userHooks';
import { invokeAlert } from '~store/alertSlice';

const Form = styled('form')({
  maxWidth: '550px',
});

const PaperCss = styled('div')({
  maxWidth: '550px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '50px 36px',
});

const Link = styled(NavLink)({
  color: grey[700],
  textDecoration: 'none',
  '&:hover': {
    color: grey[500],
  },
});

const InputField = styled(TextField)({
  '& label.Mui-focused': {
    color: indigo[700],
  },
  '& label.Mui-error': {
    color: red[700],
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: indigo[700],
      borderWidth: '1px',
    },
    '&.Mui-error fieldset': {
      borderColor: red[700],
      borderWidth: '1px',
    },
  },
});

const AuthPage: FC = () => {
  const location = useLocation();
  const isLogin = location.pathname === '/login';
  const [createUserWithEmailAndPassword, regUser, regLoading, regError] =
    useCreateUserWithEmailAndPassword(authState);
  const [signUserWithEmailAndPassword, signUser, signLoading, signError] =
    useSignInWithEmailAndPassword(authState);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormData>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<IFormData> = async (data: IFormData) => {
    if (isLogin) {
      await signUserWithEmailAndPassword(data.email, data.password);
      if (signError) {
        dispatch(invokeAlert({ type: 'error', content: signError.message }));
        return;
      }
      if (signUser) {
        dispatch(invokeAlert({ type: 'success', content: 'You are successfully logged in' }));
      }
    } else {
      await createUserWithEmailAndPassword(data.email, data.password);
      if (regError) {
        dispatch(invokeAlert({ type: 'error', content: regError.message }));
        return;
      }
      if (regUser) {
        dispatch(invokeAlert({ type: 'success', content: 'Account was successfully created' }));
      }
    }
    reset();
  };

  return (
    <Grid container direction="column" alignItems="center" justifyContent="center" marginTop={10}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square borderRadius={2}>
        <PaperCss>
          <Typography component="h1" variant="h5">
            {isLogin ? 'Log in' : 'Sign up'}
          </Typography>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <InputField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              autoComplete="email"
              autoFocus
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
              {...register('email', {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'invalid email address',
                },
              })}
              InputLabelProps={{ shrink: true }}
            />
            <InputField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              id="password"
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ''}
              {...register('password', {
                required: true,
                pattern: {
                  value: /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,}$/,
                  message:
                    'Minimum 8 symbols, at least one letter, one digit, one special character',
                },
              })}
              InputLabelProps={{ shrink: true }}
            />
            <Button
              disabled={regLoading || signLoading}
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginTop: '20px', width: '150px' }}
            >
              {isLogin ? 'Login' : 'Sign up'}
            </Button>
            <Grid container marginTop={3}>
              <Grid item>
                {isLogin ? (
                  <Link to="/signup">Don&#39;t have an account? Create it</Link>
                ) : (
                  <Link to="/login">Have already an account? Log in</Link>
                )}
              </Grid>
            </Grid>
          </Form>
        </PaperCss>
      </Grid>
    </Grid>
  );
};

export default AuthPage;
