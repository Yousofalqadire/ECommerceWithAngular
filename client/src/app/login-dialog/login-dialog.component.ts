import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {
  hide = true;
  constructor(private fb:FormBuilder ,private matDilogRef:MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) { }

  ngOnInit(): void {
    this.initialForm()
  }

  loginForm= this.fb.group({
    Email: new FormControl('',[Validators.required]),
    Password: new FormControl('',[Validators.required])

  });
  initialForm()
  {
    return this.loginForm.controls
  }

  closeDialog()
  {
    this.matDilogRef.close(this.loginForm.value)
  }
}
