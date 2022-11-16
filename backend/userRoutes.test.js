const axios = require('axios')

// User login test case
describe("POST @ /auth/login", () => {
    it("Users should be able to login", async () => {
      try {
        const res = axios.post(
          "https://localhost:8000/auth/login",
          {
            username: "nirmith",
            password: "apple",
          },
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5pcm1pdGgiLCJpYXQiOjE2Njg2MTU4MTB9.q1HSgo5X7irLaSYWUIGVPyMfMJJLybiiwspMaarjKW8",
            },
          }
        );
  
        expect(res.status).toEqual(200);
      } catch (error) {
        console.log(error);
      }
    });
  });

  // User registration test
  describe("POST @ /auth/signup", () => {
    it("Admin should be able to create user logins", async () => {
      try {
        const res = axios.post(
          "https://localhost:8000/auth/signup",
          {
            "name": "Nirmith Akash (JWT) #3",
            "username": "nirmith",
            "password": "apple",
            "number": 5,
            "role": "Woker"
        },
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5pcm1pdGgiLCJpYXQiOjE2Njg2MTU4MTB9.q1HSgo5X7irLaSYWUIGVPyMfMJJLybiiwspMaarjKW8",
            },
          }
        );
  
        expect(res.status).toEqual(200);
      } catch (error) {
        console.log(error);
      }
    });
  });