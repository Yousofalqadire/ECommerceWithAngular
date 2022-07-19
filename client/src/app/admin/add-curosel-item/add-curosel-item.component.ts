import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AdminService } from '_services/admin.service';

@Component({
  selector: 'app-add-curosel-item',
  templateUrl: './add-curosel-item.component.html',
  styleUrls: ['./add-curosel-item.component.css']
})
export class AddCuroselItemComponent implements OnInit {

  constructor( private adminService:AdminService,private fb:FormBuilder) { }
addCurosel = this.fb.group({
  capaitionText: new FormControl('',[Validators.required]),
  photo: new FormControl('',Validators.required),
  Photo: new FormControl('', [Validators.required])
});
  ngOnInit(): void {
    this.initialForm();
  }

initialForm()
{
  return this.addCurosel.controls;
}

onFileChange(event)
{
   if(event.target.files.length > 0)
   {
     const file =  event.target.files[0];
     this.addCurosel.patchValue({Photo :file});
   }
}

addNewCurosel()
{
  const formData = new FormData();
  formData.append('CapaitionText',this.addCurosel.get('capaitionText').value);
  formData.append('Photo',this.addCurosel.get('Photo').value);
  this.adminService.addCurosel(formData).subscribe(res=>{
    console.log(res);
  })
}
}
