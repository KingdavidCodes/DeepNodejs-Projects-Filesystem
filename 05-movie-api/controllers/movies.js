const mongoose = require('mongoose');
const Movies = require('../models/movies');


const getAllMoviesStatic = async (req, res) => {
  const movies = await Movies
    .find({})
    .select('title rating')
    .skip(1)
    .limit(10)

    res.status(200).json({nbHits: movies.length, movies });
}


const getMovies = async (req, res) => {
  const { 
      genre, 
      title, 
      release_date, 
      director,
      actor,
      number_filter,
      language,
      country,
      box_office,
      sort,
      fields
    } = req.query;
    const queryCollection = { };

  function searchFilter(key, value){
    if(value){
        queryCollection[key] = { $regex: value, $options: 'i'};
    }
  }

  // Title
  searchFilter('title', title);
  // Genre
  searchFilter('genre', genre);
  // Director
  searchFilter('director', director);
  //Actor
  searchFilter('actor', actor);
  //Language
  searchFilter('language', language);
  //country
  searchFilter('country', country);
  //box_office
  searchFilter('box_office', box_office);


  //Rating & Duration
  if(number_filter){
    const rateOperators = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    }
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = number_filter.replace(
      regEx,
      (match) => `-${rateOperators[match]}-`
    );

    const options = ['rating', 'duration']

    filters = filters.split(',').forEach((filter) => {
      const[field, operator, value] = filter.split('-');
      if (options.includes(field)) {
        queryCollection[field] = { [operator]: Number(value) };
      }
    });
  }
  


  // * MAIN
  let result = Movies.find(queryCollection);

  // Release date by year $gte 2005
  if(release_date){
    // !Filter the release date between $gte and $lte
    const sort = release_date.split(','); //I have 2 array now
    queryCollection.release_date = {
      $gte: new Date(sort[0]).toISOString(), 
      $lt: new Date(sort[1]).toISOString()
    }
    result = Movies.find(queryCollection).sort('release_date');
  }

  // Sorting List
  if(sort){
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  }else {
    result = result.sort('release_date');
    // result = result.sort('-release_date');
  }

  // Selecting diffrent keys only
  if(fields){
    const fieldList = fields.split(',').join(' ');
    result = result.select(fieldList);
  }

  // Pagenation
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit; //skiping 0 data by default
  
  // !How first page is gotten 
  // page=1 skip = (1-1) * 0 
  // result.skip(0).limit(10); so we are not skipping anything only limiting 

  // Skip the first values written there 
  // limit the amount of data coming in default value 10
  result = result.skip(skip).limit(limit);

  console.log(queryCollection);
  let data = await result;
  res.status(200).json({
    nbHits: data.length,
    data
  });
};



module.exports = {
  getMovies,
  getAllMoviesStatic
};
