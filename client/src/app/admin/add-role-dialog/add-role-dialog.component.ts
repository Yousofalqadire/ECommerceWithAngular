import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from '_services/admin.service';

@Component({
  selector: 'app-add-role-dialog',
  templateUrl: './add-role-dialog.component.html',
  styleUrls: ['./add-role-dialog.component.css']
})
export class AddRoleDialogComponent implements OnInit {

  constructor(private adminService:AdminService,
              private fb:FormBuilder,
              private matDialogRef:MatDialogRef<AddRoleDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data ) { }

  ngOnInit(): void {
    this.initalForm();
  }

  addRoleForm = this.fb.group({
    roleName:new FormControl('',[Validators.required])
  });

  initalForm()
  {
    return this.addRoleForm.controls;
  }
  closeDialog()
  {
    this.matDialogRef.close(this.addRoleForm.value);
  }
}
