
import { HeadersObject,FileOrFolder  } from '../interfaces/blank';

const OAuth_token: string = import.meta.env.VITE_OAUTH_TOKEN;

const headers: HeadersObject = new Headers({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: OAuth_token,
});

export async function  fetchFolderContents(){
    const url:string="https://cloud-api.yandex.net/v1/disk/resources?path=/CaseLabDocuments"
    try{
    let response=await fetch(url,{
        method:'GET',
        headers: {
            Authorization: `OAuth ${OAuth_token}`,
          },
         
    })
    if(!response.ok){
       throw new Error(`Ошибка: ${response.status}`)     
    }
    const data = await response.json() as { _embedded: { items: FileOrFolder[] } };
    const contents:FileOrFolder[]=data._embedded.items

    return contents
    

}
catch(err){
    console.error('Ошибка при получении содержимого папки "CaseLab":', err);
}
} 

