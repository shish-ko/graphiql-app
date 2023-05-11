import React, { FC } from 'react';
import { Button, CssBaseline, Grid, Paper, TextField, Typography } from '@mui/material';
import styles from './AuthPage.module.scss';
import { NavLink, useLocation } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IFormData } from '~interfaces/*';

const AuthPage: FC = () => {
  const location = useLocation();
  const isLogin = location.pathname === '/auth';

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormData>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<IFormData> = (data: IFormData) => {
    if (isLogin) {
      alert('Auth ' + data.email);
    } else {
      alert('Registration ' + data.email);
    }
    reset();
  };

  return (
    <Grid container direction="column" alignItems="center" justifyContent="center" marginTop={10}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square borderRadius={2}>
        <div className={styles.paper}>
          <Typography component="h1" variant="h5">
            {isLogin ? 'Enter your accounting data' : 'To use the system, register'}
          </Typography>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <TextField
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
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
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
              type="submit"
              variant="contained"
              color="primary"
              className={styles.submit}
              sx={{ marginTop: '20px', width: '150px' }}
            >
              {isLogin ? 'Sign up' : 'Registration'}
            </Button>

            <Grid container marginTop={3}>
              <Grid item>
                {isLogin ? (
                  <NavLink to="/registration">No account? Registration</NavLink>
                ) : (
                  <NavLink to="/auth">Is there an account? Sign Up</NavLink>
                )}
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default AuthPage;
