module.exports = {
    bcryptConstants:{
        saltRounds :10
    },

    ses: {
        fromEmail: "smtp.us-west-2.amazonaws.com",
      },

      tokenConstant:{
        value:85
      },

      serverUrl:'http://localhost:4200/#/',
     //serverUrl:'http://44.241.233.157:8080/#'

     adTypes:{
       SIDEBANNER: 'side_banner',
       TOPBANNER: 'top_banner',
       SIDEVIDEO: 'side_video',
       TOPVIDEO: 'top_video'
     },

     timeFrame:{
      NOW: 'Now',
      INTHIRTYDAYS: 'Within 30 days',
      INNINTYDAYS: 'Within 90 days',
      BEYONDNINETYDAYS: 'Beyond 90 days',
      ANYTIME: 'Anytime'
     },

     location:{
      TEN_MILES: 'Within 10 miles',
      THIRTY_MILES: 'Within 30 miles',
      FIFTY_MILES: 'Within 50 miles',
      ANYWHERE: 'Anywhere',
     },

     interest:{
      INTRESTED: 'Interested',
      WANTED: 'Wanted',
      NEEDED: 'Needed'
     },
      
     genreArray:[ "Comedy",
     "Fantasy",
     "Crime",
     "Drama",
     "Music",
     "Adventure",
     "History",
     "Thriller",
     "Animation",
     "Family",
     "Mystery",
     "Biography",
     "Action",
     "Film-Noir",
     "Romance",
     "Sci-Fi",
     "War",
     "Western",
     "Horror",
     "Musical",
     "Sport"]
}