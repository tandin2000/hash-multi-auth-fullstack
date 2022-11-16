const axios = require('axios')

describe("POST @ /message/save endpoint", () => {
    it("Wokers should be able to save messeges", async () => {
      try {
        const res = axios.post(
          "https://localhost:8000/message/save",
          {
            message: "Worker saving messeges",
            userId: "6368c449408089790aec9837",
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