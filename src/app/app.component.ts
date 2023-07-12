import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GeneralService } from 'src/app/general.service';
import { tasks } from 'src/app/tasks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'todolist';
  constructor(public generalService: GeneralService){}
  taskList : any[] =[];

  id:any;
  chidx:number=-1;

  ngOnInit(): void {
    this.taskList = []
    const getJson= localStorage.getItem("taskList") ;
    if(getJson){
      this.taskList = JSON.parse(getJson)
    }
    if(this.taskList.length>0)
    {
      this.id=this.taskList[this.taskList.length-1].id +1;
    }
    else{
      this.id=1;
    }
    console.log(this.taskList)
  }

  onSubmit(task:NgForm){
    console.log(this.id)
    let t = new tasks(this.id, task.value.title, false);
    this.taskList.push(t);
    task.resetForm();
    let string = JSON.stringify(this.taskList);
    localStorage.setItem("taskList", string);
    const getJson= localStorage.getItem("taskList") ;
    if(getJson){
      this.taskList = JSON.parse(getJson)
    }
    if(this.taskList.length>0)
    {
      this.id=this.taskList[this.taskList.length-1].id +1;
    }
    else{
      this.id=1;
    }
  }
  Update(id:number,title:string){

    this.generalService.showDialog=true;
    function checkPass(arr:any){
      return arr.id==id;
    }
    let index=this.taskList.findIndex(checkPass);
    this.chidx=index;

  }
  onSave(newTitle:NgForm)
    {
      this.generalService.showDialog=false;
      this.taskList[this.chidx].title=newTitle.value.title;
      let string = JSON.stringify(this.taskList);
      localStorage.setItem("taskList", string);
      const getJson= localStorage.getItem("taskList") ;
      if(getJson){
        this.taskList = JSON.parse(getJson)
      }
    }
  taskCompleted(id:number)
  {
    function checkPass(arr:any){
      return arr.id==id;
    }
    let index=this.taskList.findIndex(checkPass);
    if(this.taskList[index].isCompleted==true){
      this.taskList[index].isCompleted=false;
    }
    else{
      this.taskList[index].isCompleted=true;
    }
    let string = JSON.stringify(this.taskList);
      localStorage.setItem("taskList", string);
      const getJson= localStorage.getItem("taskList") ;
      if(getJson){
        this.taskList = JSON.parse(getJson)
      }
  }

  Remove(id:number){
    function checkPass(arr:any){
      return arr.id==id;
    }

    let index=this.taskList.findIndex(checkPass)
    if (confirm("Are you sure you want to delete this Task ' "+ this.taskList[index].title + " '") == true) {
      this.taskList.splice(index,1);
    }
    let string = JSON.stringify(this.taskList);
    localStorage.setItem("taskList", string);
    const getJson= localStorage.getItem("taskList") ;
    if(getJson){
      this.taskList = JSON.parse(getJson)
    }
    if(this.taskList.length>0)
    {
      this.id=this.taskList[this.taskList.length-1].id +1;
    }
    else{
      this.id=1;
    }
    }
}
