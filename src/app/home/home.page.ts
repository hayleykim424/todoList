import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Task } from '../../models/task';
import { ToastController } from '@ionic/angular';
import { Screenshot } from '@ionic-native/screenshot/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  title:string = 'Shopping List';
  tasks:Array<Task> = [];
  taskInput:string = '';
  listTitle = 'Shopping List';
  now:number;

  //dataService -> variable name. DataService -> type
  constructor(
    public dataService:DataService,
    private toaster:ToastController,
    private screenshot: Screenshot
  )
  {
    this.readTasks(); //read the data from local storage
    this.now = new Date().getTime(); //new Date(): creates a date object.
    this.sortItems();
  }

  createTask(taskName:string){
    let taskDate:number = new Date().getTime();
    let task = { name: taskName, date: taskDate, status: false };
    return task;
  }
  //add a new task to list
  addTask(){
    if( this.taskInput.length > 0){
      this.tasks.push( this.createTask( this.taskInput ) );
      this.taskInput='';
      this.sortItems();
      this.dataService.storeList(this.tasks)
      .then(( response ) => {
        //success
        this.showToast('Item saved successfully');
      })
      .catch( (error) => {
        console.log(error);
      });
    }
  }

  readTasks(){
    this.dataService.loadList()
    .then( (response) => {
      if( response != null ) {
        this.tasks = <Array<Task>>response;
      }
    })
    .catch( (error) => {
      console.log(error);
    });
  }

  //Change a task's status
  changeStatus(date){
    //forEach doesn't care about index. it counts by the number of itmes in the array
    this.tasks.forEach((task) => {
      if(task.date == date) {
        task.status = task.status ? false : true;
      }
    });
    this.dataService.storeList(this.tasks);
    this.sortItems();
  }

  deleteItem(date){
    this.tasks.forEach((task,index) => {
      if(task.date == date){
        this.tasks.splice(index, 1); //splice takes 2 arguments. splice(index of array, number of items you want to delete from the index in the first argument). number.splice(2,1)
      }
    });
    this.sortItems();
    this.dataService.storeList(this.tasks)
    .then(  (response) => {
      //delete successful
    })
    .catch( (error) => {
      //there is an error
    });

  }

  formatDate(date:number){
    let diff = this.now - date;
    let seconds = diff / 1000;
    //if less than 60 seconds, return 'just now'
    if( seconds < 60 ){
      return 'just now';
    }
    //if between 60 secs and 1 hour (3600 secs)
    else if( seconds >= 60 && seconds < 3600 ){
      let mins = Math.floor( seconds / 60 );
      let mUnit = mins == 1 ? 'minute' : 'minutes';
      return mins + ' ' + mUnit + ' ago';
    }
    //if between an hour and 1 day
    else if( seconds >= 3600 && seconds <= 24*3600 ){
      let hours = Math.floor( seconds / 3600 );
      let hUnit = hours == 1 ? 'hour' : 'hours';
      let mins = Math.floor( (seconds - ( hours * 3600 )) / 60 );
      let mUnit = mins == 1 ? 'minute' : 'minutes';
      return hours + ' ' + hUnit + ' ' + mins + ' ' + mUnit + ' ago';
    }
    //if between 1 day and 1 week
    else if( seconds >= 24 * 3600 ){
      let days = Math.floor( seconds / (3600 * 24) );
      let dUnit = days == 1 ? 'day' : 'days';
      let hours = Math.floor( (seconds - ( days * 24 * 3600 )) / 3600);
      let hUnit = hours == 1 ? 'hour' : 'hours';
      return days + ' ' + dUnit + ' ' + hours + ' ' + hUnit + ' ' + 'ago';
    }
}


  //sort tasks first by date, then by status
  sortItems(){
    //add delay
    setTimeout( () => {
      //sort by date
      this.tasks.sort( ( task1, task2 ) => {
        if( task1.date < task2.date ){ return 1}
        if( task1.date > task2.date ){ return -1}
        if( task1.date == task2.date ){ return 0}
      });
      //sort by status
      this.tasks.sort( (task1, task2 ) => {
        let status1:number = task1.status ? 1 : 0;
        let status2:number = task2.status ? 1 : 0;
        return status1 - status2;
      });
    }, 1000);

  }


 //screenshot the page
 screenShot(){
   
}


  async showToast(message:string){
    const toast = await this.toaster.create({
      message: message,
      position: 'bottom',
      duration: 1000
    });
    toast.present();
  }
}
