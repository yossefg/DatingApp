import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemeberListComponent } from './members/memeber-list/memeber-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { MemberDetailResolver } from './_resolver/member-details.resolver';
import { MemberListResolver } from './_resolver/memeber-list.resolver';
  // the order is count
export const  appRoutes: Routes = [
     { path: '', component: HomeComponent } ,
     { path: 'members', component: MemeberListComponent , canActivate: [AuthGuard], resolve: {users: MemberListResolver}} ,
     { path: 'members/:id', component: MemberDetailsComponent , canActivate: [AuthGuard], resolve: {user: MemberDetailResolver} },
     { path: 'messages', component: MessagesComponent , canActivate: [AuthGuard] } ,
     { path: 'lists', component: ListsComponent } ,
     { path: '**', redirectTo:  '', pathMatch: 'full' } ,
];

