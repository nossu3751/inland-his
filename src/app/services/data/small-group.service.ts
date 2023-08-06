import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SmallGroupService {

  smallGroupUrl = `${environment.apiUrl}/api/v1/small-groups`
  constructor(private http:HttpClient) { }



  getSmallGroupIdName(): Observable<any> {
    return this.http.get(`${this.smallGroupUrl}/idName`)
  }

  createSmallGroup(smallGroupData:any): Observable<any> {
    return this.http.post(`${this.smallGroupUrl}/create`, smallGroupData)
  }

  updateSmallGroupMembers(smallGroupData:any): Observable<any> {
    console.log("inside update smallgroup ", smallGroupData)
    return this.http.put(`${this.smallGroupUrl}/update_group_members`, smallGroupData)
  }

  getMembers():Observable<any> {
    return this.http.get(`${this.smallGroupUrl}/members`)
  }

  getMembersBySearchStr(search:string):Observable<any> {
    return this.http.get(`${this.smallGroupUrl}/members/?search=${search}`).pipe(
      catchError(error => of({error: error, data: []}))
    )
  }

  public getProfilePhoto(memberId:any, smallGroupProfiles:any){
    const noProfile = "assets/church-icons/no-profile.png"
    const memberIdNum = Number(memberId)
    if (!memberId || !smallGroupProfiles) {
      return noProfile
    }
    if (!(memberId in smallGroupProfiles) && !(memberIdNum in smallGroupProfiles)){
      return noProfile
    }
    if (memberId in smallGroupProfiles){
      const profile = smallGroupProfiles[memberId]
      if (profile !== null){
        return profile
      }else{
        return noProfile
      }
    }
    if (memberIdNum  in smallGroupProfiles){
      const profile = smallGroupProfiles[memberIdNum]
      if (profile !== null){
        return profile
      }else{
        return noProfile
      }
    }
  }

  public getMemberSmallGroupAndRoom(memberGroupId:any, smallGroupInfo:any){
    let resInfo = {smallGroupName:"", smallGroupRoom:""}
    let smallGroup = smallGroupInfo.filter((smallGroup:any)=>{
      return Number(smallGroup.id) == Number(memberGroupId)
    })

    if (smallGroup.length > 0){
      const name = smallGroup[0]["name"]
      const room = smallGroup[0]["room"]
      resInfo.smallGroupName = name
      resInfo.smallGroupRoom = room
    }
    return resInfo
  }

  getSmallGroupByName(name:string):Observable<any> {
    return this.http.get(`${this.smallGroupUrl}/search?name=${name}`)
  }

  getSmallGroupById(id:number):Observable<any> {
    return this.http.get(`${this.smallGroupUrl}/search?id=${id}`)
  }

  getMySmallGroup():Observable<any> {
    return this.http.get(`${this.smallGroupUrl}/my_small_group`, {withCredentials:true})
  }

  getSmallGroups():Observable<any> {
    return this.http.get(`${this.smallGroupUrl}`)
  }

  getSmallGroupsNoMembers():Observable<any> {
    return this.http.get(`${this.smallGroupUrl}/no_members`)
  }

  getMemberContacts():Observable<any>{
    return this.http.get(`${this.smallGroupUrl}/contacts`)
  }

  // updateSmallGroup(updateData:any): Observable<any> {
  //   return this.http.put
  // }
}
