
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const response = await axios.post('https://isdl-group-25.onrender.com/auth/signin', credentials);
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
    const response = await axios.post('https://isdl-group-25.onrender.com/auth/signup', credentials);
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
        const response = await fetch("https://isdl-group-25.onrender.com/grainyeffect", {
          method: "POST",
          body: formData,
        });
        console.log(response);
        if (response.ok) {
          const blob = await response.blob();
         return (URL.createObjectURL(blob));
       
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
        const response = await fetch("https://isdl-group-25.onrender.com/warmfilter", {
          method: "POST",
          body: formData,
        });
        console.log(response);
        if (response.ok) {
          const blob = await response.blob();
         return (URL.createObjectURL(blob));
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
        
        const response = await fetch("https://isdl-group-25.onrender.com/coolfilter", {
          method: "POST",
          body: formData,
        });
        console.log(response);
        if (response.ok) {
          const blob = await response.blob();
         return (URL.createObjectURL(blob));
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
        const response = await fetch("https://isdl-group-25.onrender.com/pencilsketch", {
          method: "POST",
          body: formData,
        });
        console.log(response);
        if (response.ok) {
          const blob = await response.blob();
         return (URL.createObjectURL(blob));
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
        const response = await fetch("https://isdl-group-25.onrender.com/cartoonify", {
          method: "POST",
          body: formData,
        });
        console.log(response);
        if (response.ok) {
          const blob = await response.blob();
         return (URL.createObjectURL(blob));
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
        const response = await fetch("https://isdl-group-25.onrender.com/contrastenhancement", {
          method: "POST",
          body: formData,
        });
        console.log(response);
        if (response.ok) {
          const blob = await response.blob();
         return (URL.createObjectURL(blob));
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
        const response = await fetch("https://isdl-group-25.onrender.com/grayscale", {
          method: "POST",
          body: formData,
        });
        console.log(response);
        if (response.ok) {
          const blob = await response.blob();
         return (URL.createObjectURL(blob));
        } else {
          return thunkAPI.rejectWithValue('Failed to upload and process the image');
        }
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

  export const saveFile = createAsyncThunk(
    'file/saveFile',
    async ({ userId, file, apiKey }, thunkAPI) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('apikey', apiKey);
      formData.append('user_id', userId);
  
      try {
        const response = await axios.post(`https://isdl-group-25.onrender.com/savefile?user_id=${userId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
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