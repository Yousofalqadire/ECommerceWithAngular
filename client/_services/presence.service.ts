import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import{ environment } from '../src/environments/environment';
import {HubConnection, HubConnectionBuilder} from '@microsoft/signalr';
import {User} from '../src/_models/user';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  horizintalSnakBarPosition:MatSnackBarHorizontalPosition ="center";
  verticalSnakBarPosition:MatSnackBarVerticalPosition = 'bottom';
 hubUrl = environment.hubUrl;
private hubConnection : HubConnection;
private onlineUsersDataSource = new BehaviorSubject<string[]>([]);
onlineUsers$ = this.onlineUsersDataSource.asObservable();
  constructor(private matSanackBar :MatSnackBar) { }

  creatConnection(user:User){
   this.hubConnection = new HubConnectionBuilder()
   .withUrl(this.hubUrl +'presence',{
     accessTokenFactory : ()=> user.token
   })
   .withAutomaticReconnect()
   .build()
   this.hubConnection.start()
   .catch(err => console.log(err))
   this.hubConnection.on('UserIsOnline',username=>{
    this.matSanackBar.open(`${username}  has connected`,'X',{
      horizontalPosition:this.horizintalSnakBarPosition,
      verticalPosition:this.verticalSnakBarPosition
    });
   })
   this.hubConnection.on('UserIsOffline', username=>{     
    this.matSanackBar.open(`${username}  has disconnected`,'X',{
      horizontalPosition:this.horizintalSnakBarPosition,
      verticalPosition:this.verticalSnakBarPosition
    });
    this.hubConnection.on('GetOnlineUsers',(usernames:string[])=>{
      this.onlineUsersDataSource.next(usernames);
    })
   })
  }

  stopConnection()
  {
    this.hubConnection.stop().catch(error => console.log(error))
  }
}
