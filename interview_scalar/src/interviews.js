import React from 'react';
import {Link} from 'react-router-dom';
import Home from './home';
import axios from 'axios';

export default class Interviews extends React.Component {
  state = {
    schedules: [],
  
  }

  componentDidMount() {
    axios.get(`http://localhost:8080/view-schedule`)
      .then(res => {

        const schedules = res.data.table;
        console.log(schedules);
        this.setState({ schedules });
      })
  }
   handleClicked(schedule){
   
    this.props.history.push({pathname : '/edit', state: {  schedule }});
   }
  render() {

      return (
      <div>
        <Link to='/'> Home Page </Link>
        <table className="table table-bordered table-striped">
         <thead>
          <tr>
            <th>Interview Id </th>
            <th>Interviewee Email </th>
            <th>Interviewer Email </th>
            <th>Date</th>
            <th> Start time</th>
            <th> End time </th>
          </tr>
          </thead>
          <tbody>
         
        { this.state.schedules.map(schedule => 
          <tr style={{cursor:'pointer'}} key={schedule.id} onClick={this.handleClicked.bind(this , schedule)}>
            <th>{schedule.id}</th>
            <th>{schedule.interviewee_email}</th>
            <th>{schedule.interviewer_email} </th>
            <th>{schedule.date}</th>
            <th>{schedule.start_time}</th>
            <th> {schedule.end_time}</th>
          </tr>)}
         
          </tbody>
        </table>
      </div>
      );
    
   
   
    
  }
}