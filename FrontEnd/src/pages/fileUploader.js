 export default function convertToBase64(file){
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        

        fileReader.onload = () => {
            resolve(fileReader.result)
        }

        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}


export const onUpload =  async (e) => {
    console.log("upload")
 const t = await convertToBase64(e.target.files[0])
 console.log("hello")
 
return t;   
}

