import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemeberListComponent } from './memeber-list/memeber-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
  // the order is count
export const  appRoutes: Routes = [
     { path: '', component: HomeComponent } ,
     { path: 'members', component: MemeberListComponent , canActivate: [AuthGuard]} ,
     { path: 'messages', component: MessagesComponent , canActivate: [AuthGuard]} ,
     { path: 'lists', component: ListsComponent } ,
     
     { path: '**', redirectTo:  '', pathMatch: 'full' } ,
];

