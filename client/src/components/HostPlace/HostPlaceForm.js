import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import HostPlaceService from '../../services/host-service';
import TextField from '@material-ui/core/TextField';
import MapboxAutocomplete from 'react-mapbox-autocomplete';
import './HostPlace.css';
import { DateFormatInput } from 'material-ui-next-pickers'
import TimeInput from 'material-ui-time-picker'
class HostPlace extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hostID: "",
            address: "",
            date: "",
            initialTime: "",
            finishingTime: "",
            price: "",
            capacity: "",
            location: { latitude: 0, longitude: 0 },
            placeName: "",
            availability: "",
            concertRequest: "",
            redirect: false,
            clean: false
        }
        this.service = new HostPlaceService();
    }

    componentDidMount() {
        this.state.hostID = this.props.user._id
        console.log(this.state.hostID)
        // this.setState = ({ hostID: this.props.user._id })
    }

    handleFormSubmit = (event) => {
        console.log(event);
        event.preventDefault();

        const { hostID, address, date, initialTime, finishingTime, price, capacity, location, placeName, availability, concertRequest } = this.state;

        console.log("hostID is", hostID)

        this.service.new(hostID, address, date, initialTime, finishingTime, price, capacity, location, placeName, availability, concertRequest)
            .then(response => {
                console.log(response);
                this.setState({
                    hostID: "",
                    address: "",
                    date: "",
                    initialTime: "",
                    finishingTime: "",
                    price: "",
                    capacity: "",
                    location: { latitude: 0, longitude: 0 },
                    placeName: "",
                    redirect: true,
                    clean: true
                }, () => {
                    this.props.update()
                });
            })
            .catch(error => console.log(error))
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    _suggestionSelect = (result, lat, lng, text) => {
        console.log(this.state, "dentro del geocoder")
        console.log(result, lat, lng, text);
        this.state.location.latitude = parseFloat(lat);
        this.state.location.longitude = parseFloat(lng);
        this.state.address = result;
    }
    onChangeDate = (date: Date) => {
        // console.log('Date: ', date)
        this.setState({ date })
    }
    onChangeTime = (time: Date) => {
        console.log('Time: ', time)
        this.setState({ time })
    }

    render() {
        return (
            <div>
                <h1>Add your nice Place</h1>
                <form onSubmit={this.handleFormSubmit}>
                    <Grid direction='column' spacing={16} container alignItems='center'>
                        <Grid item>
                            <MapboxAutocomplete publicKey='pk.eyJ1IjoiZGRpZXpyIiwiYSI6ImNqb3ZuMGZ3cjFqa2YzcWxrYjBtNjJzaG4ifQ.cCFZkl39Hov3D-Ujeq74Cg'
                                inputClass='search-input'
                                onSuggestionSelect={this._suggestionSelect}
                                country='es'
                                resetSearch={false} />
                        </Grid>
                        <Grid item>
                            <TextField placeholder='Address' type="text" name="address" value={this.state.address} onChange={this.handleChange} />
                        </Grid>
                        <DateFormatInput type="date" name="date" value={this.state.date} onChange={this.onChangeDate} />
                        <Grid item>
                            <TextField label='Concert starts at' type="time" name="initialTime" value={this.state.initialTime} onChange={this.handleChange} InputLabelProps={{
                                shrink: true,
                            }} />
                        </Grid>
                        <Grid item>
                            <TextField label='Concert finishes at' type="time" name="finishingTime" value={this.state.finishingTime} onChange={this.handleChange} InputLabelProps={{
                                shrink: true,
                            }} />
                        </Grid>
                        <TextField placeholder='Price €/per person' type="text" name="price" value={this.state.price} onChange={this.handleChange} />
                    </Grid>
                    <Grid item>
                        <TextField placeholder='Capacity' type="number" name="capacity" value={this.state.capacity} onChange={this.handleChange} />
                    </Grid>
                    {/* <TimeInput
                        mode='12h'
                        onChange={(time) => this.onChangeTime(time)}
                    /> */}
                    <TimeInput
                        // mode='12h'
                        label='Concert finishes at'
                        type="time"
                        value={this.state.finishingTime}
                        onChange={this.onChangeTime}
                    />
                    {/* <Grid item>
                            <TextField placeholder='Location' type="text" name="location" value={this.state.location} onChange={this.handleChange} />
                        </Grid> */}
                    <Grid item>
                        <TextField placeholder='Name' type="text" name="placeName" value={this.state.placeName} onChange={this.handleChange} />
                    </Grid>
                    <Button variant="contained" color="primary" type="submit" value="Submit">Create Host Place</Button>

                </form>
            </div >
        );
    }
}

export default HostPlace;
{/* <TextField
    id="time"
    label="Alarm clock"
    type="time"
    defaultValue="07:30"
    className={classes.textField}
    InputLabelProps={{
        shrink: true,
    }}
    inputProps={{
        step: 300, // 5 min
    }}
/> */}



{/* <TimeFormatInput label='Concert starts at' type="text" name="initialTime" value={this.state.initialTime} onChange={this.onChangeTime} mode='12h' />*/ }
{/* <TimeFormatInput label='Concert finishes at' type="text" name="finishingTime" onChange={this.onChangeTime} />
<Grid item> */}