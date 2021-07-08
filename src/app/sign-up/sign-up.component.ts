import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {FormGroup, Validators , FormControl} from "@angular/forms";
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  isStyleInvalid={'background-color':'#17a2b8','border-color':'#17a2b8'}
  isStyleValid={'background-color':'gray','border-color':'gray'}
  isClicked = false;
  responseMessage = "";
  isUniqueEmailMessage = "";
  isUniqueEmail = false;
  isSuccess = false;
  constructor(private _AuthService:AuthService) { }
  signUp = new FormGroup({
    first_name:new FormControl('', [Validators.required,Validators.pattern(/^([A-Za-z]+[,.]?|[a-z]+['_]?)+$/)]),
    last_name:new FormControl('', [Validators.required,Validators.pattern(/^([A-Za-z]+[,.]?|[a-z]+['_]?)+$/)]),
    email:new FormControl('', [Validators.required,Validators.email]),
    age:new FormControl('', [Validators.required]),
    password:new FormControl('', [Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,10}$/)]),
  })

  FormData()
  {
    this.isClicked = true;
    if(this.signUp.valid)
    {
      this._AuthService.signUp(this.signUp.value).subscribe((data)=>{
        if (data.message("success"))
        {
          this.isClicked = false;
          this.isSuccess = true;
          this.isUniqueEmail = false;
          this.responseMessage = data.message;
          this.signUp.reset();
        }
        else {
          this.isClicked = false;
          this.isSuccess = true;
          this.isUniqueEmail = true;
          this.isUniqueEmailMessage = data.error.email.message;
        }
        console.log(data)
      })
    }
  }
  ngOnInit(): void {
  }

}
