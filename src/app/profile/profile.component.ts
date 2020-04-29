import { Component, OnInit } from '@angular/core';
import {AuthService, User} from "../auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {
  currentUser: User
  filename = 'Выбрать файл'
  cvFilename = 'Выбрать файл'
  backendUrl = 'https://127.0.0.1:8000'
  photo: File = null
  cv: File = null

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchUser()
  }

  fetchUser():void {
    this.authService.getLoggedInUser().subscribe(x => {
      this.currentUser = x
    })
  }

  PhotoSelected(event) {
    const file = <File>event.target.files[0]
    console.log(file.type)
    if (['image/jpg','image/jpeg','image/png','image/tiff'].includes(file.type)) {
      this.photo = <File>event.target.files[0]
      this.filename = event.target.files[0]['name']
    } else {
      this.filename = 'Неверный тип файла'
    }
  }

  PhotoUpload() {
    this.authService.uploadPhoto(this.photo).subscribe( x => {
      this.fetchUser()
    })
    this.filename = 'Выбрать файл'
  }

  CvSelected(event) {
    const file = <File>event.target.files[0]
      this.cv = <File>event.target.files[0]
      this.cvFilename = event.target.files[0]['name']
  }

  CvUpload() {
    this.authService.uploadCv(this.cv).subscribe( x => {
      this.fetchUser()
    })
    this.cvFilename = 'Выбрать файл'
  }

  Logout() {
    this.authService.logout()
  }

  Save() {
    this.authService.save(this.currentUser)
  }
}
