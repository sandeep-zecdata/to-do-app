import { Component,OnInit} from '@angular/core';
import { FormGroup,FormControl,Validators , FormBuilder,AbstractControl} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import Swal from "sweetalert2";
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!:FormGroup;

  constructor(
    private userservice:UserService,
    private fb: FormBuilder,
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

    this.signupForm = new FormGroup ({
      user_name :new FormControl('',[Validators.required,Validators.minLength(5),this.noSpaceOnlyValidator]),
      password: new FormControl('',[Validators.required,Validators.minLength(5),this.noSpaceOnlyValidator])
    })
    
  }

  onSubmit(formdata:any){
    console.log(formdata);
    if(!this.signupForm.invalid){
    this.userservice.userSignup(formdata).subscribe(
      (res:any)=>{
            console.log(res);
            Swal.fire({
              icon: 'success',
              title: 'OK',
              text: 'user successfully created!',
            }).then(() => {
              // After the user clicks on the 'OK' button in the success message, navigate to the login page
              this.router.navigateByUrl('/'); // Replace '/login' with the actual route of your login page
            });
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error!',
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