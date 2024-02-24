import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [HttpClientModule,FormsModule,CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{
  private http;
  public itemsList:any;
  public savedSudent:any;
  
  public student={
    studentId:null,
    name:null,
    email:null,
    status:"Active"
  }

  public selectedStudent={
    rowNumber:null,
    studentId:null,
    name:null,
    email:null,
    status:null
  }

  constructor(private httpCient:HttpClient){
    this.http=httpCient;
  }

  ngOnInit(): void {
    this.loadTable();
  }

  loadTable(){
    this.http.get("https://script.google.com/macros/s/AKfycbyoAV0Tz7VxCvr3FFrb3PFDe9jdCA24j6Hl92GU7FNmya-AKkN8ZMm29VUptiqrX0yFvg/exec").subscribe((data)=>{

      this.itemsList=data;
      console.log(data);
    })
  }

  createStudent(){
    console.log(this.student);
    let obj = {
      studentId:this.student.studentId,
      name:this.student.name,
      email:this.student.email,
      status:this.student.status
    }
    this.http.post("https://script.google.com/macros/s/AKfycbyoAV0Tz7VxCvr3FFrb3PFDe9jdCA24j6Hl92GU7FNmya-AKkN8ZMm29VUptiqrX0yFvg/exec",JSON.stringify(obj))
      .subscribe(data=>{
        
        this.savedSudent=data;
        console.log(data);
         this.clearStudent();
         this.loadTable();
      });
  }
  clearStudent(){
    this.student={
      studentId:null,
      name:null,
      email:null,
      status:"Active"
    };
  }

  deleteStudent(id:string){
    console.log(id);
    console.log(`https://script.google.com/macros/s/AKfycbyoAV0Tz7VxCvr3FFrb3PFDe9jdCA24j6Hl92GU7FNmya-AKkN8ZMm29VUptiqrX0yFvg/exec?del=true&id=${id}`);
    this.http.get(`https://script.google.com/macros/s/AKfycbyoAV0Tz7VxCvr3FFrb3PFDe9jdCA24j6Hl92GU7FNmya-AKkN8ZMm29VUptiqrX0yFvg/exec?del=true&id=${id}`).subscribe((data)=>{
      console.log(data);
    });
  }

  setSelectedStudent(rowNumber:any,studentId:any,name:any,email:any,status:any){
    this.selectedStudent.rowNumber=rowNumber;
    this.selectedStudent.name=name;
    this.selectedStudent.email=email;
    this.selectedStudent.status=status;
    this.selectedStudent.studentId=studentId;

    console.log(this.selectedStudent);
  }
  
  updateStudent(){
    console.log(`https://script.google.com/macros/s/AKfycbyoAV0Tz7VxCvr3FFrb3PFDe9jdCA24j6Hl92GU7FNmya-AKkN8ZMm29VUptiqrX0yFvg/exec?update=true&rowNumber=${this.selectedStudent.rowNumber}&name=${this.selectedStudent.name}&email=${this.selectedStudent.email}&status=${this.selectedStudent.status}&studentId=${this.selectedStudent.studentId}`);
    this.http.get(`https://script.google.com/macros/s/AKfycbyoAV0Tz7VxCvr3FFrb3PFDe9jdCA24j6Hl92GU7FNmya-AKkN8ZMm29VUptiqrX0yFvg/exec?update=true&rowNumber=${this.selectedStudent.rowNumber}&name=${this.selectedStudent.name}&email=${this.selectedStudent.email}&status=${this.selectedStudent.status}&studentId=${this.selectedStudent.studentId}`).subscribe((data)=>{
      console.log(data);
   
    this.loadTable();
    });
  }


}
