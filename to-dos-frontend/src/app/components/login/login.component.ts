import { Component,OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators , FormBuilder,AbstractControl} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import Swal from "sweetalert2";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;
  user_id:any;

  constructor(
    private fb: FormBuilder,
    private userservice:UserService,
    private router: Router

  ){
  }

  noSpaceOnlyValidator(control: AbstractControl): { [key: string]: any } | null {
    if (control.value && control.value.trim().length === 0) {
      return { noSpaceOnly: true };
    }
    return null;
  }
  ngOnInit(): void {
    // Remove the user_id from local storage
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_name');

    
    this.loginForm = new FormGroup ({
      user_name :new FormControl('',[Validators.required,Validators.minLength(5),this.noSpaceOnlyValidator]),
      password: new FormControl('',[Validators.required,Validators.minLength(5),this.noSpaceOnlyValidator])
    })
    
  }

  onSubmit(formdata:any){
    console.log(formdata);
    if(!this.loginForm.invalid){
    this.userservice.userLogin(formdata).subscribe(
      (res:any)=>{
            // console.log(res);
            // this.user_id = res.user._id;
            // console.log(this.user_id,"userID")
            localStorage.setItem('user_id', res.user._id);
            localStorage.setItem('user_name', res.user.user_name);


          if(res){
              this.router.navigateByUrl('/task');
          }

      },
      err => {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.error,
        })
      }
    )
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill all the fields!',
      })
    }
  }

}
