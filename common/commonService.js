
// const schedule = require('node-schedule');
// const PublisherService = require('../app/services/publisher.service');
// const VendorService = require('../app/services/vendor.service');
const ActivityLog = require('../app/model/activity-log.model')
const User = require('../app/model/user.model')
const Genre = require('../app/model/genre.model');
const Movie = require('../app/model/movie.model');
const { genreArray } = require('./constant');
const { movieArray } = require('./constant');
// const genreArray = require('./constant').genreArray;
// var vendorService = new VendorService()
// var publisherService = new PublisherService()
class CommonService {
  //      sendVendorNotificationEvent() {
  //         const job = schedule.scheduleJob('5 0 * * 1', function(){
  //             vendorService.getNotificationForWeeklyPerformance();
  //             publisherService.getNotificationForWeeklyPerformance();
  //           });

  //           schedule.scheduleJob('1 * * * *', function(){
  //             vendorService.sendVendorEmailOnLowBalance();
  //           });
  //     }

  async checkAndAddAdmin() {
    var userExists = await User.findOne({
      userType: 'admin'
    })

    // let genreArray = genreArray;
    if (!userExists) {
      let user = new User()
      let hashObj = user.setPassword('Admin@123');
      user.salt = hashObj.salt
      user.hash = hashObj.hash
      user.password = hashObj.hash
      user.email = 'admin@fynd.com'
      user.firstName = 'Admin'
      user.lastName = ''
      user.userType = 'admin'
      let userCreated = await User.create(user);
      if (userCreated) {
        let genreExist = await Genre.findOne({});
        if (!genreExist) {

          await Promise.all(genreArray.map(async (element) => {
            let genre = new Genre()
            genre.name = element.trim();
            genre.type = 'present';
            genre.addedBy = userCreated._id;

          }));
          return true;
        } else {
          return false;
        }
      }
      else return false;
    } else {
      let genreExist = await Genre.findOne({});
      if (!genreExist) {
        await Promise.all(genreArray.map(async (element) => {
          let genre = new Genre()
          genre.name = element;
          genre.type = 'present';
          genre.addedBy = userExists._id;
          let genreCreated = await Genre.create(genre);

        }));
        return true;
      } else {
        return false;
      }
    }
  }


  async checkAndAddMovies() {
    var movieExists = await Movie.findOne({
    })

    // let genreArray = genreArray;
    if (!movieExists) {
      let allPromises = await Promise.all(movieArray.map(async (element) => {
        let movie = new Movie()
        movie.name = element.name.trim();
        movie.director = element.director.trim();
        movie['99popularity'] = element['99popularity'];
        movie.imdb_score = element.imdb_score;
        movie.genre = element.genre.map(s => s.trim());
        let movieCreated = await Movie.create(movie);
      }));
      if (allPromises) {
        return true;
      } else {
        return false;
      }
    }
    else return false;
  }

  async addActivityLogData(activity, movieId, type, from, description) {
    let activityLog = new ActivityLog()
    activityLog.activity = activity;
    activityLog.activityType = type;
    activityLog.movieId = movieId;
    activityLog.from = from;
    activityLog.description = description;
    var activityLogData = await ActivityLog.create(activityLog);
    if (activityLogData) return true;
    else return false;
  }
}

module.exports = CommonService