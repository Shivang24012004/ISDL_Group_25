import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const BACKEND_URL = import.meta.env.VITE_APP_FOO;



export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const response = await axios.post(`${BACKEND_URL}auth/signin`, credentials);
    console.log(response.data);
    if(response.data.success === 'false') {
      return thunkAPI.rejectWithValue (response.data.message);
    }

    return response.data;
    
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});


export const signup = createAsyncThunk('auth/signup', async (credentials, thunkAPI) => {
  try {
    const response = await axios.post(`${BACKEND_URL}auth/signup`, credentials);
    console.log(response.data);
    if (response.data.success === false) {
      return thunkAPI.rejectWithValue(response.data.message);
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const grainyEffect = createAsyncThunk(
    'file/uploadAndProcessGrainyEffect',
    async ({file,apiKey}, thunkAPI) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('apikey', apiKey);
      
  
      try {
        const response = await fetch(`${BACKEND_URL}grainyeffect`, {
          method: "POST",
          body: formData,
        });
        console.log(response);
        if (response.ok) {
          const blob = await response.blob();
          return blob;
       
        } else {
          return thunkAPI.rejectWithValue('Failed to upload and process the image');
        }
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

  export const warmFilter = createAsyncThunk(
    'file/uploadAndProcessPencilSketch',
    async ({file,apiKey}, thunkAPI) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('apikey', apiKey);
      try {
        const response = await fetch(`${BACKEND_URL}warmfilter`, {
          method: "POST",
          body: formData,
        });
        console.log(response);
        if (response.ok) {
          const blob = await response.blob();
        return blob;
        }
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

  
  export const coolFilter = createAsyncThunk(
    'file/uploadAndProcessPencilSketch',
    async ({file,apiKey}, thunkAPI) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('apikey', apiKey);
  
      console.log(formData)
      try {
        
        const response = await fetch(`${BACKEND_URL}coolfilter`, {
          method: "POST",
          body: formData,
        });
        console.log(response);
        if (response.ok) {
          const blob = await response.blob();
        return blob;
        } else {
          return thunkAPI.rejectWithValue('Failed to upload and process the image');
        }
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

  export const pencilSketch = createAsyncThunk(
    'file/uploadAndProcessPencilSketch',
    async ({file,apiKey}, thunkAPI) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('apikey', apiKey);
  
      try {
        const response = await fetch(`${BACKEND_URL}pencilsketch`, {
          method: "POST",
          body: formData,
        });
        console.log(response);
        if (response.ok) {
          const blob = await response.blob();
          return blob;
        } else {
          return thunkAPI.rejectWithValue('Failed to upload and process the image');
        }
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );


  export const cartoonify = createAsyncThunk(
    'file/uploadAndProcessCartoonify',
    async ({file,apiKey}, thunkAPI) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('apikey', apiKey);
  
      try {
        const response = await fetch(`${BACKEND_URL}cartoonify`, {
          method: "POST",
          body: formData,
        });
        console.log(response);
        if (response.ok) {
          const blob = await response.blob();
        return blob;
        } else {
          return thunkAPI.rejectWithValue('Failed to upload and process the image');
        }
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

 export const contrastEnhancement = createAsyncThunk(
    'file/uploadAndProcessContrastEnhancement',
    async ({file,apiKey}, thunkAPI) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('apikey', apiKey);
  
      try {
        const response = await fetch(`${BACKEND_URL}contrastenhancement`, {
          method: "POST",
          body: formData,
        });
        console.log(response);
        if (response.ok) {
          const blob = await response.blob();
          return blob;
        } else {
          return thunkAPI.rejectWithValue('Failed to upload and process the image');
        }
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

export const grayScale = createAsyncThunk(
    'file/uploadAndProcessGrayScale',
    async ({file,apiKey}, thunkAPI) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('apikey', apiKey);
  
      try {
        const response = await fetch(`${BACKEND_URL}grayscale`, {
          method: "POST",
          body: formData,
        });
        console.log(response);
        if (response.ok) {
          const blob = await response.blob();
          return blob;
        } else {
          return thunkAPI.rejectWithValue('Failed to upload and process the image');
        }
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

export const hdrEffect = createAsyncThunk(
    'file/uploadAndProcessHDREffect',
    async ({file,apiKey}, thunkAPI) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('apikey', apiKey);
  
      try {
        const response = await fetch(`${BACKEND_URL}hdreffect`, {
          method: "POST",
          body: formData,
        });
        console.log(response);
        if (response.ok) {
          const blob = await response.blob();
          return blob;
        } else {
          return thunkAPI.rejectWithValue('Failed to upload and process the image');
        }
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

  export const gothamEffect = createAsyncThunk(
    'file/uploadAndProcessGothamEffect',
    async ({file,apiKey}, thunkAPI) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('apikey', apiKey);
  
      try {
        const response = await fetch(`${BACKEND_URL}gotham`, {
          method: "POST",
          body: formData,
        });
        console.log(response);
        if (response.ok) {
          const blob = await response.blob();
          return blob;
        } else {
          return thunkAPI.rejectWithValue('Failed to upload and process the image');
        }
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
  
  
  // export const gothamEffect = createAsyncThunk(
  //   'file/uploadAndProcessGothamEffect',
  //   async ({ file, apiKey }, thunkAPI) => {
  //     const formData = new FormData();
  //     formData.append('file', file);
  //     formData.append('apikey', apiKey);
  
  //     try {
  //       const response = await axios.post(`${BACKEND_URL}gotham`, formData, {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         }
  //         // If your backend requires credentials like cookies or HTTP auth
  //         //withCredentials: true,
  //       });
  
  //       // return response.data; // Adjust according to your backend response
  //       if(response.ok) {
  //         const blob=await response.blob()
  //         return blob;
  //       } else {
  //         return thunkAPI.rejectWithValue(error.message)
  //       }
  //     } catch (error) {
  //       console.error('Gotham effect error:', error);
  //       return thunkAPI.rejectWithValue(error.response?.data || error.message);
  //     }
  //   }
  // );

  export const sepiaEffect = createAsyncThunk(
    'file/uploadAndProcessSepiaEffect',
    async ({file,apiKey}, thunkAPI) => {
      console.log(file , apiKey )
      const formData = new FormData();
      formData.append('file', file);
      formData.append('apikey', apiKey);
  
      try {
        const response = await fetch(`${BACKEND_URL}sepia`, {
          method: "POST",
          body: formData,
        });
        console.log(response);
        if (response.ok) {
          const blob = await response.blob();
          return blob;
        } else {
          return thunkAPI.rejectWithValue('Failed to upload and process the image');
        }
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

  export const saveImage = createAsyncThunk(
    'file/saveImage',
    async ({ userId, file, apiKey }, thunkAPI) => {
      console.log(userId, file, apiKey);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('apikey', apiKey);
      formData.append('user_id', userId);
  
      try {
        const response = await axios.post(`${BACKEND_URL}savefile?user_id=${userId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response);
  
        if (response.status === 200) {
          return response.data.access_url;
        } else {
          return thunkAPI.rejectWithValue('Failed to save the file');
        }
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

  export const getImages = createAsyncThunk(
    'file/getImages',
    async ({userId,apiKey}, thunkAPI) => {
      try {
        const response = await axios.get(`${BACKEND_URL}getallimages?user_id=${userId}`);
        console.log(response);
  
        if (response.data.message.length !== 0) {
          return response.data.message;
        } else {
          return thunkAPI.rejectWithValue('Failed to get images');
        }
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

  export const deleteImage = createAsyncThunk(
    'file/deleteImage',
    async ({ userId, file_id }, thunkAPI) => {
      try {
        const response = await axios.delete(`${BACKEND_URL}deleteimage?user_id=${userId}&file_id=${file_id}`);
        console.log(response);
  
        if (response.status === 200) {
          return file_id;
        } else {
          return thunkAPI.rejectWithValue('Failed to delete the file');
        }
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
