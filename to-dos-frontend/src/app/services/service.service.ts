import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../global';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private httpclient: HttpClient) { }

  taskPost(data:any){
   
    return this.httpclient.post<any[]>(`${GlobalConstants.CONNECT_BASE_URL_LOCAL}/task`,data);
  }

  getCurrentuserTasks(user_id:any){
    // const data = {
    //   user_id : user_id
    // }
    return this.httpclient.get<any>(`${GlobalConstants.CONNECT_BASE_URL_LOCAL}/user_tasks/${user_id}`);
  }
  getallTasks(user_id:any){
    return this.httpclient.get<any>(`${GlobalConstants.CONNECT_BASE_URL_LOCAL}/tasks`)
  }

  deleteTask(id:any){
    return this.httpclient.delete<any>(`${GlobalConstants.CONNECT_BASE_URL_LOCAL}/delete_task/${id}`)
  }

  updateTask(id:any,data:any){
    return this.httpclient.patch<any>(`${GlobalConstants.CONNECT_BASE_URL_LOCAL}/update_task/${id}`,data)
  }
}
