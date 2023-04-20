const Follow = require("../services/follow.services");

async function followUser(req, res) {
  try {
    const { follower, following } = req.body;
    const newFollow = await Follow.followUser(follower, following);
    res.status(200).json(newFollow);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const getFollowers = (req, res) => {
  const { userId } = req.params;
  Follow.findFollowers(userId)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

const getFollowings = (req, res) => {
  const { userId } = req.params;
  Follow.findFollowings(userId)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

module.exports = {
  followUser,
  getFollowers,
  getFollowings,
};
