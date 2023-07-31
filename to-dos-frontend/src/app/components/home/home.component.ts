import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/services/service.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {

  myForm!: FormGroup;
  tasks: string[] = [];
  allTasks:any;
  editClicked:any = false;
  task_id:any;
  current_user_id:any;

  constructor(private taskservice: ServiceService) {

  }

  ngOnInit(): void {
    this.current_user_id = localStorage.getItem('user_id');
    console.log("current user id",this.current_user_id);
    this.myForm = new FormGroup({
      task: new FormControl('', Validators.required)
    });

    this.taskservice.getCurrentuserTasks(this.current_user_id).subscribe(
      (res:any) =>{
          this.allTasks = res;
          console.log(this.allTasks);
      },
      err =>{
            console.log(err)
      }
    )

  }

  onSubmit(formdata: any) {
    formdata.user_id = this.current_user_id;

    console.log(formdata,"form data")
    const taskControl = this.myForm.get('task');
    if (taskControl?.value) {
      const taskValue = taskControl.value;
      this.tasks.push(taskValue);
      this.myForm.reset();
 
    this.taskservice.taskPost(formdata).subscribe(
      (res: any) => {
        if (res) {
          console.log("swal")
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1000, title: 'task added!',
             icon: 'success',
          });
          this.ngOnInit();
        }
        else {
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1000, title: 'error!',
             icon: 'error',
          });
        }
      },
      err => {
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1000, title: 'please add task!',
           icon: 'error',
        });
      }
    )
}else{
  console.log("error")
}
  }

  onDelete(task:any){
    console.log(task._id,"task id" );
    this.taskservice.deleteTask(task._id).subscribe(
      (res:any)=>{
          console.log("task deleted");
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1000, title: 'task deleted!',
             icon: 'success',
          });
          this.ngOnInit();
      },
      error => {

      }
    )
  }

  onEdit(task:any){
    this.task_id = task._id;
    console.log(this.task_id,"task id" );
    this.myForm.patchValue({
      task:task.task
    })
    this.editClicked = true;
  }

  onUpdate(data:any){
    console.log(data)
    this.editClicked = false;
    this.taskservice.updateTask(this.task_id,data).subscribe(
      (res:any)=>{
          console.log("task updated");
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1000, title: 'task updated!',
             icon: 'success',
          });
          this.ngOnInit();
      },
      error => {

      }
    )
  }

}

