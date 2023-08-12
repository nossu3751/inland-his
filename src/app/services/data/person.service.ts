import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface GroupMap {
  [key:string]: string
}

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private personUrl = `${environment.apiUrl}/api/v1/persons`
  public groupMap:GroupMap = {
    "praise-team": "찬양팀",
    "welcome-team": "웰컴팀",
    "media-team": "미디어팀",
    "new-comer": "새신자",
    "campus-team": "캠퍼스팀",
    "cell-leader": "셀리더",
    "pastor": "목사님"
  }
  public profileImage = new BehaviorSubject<string>("assets/church-icons/no-profile.png");
  constructor(private http:HttpClient) { 

  }

  public getProfilePhoto(sub:any, profileImages:any){
    const noProfile = "assets/church-icons/no-profile.png"
    if (!sub || !profileImages) {
      return noProfile
    }
    if (!(sub in profileImages)){
      return noProfile
    }
    if (sub in profileImages){
      const profile = profileImages[sub]
      if (profile !== null){
        return profile
      }else{
        return noProfile
      }
    }
  }

  hasAdminRight(roles:any):boolean {
    if(roles.length == 0){
      return false
    }
    for(let role of roles){
      if (role.substring(1) in this.groupMap && role !== "new-comer") {
        return true
      }
    }
    return false
  }

  getKoreanGroupName(role:string){
    const roleEng = role.substring(1)
    if (roleEng in this.groupMap && roleEng !== "new-comer") {
      return this.groupMap[roleEng]
    }else if(roleEng.endsWith("/leader")){
      return "사역팀장"
    }else{
      return null
    }
  } 

  getKoreanGroupNamesStr(roles:string): string | null{
    let res:string = ""
    for (let i = 0; i < roles.length; i++){
      let roleKor = this.getKoreanGroupName(roles[i])
      if (roleKor !== null){
        res += roleKor + ", "
      }
    }
    res = res.trim()
    if(res.endsWith(",")){
      res = res.substring(0,res.length-1)
    }

    return res !== "" ? res: null;
  }

  getPerson(id:string):Observable<any>{
    return this.http.get(`${this.personUrl}/user?id=${id}`)
  }

  getPersons():Observable<any>{
    return this.http.get(`${this.personUrl}/`)
  }

  addPerson(formData:any): Observable<any>{
    console.log("form data", formData)
    const addPersonUrl = `${this.personUrl}/add`
    console.log(addPersonUrl);
    return this.http.post(addPersonUrl, formData)
  }

  updateProfileImage(imageUrl:string):void {
    this.profileImage.next(imageUrl)
  }
  
  uploadProfile(formData:any): Observable<any>{
    const profileUploadUrl = `${this.personUrl}/upload_profile`
    return this.http.post(profileUploadUrl, formData, {withCredentials:true})
  }

  getProfile():Observable<any> {
    const profileUrl = `${this.personUrl}/get_profile`
    return this.http.get(profileUrl,{withCredentials:true})
  }

  getGroups():Observable<any>{
    return this.http.get(`${this.personUrl}/groups/`)
  }

  getGroup(group_id:string):Observable<any>{
    return this.http.get(`${this.personUrl}/group/${group_id}`)
  }

  getGroupByPath(path:string):Observable<any>{
    return this.http.get(`${this.personUrl}/groups/?path=${path}`)
  }

  admitPerson(data:any):Observable<any>{
    return this.http.put(`${this.personUrl}/admit`, data)
  }

  admitAll(data:any):Observable<any>{
    return this.http.put(`${this.personUrl}/admit_all`, data)
  }

  getNotAdmitted():Observable<any>{
    return this.http.get(`${this.personUrl}/not_admitted`)
  }

  addToTeam(sub:string, teamPath:string):Observable<any> {
    return this.http.post(`${this.personUrl}/add_to_team`, {
      "sub":sub,
      "team_path":teamPath
    })
  }

  removeFromTeam(sub:string, teamPath:string):Observable<any> {
    return this.http.post(`${this.personUrl}/remove_from_team`,{
      "sub":sub, 
      "team_path":teamPath
    })
  }
  // getProfile(): string|null {
  //   this.refreshProfile().subscribe({
  //     "next":(data)=>{
  //       return data.data
  //     },
  //     "error":()
  //   })
  //   const profileUrl = `${this.personUrl}/get_profile`
  //   return this.http.get(profileUrl,{withCredentials:true})
  // }
}
