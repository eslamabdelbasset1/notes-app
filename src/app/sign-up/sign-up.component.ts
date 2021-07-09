import { Component, OnInit } from '@angular/core';
import {FormGroup,Validators ,FormControl} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  error:string = '';

  constructor(private _AuthService:AuthService, private _Router:Router) { }
  registerForm = new FormGroup({
    first_name: new FormControl(null,
      [Validators.required,Validators.minLength(3), Validators.maxLength(20)]),
    last_name: new FormControl(null,
      [Validators.required,Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null,
      [Validators.required,Validators.email]),
    age: new FormControl(null,
      [Validators.required,Validators.min(16), Validators.max(80)]),
    password: new FormControl(null,
      [Validators.required, Validators.pattern('^[A-Z][a-z0-9]{3,8}$')])
   })
  submitRegisterForm(registerForm:FormGroup)
  {
    this._AuthService.register(registerForm.value).subscribe((response)=>{
      if(response.message == 'success')
      {
        this._Router.navigate(['./login']);
      }
      else
      {
        this.error = response.errors.message;
      }
    })
  }
  ngOnInit(): void {
  }

}
