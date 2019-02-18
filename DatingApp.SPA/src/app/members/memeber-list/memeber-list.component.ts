import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { AlertComponent } from 'ngx-bootstrap';
import { User } from '../../model/User';
import { AlertifyService } from '../../_services/alertify.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-memeber-list',
  templateUrl: './memeber-list.component.html',
  styleUrls: ['./memeber-list.component.css']
})
export class MemeberListComponent implements OnInit {
  users: User[];
  constructor(private userService: UserService, private alerfity: AlertifyService, private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'];
    });
  }

}
