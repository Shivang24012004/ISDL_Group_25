import { useDispatch } from 'react-redux';
import { useToast } from '@/hooks/use-toast';
import { grainyEffect, warmFilter, coolFilter, pencilSketch, cartoonify, contrastEnhancement, grayScale } from '@/redux/AsyncThunk';
import { setUserInfo } from '@/redux/userSlice';

export const handleFilterDispatch = async (dispatch, toast, filterThunk, file, apiKey) => {
    return dispatch(filterThunk({ file, apiKey }))
      .unwrap()
      .then((data) => {
        console.log(data);
        toast({ title: 'Filter applied successfully', type: 'success' });
        return data;
      })
      .catch((err) => {
        console.log(err);
        toast({ title: err, type: 'error' });
        throw err;
      });
  };