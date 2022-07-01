import React, { useState } from "react";
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Divider from '@mui/material/Divider';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useForm } from "react-hook-form";
import authService from "../shared/api/auth.service";
import { Link, useNavigate } from 'react-router-dom';
import "./auth.css";
import vkLogo from "../assets/vk.svg";

function Registration() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState(null);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const navigate = useNavigate();

  const onSubmit = data => {
    setDisableSubmit(true);
    const { password, confirm_password } = data;

    if (password !== confirm_password) {

    } else {
      authService
        .createUser(data)
        .then(() => {
          navigate("/login");
          setDisableSubmit(false);
        })
        .catch(err => {
          setErrorMessage(err.response.data);
          setDisableSubmit(false);
        });
    }
  };

  const handleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="auth-form-container">
      <Paper component="form" elevation={3} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h5" gutterBottom component="h1">
          Create an account
        </Typography>

        <TextField
          size="small"
          label="Last name"
          variant="outlined"
          className="auth-form__input"
          required
          disabled={disableSubmit}
          {...register("last_name", { required: true })}
        />

        <TextField
          size="small"
          label="First name"
          variant="outlined"
          className="auth-form__input"
          required
          disabled={disableSubmit}
          {...register("first_name", { required: true })}
        />

        <TextField
          size="small"
          label="Email"
          variant="outlined"
          className="auth-form__input"
          required
          disabled={disableSubmit}
          {...register("email", { required: true })}
        />

        <FormControl size="small" variant="outlined" className="auth-form__input">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            required
            disabled={disableSubmit}
            {...register("password", { required: true })}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

        <TextField
          type="password"
          size="small"
          label="Confirm password"
          variant="outlined"
          className="auth-form__input"
          required
          disabled={disableSubmit}
          {...register("confirm_password", { required: true })}
        />

        <Button
          variant="contained"
          type="submit"
          className="auth-form__submit-button"
          style={{ marginRight: 15 }}
          disabled={disableSubmit}
        >
          Create
        </Button>
        <span style={{ marginRight: 10 }}>Or</span>
        <Link to="/login">Login</Link>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <Divider className="auth-divider">Or create account with</Divider>

        <Button variant="outlined">
          Sign up with
          <img src={vkLogo} className="social-network-logo" alt="vk" />
        </Button>
      </Paper>

      <Button
        variant="contained"
        className="continue-button"
        endIcon={<ArrowRightAltIcon />}
        onClick={() => navigate("/")}
      >
        Continue without registration
      </Button>
    </div>
  );
}

export default Registration;
