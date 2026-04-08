const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();
const DB = require('./database.js');
const { playerProxy } = require('./playerProxy.js');


const authCookieName = 'token';

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.use(cookieParser());

app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.post('/auth/create', async (req, res) => {
  if (await findUser('username', req.body.username)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.username, req.body.password);

    setAuthCookie(res, user.token);
    res.send({ username: user.username });
  }
});

apiRouter.post('/auth/login', async (req, res) => {
  const user = await findUser('username', req.body.username);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      await DB.updateUser(user);
      setAuthCookie(res, user.token);
      res.send({ username: user.username });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    await DB.updateUserRemoveAuth(user);
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

apiRouter.get('/scores', verifyAuth, async (_req, res) => {
  const scores = await DB.getHighScores();
  res.send(scores);
});

apiRouter.post('/score', verifyAuth, async (req, res) => {
  const scores = await updateScores(req.body);
  res.send(scores);
});

app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

async function updateScores(newScore) {
  await DB.addScore(newScore);
  return DB.getHighScores();
}

async function createUser(userName, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    username: userName,
    password: passwordHash,
    token: uuid.v4(),
  };
  await DB.addUser(user);

  return user;
}

async function findUser(field, value) {
  if (!value) return null;

  if (field === 'token') {
    return DB.getUserByToken(value);
  }
  return DB.getUser(value);
}

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: false,
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

  setTimeout(async () => {
    await DB.resetHighScores();
    console.log("Scores reset at midnight");

    setInterval(async () => {
      await DB.resetHighScores();
      console.log("Scores reset at midnight");
    }, 1000 * 60 * 60 * 24);

  }, timeUntilMidnight);
}
scheduleMidnightReset();

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

playerProxy(httpService);
