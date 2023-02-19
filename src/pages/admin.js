import React from 'react';
import Button from 'react-bootstrap/Button';
import { foodDrinkData } from '../assets/foodDrinkData';
import { oneOnOneData } from '../assets/oneOnOneData';
import { activityData } from '../assets/activityData';
import APIService from '../api/APIService';

function scaryFunction() {
  for(const item of foodDrinkData) {
    APIService.UploadDate(item);
  }
  for(const item of oneOnOneData) {
    APIService.UploadDate(item);
  }
  for(const item of activityData) {
    APIService.UploadDate(item);
  }
}


const Admin = () => {

  return (
    <div>
      <h1>Scary admin area, stay away please</h1>
      <Button onClick={scaryFunction}>initialize database</Button>
    </div>
  )
};

export default Admin;