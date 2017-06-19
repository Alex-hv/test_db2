import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

interface IItem{
  id:number;
  task:string;
}

export interface IList extends Array<IItem>{}

@Injectable()
export class AppService {
  items:IList=[{id:1,task:'Task #1'}];
  newItem='';
  $items = new Subject<IList>();

  updateItems() {
    this.$items.next(this.items);
  }

  getItems(): Observable<IList> {
    return this.$items.asObservable();
  }

  add(newItem){
    this.items.push({id:this.getNextId(),task:newItem});
    this.updateItems()
  }

  sort(type){
    if(type=='number')this.items.sort(this.compareIds)
    if(type=='name')this.items.sort(this.compareNames)
    this.updateItems()
  }

  compareIds(firstElem,secondElem){
    return firstElem.id - secondElem.id
  }

  compareNames(firstElem,secondElem){
    if(firstElem.task===secondElem.task)return 0;
    let i = 0
    do{
      if(firstElem.task.charCodeAt(i)==secondElem.task.charCodeAt(i)){
        i++;
        if(!firstElem.task.charCodeAt(i))return -1;
        if(!secondElem.task.charCodeAt(i))return 1;
      }
      else {
        return firstElem.task.charCodeAt(i)-secondElem.task.charCodeAt(i);
      }
    }while(i<firstElem.task.length&&i<secondElem.task.length)
  }

  getNextId():number{
    if(!this.items.length)return 1
    let arr=[]
    this.items.forEach((item) => {
      arr[item.id]=item.task
    })
    let count = arr.length
    for(let i=1;i<=count;i++){
      if(!arr[i])arr[i]=null
    }
    return arr.indexOf(null)
  }

  delete(item){
    this.items.splice(this.items.indexOf(item),1)
    this.updateItems()
  }
}
