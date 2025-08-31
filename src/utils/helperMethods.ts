export function isUrlValid(url:string){
    try{
        new URL(url)
        return true
    } catch(err){
        console.log('Invalid URL: ', err);
        return false
    }
}