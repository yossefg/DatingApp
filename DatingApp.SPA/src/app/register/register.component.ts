import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  constructor(private authService: AuthService) {
    
   }

  ngOnInit() {

  }

  onCancel() {
  }

  register() {
    this.authService.register(this.model).subscribe(() => {
      console.log('reg succsesfully');
    } , error => {
      console.log(error);
    }

    );
  }

}
