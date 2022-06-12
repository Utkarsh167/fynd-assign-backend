var User = require('../model/user.model')
const crypto = require('crypto');
var passport = require('passport')
var constants = require('../../common/constant')
var jwt = require('jsonwebtoken')
const { user } = require('../controller/user.controller');
const { resolveSoa } = require('dns');
var Movie = require('../model/movie.model')

class UserService {

  async logout(req, res) {
    await User.updateMany({}, { $pull: { accessToken: req.headers.tokenId } }, { multi: true })
    res.send(true)
  }

  async listMovies(req, res, next) {
    const limit = parseInt(req.body.limit);
    const pageNo = parseInt(req.body.page);
    const genre = req.body.genre;
    try {
      const searchQuery = req.body.search;
      let aggPipe = [];

      let match2 = {};
      if (searchQuery != null && searchQuery != '') {
        match2["$text"] = { $search: searchQuery }
        aggPipe.push({ "$match": match2 });
      }
      
      let match1 = {};
      if (genre && genre.length > 0) {
        match1["$and"] = [
          { "genre": { $exists: true } },
          { "genre": { $elemMatch: { $in: genre } } },
        ];
        aggPipe.push({ "$match": match1 });
      }

     

      let sort = { director: 1, '99popularity': -1, name: 1 };
      aggPipe.push({ "$sort": sort });

      if (pageNo && limit) {
        let skip = (pageNo - 1) * limit;
        let facet =  {
          "totalData": [
            { "$skip": skip },
            { "$limit": limit }
          ],
          "totalCount": [
            { "$count": "count" }
          ]
         
        }
        aggPipe.push({"$facet":facet});
      }
    
      const result = await Movie.aggregate(aggPipe);
      res.status(200).json({
        msg: result,
        status: 'success'
      });
    }
    catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = UserService