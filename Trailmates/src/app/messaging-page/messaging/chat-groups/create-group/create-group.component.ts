import { NgForm } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user-service.service';
import { MessagesService } from 'src/app/services/messages.service';
import { Conversation } from 'src/app/models/conversation';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {

  constructor(private _userService: UserService, private _messageService: MessagesService) { }

  users: User[] = [];
  filterUsers: User[] = [];
  selectedUsers: User[] = [];
  query: string = '';
  groupReq = {
    conversationName: '',
    userIDs: [] as string[]
  }
  @Output() passCreateGroup: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
    this._userService.getAllUsers()
    .subscribe(
      (data:any)=>{
        this.users = data
      },
      (error:any)=>{
        console.log(error)
      }
    )
  }

  searchUsers(){
    this.filterUsers = [];
    this.users.forEach((user)=>{
      if(user.username?.toLowerCase().includes(this.query.toLowerCase()) 
      && !this.filterUsers.includes(user)){
        if(user.id !== localStorage.getItem('id')){
        this.filterUsers.push(user);
        }
      }
    })
  }

  addUser(target:any){
    console.log(target.id);
    this.users.forEach(user=>{
      if(user.id == target.id && !this.selectedUsers.includes(user)){
        this.selectedUsers.push(user)
      }
    })
    
  }

  removeUser(target: any){
    console.log(target.id);
    this.users.forEach(user=>{
      if(user.id == target.id){
        let index = this.selectedUsers.indexOf(user);
        if(index > -1){
          this.selectedUsers.splice(index, 1)
        }
      }
    })
  }

  createGroup(createGroupForm: NgForm){
    //Gets selected users Id and push it into groupReq array
    if(createGroupForm.form.status == 'VALID'){
    if(this.selectedUsers.length > 0){
    this.selectedUsers.forEach(user=>this.groupReq.userIDs.push(user.id!))
    }
    //Post request
    this._messageService.createNewGroup(this.groupReq)
    this.passCreateGroup.emit();
    console.log("successfully created.")
    }
  }

}
