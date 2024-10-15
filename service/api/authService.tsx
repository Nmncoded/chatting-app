import { resetAndNavigate } from '@/utils/LibraryHelpers';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import axios from 'axios';
import { BASE_URL } from '../config';
import { tokenStorage } from '../storage';
import { useAuthStore } from '../authStore';
import { Alert } from 'react-native';



GoogleSignin.configure({
 webClientId: '618767418010-mnaibg76i54slfa8o58dakg354irp1kf.apps.googleusercontent.com',
 forceCodeForRefreshToken: true,
 offlineAccess: false,
 iosClientId: '618767418010-1kgchjbbdl40ubed4uck7voqeof7hekj.apps.googleusercontent.com',
 
})




export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signOut();
    console.log('BEFORE SIGNIN')
    const res = await GoogleSignin.signIn();
    console.log('AFTER SIGNIN',res)

    // if(!res){
    //   resetAndNavigate('/(auth)/signup')
    // }

    const apiRes = await axios.post(`${BASE_URL}/oauth/login`, {id_token: res?.data?.idToken});

    const {tokens, user} = apiRes.data;
    tokenStorage.set('accessToken', tokens.access_token);
    tokenStorage.set('refreshToken', tokens.refresh_token);

    const {setUser} = useAuthStore.getState();
    setUser(user);
    resetAndNavigate('/(home)/home');

    return ;
  } catch (error: any) {
    console.log("signInWithGoogle authservice ERROR",error.response);
    if(error.response.status === 400){
      resetAndNavigate('/(auth)/signup')
    }
  }
}

export const signUpWithGoogle = async (data:any) => {
  try {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    await GoogleSignin.signOut();
    // console.log('BEFORE signup')
    const res = await GoogleSignin.signIn();
    // console.log('AFTER signup', res)

    // Check if idToken is available
    if (!res.data?.idToken) {
      throw new Error('ID Token is null. Please check your configuration.');
    }

    const URL = `${BASE_URL}/oauth/login`;
    const apiRes = await axios.post(URL, {id_token: res?.data?.idToken, ...data});

    console.log("apiRes  :-  ",apiRes);

    const {tokens, user} = apiRes.data;
    tokenStorage.set('accessToken', tokens.access_token);
    tokenStorage.set('refreshToken', tokens.refresh_token);

    const {setUser} = useAuthStore.getState();
    setUser(user);
    resetAndNavigate('/(home)/home');

    return ;
  } catch (error: any) {
    console.log("signUpWithGoogle ERROR",error);
  }
}


export const checkUsername = async(username: string) => {
  try {
    const URL = `${BASE_URL}/oauth/check-username`;
    // console.log('checkUsername inside auth service-1',URL);
    const apiRes = await axios.post(URL,{username});
    // console.log('checkUsername inside auth service',apiRes?.data);
    return apiRes?.data?.available
  } catch (error) {
    console.log("checkUsername ERROR",error)
    return false;
  }
}

// export const checkUsername = async (username: string) => {
//   try {
//     const URL = `${BASE_URL}/oauth/check-username`;
//     console.log('checkUsername inside auth service-1', URL);

//     const response = await fetch(URL, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ username }),
//     });

//     if (!response.ok) {
//       throw new Error(`Error: ${response.status}`);
//     }

//     const apiRes = await response.json();
//     console.log('checkUsername inside auth service', apiRes);

//     // You can handle the response here
//     Alert.alert('Username Available', JSON.stringify(apiRes));

//     return apiRes?.available || true;
//   } catch (error) {
//     console.log("checkUsername ERROR", error);
//     return false;
//   }
// };
