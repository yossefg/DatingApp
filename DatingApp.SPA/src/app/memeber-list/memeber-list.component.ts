import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AlertComponent } from 'ngx-bootstrap';
import { User } from '../model/User';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-memeber-list',
  templateUrl: './memeber-list.component.html',
  styleUrls: ['./memeber-list.component.css']
})
export class MemeberListComponent implements OnInit {
  users: User[];
  constructor(private userService: UserService, private alerfity: AlertifyService) { 
    this.loadUser();
  }

  ngOnInit() {
  }
loadUser() {
this.userService.getUsers().subscribe((users: User[]) => {
  this.users = users;
}, error => {
  this.alerfity.error(error);
});

}
}
