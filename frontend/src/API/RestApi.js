import axios from "axios";


class RestService {

  fetchSignUp(formData){

    const config = {
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin' : '*'
      },
    };

    return  axios.post(
      "https://localhost:8000/auth/login",
      formData,
      config
      ).then(res => {
        const data = res;
        return data;
      }
    );
  };

  fetchSignIn(formData) {
    const config = {
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin' : '*'
      },
    };

    return  axios.post(
      "https://localhost:8000/auth/signup",
      formData,
      config
      ).then(res => {
        const data = res;
        return data;
      }
    );
  }

  resetPassword(formData) {
    const config = {
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin' : '*'
      }
    };

    const Data = {
      password: formData.password,
      newPassword: formData.newPassword
    }

    return  axios.put(
      `https://localhost:8000/auth/resetPassword/${formData.username}`,
      Data,
      config
      ).then(res => {
        const data = res;
        return data;
      }
    );
  }

  sendMsg(formData){
    const config = {
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin' : '*'
      }
    };
    return  axios.post(
      "https://localhost:8000/message/save",
      formData,
      config
      ).then(res => {
        const data = res;
        return data;
      }
    );
  }

  sendFile(fileUpload){
    const config = {
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin' : '*'
      }
    };
    console.log(fileUpload.selectedFile)

    const formData = new FormData();
     
      // Update the formData object
      formData.append(
        "image",
        fileUpload.selectedFile,
        fileUpload.selectedFile.name
      );

    return  axios.post(
      "https://localhost:8000/image/upload",
      formData,
      config
      ).then(res => {
        const data = res;
        return data;
      }
    );
  }

}

export default new RestService();
