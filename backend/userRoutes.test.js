const axios = require('axios')

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
              authorization:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5pcm1pdGgiLCJpYXQiOjE2Njg2MTIxOTZ9.1YwhJOAB4xTecgmmv-u0yFxZdQNKHL1jsil1IZV2gYw",
            },
          }
        );
  
        expect(res.status).toEqual(200);
      } catch (error) {
        console.log(error);
      }
    });
  });