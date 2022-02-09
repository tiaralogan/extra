import { Component } from '@angular/core';
import  * as xml2js from 'xml2js';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'read-xml-angular8';
  public xmlItems: any;
  public data:any = []

  constructor(private _http: HttpClient, private http: HttpClient) { 
    this.loadXML(); 
    //this.getData()
  }

// *************************************************************************************************************
// https://www.c-sharpcorner.com/article/reading-xml-file-in-angular-8/

  loadXML() {
    this._http.get('/assets/users.xml',
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'text/xml')
          .append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT')
          .append('Access-Control-Allow-Origin', '*')
          .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),
        responseType: 'text'
      })
      .subscribe((data) => {
        this.parseXML(data)
          .then((data) => {
            this.xmlItems = data;
          });
      });
  }
  
  parseXML(data: string) {
    return new Promise(resolve => {
      var k: string | number,
        arr: any = [],
        parser = new xml2js.Parser(
          {
            trim: true,
            explicitArray: true
          });
      parser.parseString(data, function (err: any, result: { Employee: any; }) {
        var obj = result.Employee;
        for (k in obj.emp) {
          var item = obj.emp[k];
          arr.push({
            id: item.id[0],
            name: item.name[0],
            gender: item.gender[0],
            mobile: item.mobile[0]
          });
        }
        resolve(arr);
      });
    });
  }

  // localhost 404 Not Found Solution
    // npm install xml2js --save
    // npm install @types/xml2js --save-dev
  // *************************************************************************************************************




// https://howtocreateapps.com/angular-tutorial-json/





  getData(){
    const url ='https://jsonplaceholder.typicode.com/photos?albumId=1'
    this.http.get(url).subscribe((res)=>{
      this.data = res
      console.log(this.data)
    })
  }





}