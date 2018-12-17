import React, { Component } from 'react';
import AuthService from '../../services/auth-service';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';

/* const Button = styled.button`
    background-color: papayawhip;
    min-height: 32px;
    padding: 8px 16px;
    border-radius: 3px;
`;
 */
export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = { username: '', password: '' ,redirect:false};
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const {username,password} = this.state;

    this.service.login(username, password)
    .then( response => {
        this.setState({ username: "", password: "" ,redirect:true});
    })
    .catch( error => console.log(error) )
  }
    
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
    
  render(){
    if(this.state && this.state.redirect){return <Redirect to ="/"/>}
    return(
      <div>
        <form onSubmit={this.handleFormSubmit}>
        <Grid direction='column' spacing={16} container 
        alignItems="center" >
        <Grid  item xs={12}>
          <TextField placeholder='Name' type="text" name="username" value={this.state.username} onChange={this.handleChange} />
        </Grid>
        <Grid item>
          <TextField placeholder='password' type="password" name="password" value={this.state.password} onChange={this.handleChange} />
        </Grid>
        <Grid item>
        <Button variant="contained" color="primary" type="submit" value="Login">LOGIN</Button>
        </Grid>
        </Grid>
        </form>
      </div>
    )
  }
}