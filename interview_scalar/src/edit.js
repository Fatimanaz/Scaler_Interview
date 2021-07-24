import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import axios from 'axios';
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props.history);
    if(props.history){
    	var temp = props.history.location.state.schedule ;
    	console.log(temp);
    	this.state = {
    	id : temp.id ,
		IntervieweeEmail : temp.interviewee_email,
		InterviewerEmail : temp.interviewer_email,
		Date : temp.date,
		StartTime : temp.start_time,
		EndTime : temp.end_time,
	}
    }
    else{
    	this.props.history.push('/view-schedule');
    }
  }

  handleInputChanged(event) {
  	var x = event.target.name ;
  	console.log(x);
    this.setState({
      [x]: event.target.value
    });

  }
  //  componentDidUnMount() {
  //   this.setState({
  //   	IntervieweeEmail : "",
		// InterviewerEmail : "",
		// Date : "",
		// StartTime : "",
		// EndTime : "",
  //   })
  // }
  handleButtonClicked() {
    
    if(!this.state.IntervieweeEmail ){
    	alert("Please enter IntervieweeEmail");
    }
    else if (!this.state.InterviewerEmail){
    	alert("Please enter InterviewerEmail");
    }
     else if (!this.state.Date ) {
     	alert("Please enter Date of the Interview");
     }
     else if ( !this.state.StartTime ){
     	alert("Please enter start time of the Interview");
     }
     else if( !this.state.EndTime){
    	alert("Please enter End time of the Interview");
    }
    else{
    	console.log(this.state);
    	var x = this.state ;
    	axios.put(`http://localhost:8080/update-interview` , {params : x})
	      .then(res => {
	      		if(res.data==="OK"){
	      			this.setState({
	      				id : "" ,
	      				IntervieweeEmail : "",
						InterviewerEmail : "",
						Date : "",
						StartTime : "",
						EndTime : "",
	      			});
	      			alert("Interview has been successfully updated to the schedule");
	      			this.props.history.push('/view-schedule');
	      		}
	      		else{
	      			alert(res.data);
	      		}
	      })

    }
    
  }

  render() {
    return  (
  		
      	<div>
      	  <Link to='/view-schedule'> Interview schedules </Link>
      	  <h3>Please fill the details you want to change.</h3>
		  <Form.Group className="mb-3" controlId="IntervieweeEmail">
		    <Form.Label>Interviewee Email </Form.Label>
		    <Form.Control type="email" name="IntervieweeEmail" value={this.state.IntervieweeEmail} placeholder="Enter email" onChange={this.handleInputChanged.bind(this)}/>
		  </Form.Group>

		 <Form.Group className="mb-3" >
		    <Form.Label>Interviewer Email</Form.Label>
		    <Form.Control type="email" name="InterviewerEmail" value={this.state.InterviewerEmail} placeholder="Enter Email" onChange={this.handleInputChanged.bind(this)}/>
		  </Form.Group>
		 
		  <Form.Group className="mb-3" >
		    <Form.Label>Interviewer Date</Form.Label>
		    <Form.Control type="email" name="Date" value={this.state.Date} placeholder="DD/MM/YY Format" onChange={this.handleInputChanged.bind(this)}/>
		  </Form.Group>

		  <Form.Group className="mb-3" >
		    <Form.Label>StartTime</Form.Label>
		    <Form.Control type="email" name="StartTime" value={this.state.StartTime} placeholder="14:00" onChange={this.handleInputChanged.bind(this)}/>
		  </Form.Group>

		  <Form.Group className="mb-3" >
		    <Form.Label>StartTime</Form.Label>
		    <Form.Control type="email" name="EndTime" value={this.state.EndTime} placeholder="15:00" onChange={this.handleInputChanged.bind(this)}/>
		  </Form.Group>

		   <Form.Group controlId="formFile" className="mb-3">
		    <Form.Label>Default file input example</Form.Label>
		    <Form.Control type="file" />
		  </Form.Group>
		  
		  <button   onClick={this.handleButtonClicked.bind(this)}>
		    Update 
		  </button>
		</div>
	
    );
  }
}

