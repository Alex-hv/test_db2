import { Component } from '@angular/core';
import { AppService } from './app.service';
import { IList } from './app.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AppService]
})
export class AppComponent {
  constructor(private service: AppService){}
  newItem='';
  items:IList;

  add(){
    this.service.add(this.newItem);
    this.newItem='';
    console.log(this.items)
  }

  sort(type){
    this.service.sort(type)
    console.log(this.items)
  }

  delete(item){
    this.service.delete(item)
    console.log(this.items)
  }

  ngOnInit(){
    this.service.getItems().subscribe(
      (items)=>{this.items=items}
    )
    this.service.updateItems()
  }

}
