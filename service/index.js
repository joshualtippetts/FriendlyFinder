const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();

const authCookieName = 'token';

let users = [];
let scores = [];

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());

app.use(cookieParser());

app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.post('/auth/create', async (req, res) => {
  if (await findUser('email', req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.email, req.body.password);

    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

apiRouter.post('/auth/login', async (req, res) => {
  const user = await findUser('email', req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      setAuthCookie(res, user.token);
      res.send({ email: user.email });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    delete user.token;
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

apiRouter.get('/scores', verifyAuth, (_req, res) => {
  res.send(scores);
});

apiRouter.post('/score', verifyAuth, (req, res) => {
  scores = updateScores(req.body);
  res.send(scores);
});

app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

function updateScores(newScore) {

  scores = scores.filter(
    (s) => !(s.player === newScore.player && s.score > newScore.score)
  );

  let inserted = false;

  for (let i = 0; i < scores.length; i++) {
    if (newScore.score < scores[i].score) {
      scores.splice(i, 0, newScore);
      inserted = true;
      break;
    }
  }

  if (!inserted) {
    scores.push(newScore);
  }

  if (scores.length > 5) {
    scores.length = 5;
  }

  return scores;
}

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  users.push(user);

  return user;
}

async function findUser(field, value) {
  if (!value) return null;

  return users.find((u) => u[field] === value);
}

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

/*---------Midnight reset of scores---------*/
function scheduleMidnightReset() {
  const now = new Date();

  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0); 

  const timeUntilMidnight = midnight - now;

  setTimeout(() => {
    scores = [];
    console.log("Scores reset at midnight");

    setInterval(() => {
      scores = [];
      console.log("Scores reset at midnight");
    }, 1000 * 60 * 60 * 24);

  }, timeUntilMidnight);
}
scheduleMidnightReset();

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
