import React, { Component } from 'react';
import {Meteor} from 'meteor/meteor';

import { Tasks } from '../api/Tasks';
 
// Task component - represents a single todo item
export default class Task extends Component {
  toggleChecked() {
    //Set the checked property to the opposite of its current value
    Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);

  deletedThisTask() {
    Meteor.call('tasks.remove', this.props.task._id);
  }
  render() {
    //Give tasks a different className when they are checked off,
    //so that we can style them nicely in CSS
    const taskClassName = this.props.task.checked ? 'checked' : ' ';

    return (
      <li className = {taskClassName}>
        <button className = "delete" onClick = {this.deletedThisTask.bind(this)}>
          &times;
        </button>

        <input
          type = "checkbox"
          readOnly
          checked = {!!this.props.task.checked}
          onClick = {this.toggleChecked.bind(this)}
        />

        <span className = "text">
          <strong>{this.props.task.username}</strong> needs to: {this.props.task.text}
          </span>
      </li>
    );
  }
}