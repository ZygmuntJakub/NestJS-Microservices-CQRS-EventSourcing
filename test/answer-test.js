const axios = require("axios");

async function auth(username, password = "1234") {
  const data = await axios.post("http://localhost:8080/auth", {
    username,
    password,
  });

  return data.data.accessToken;
}

async function vote(token, pollId, answers) {
  const data = await axios.post(
    `http://localhost:8080/answer/${pollId}`,
    {
      answers,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data;
}

async function update(token, pollId, numberOfParticipants = 100) {
  for (let i = 0; i < numberOfParticipants; i++) {
    await axios.put(
      `http://localhost:8080/poll/${pollId}`,
      {
        invitations: [{ userId: `${i}` }],
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }
}

async function main() {
  let token = await auth("admin");
  // await update(token, "1");
  token = await auth("participant-10");
  await vote(token, "1", [
    {
      questionId: "1",
      answerId: "2",
    },
  ]);
  console.timeEnd("vote");
}

console.time("vote");
main();
