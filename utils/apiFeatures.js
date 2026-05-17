class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    // queryString == req.query
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  // 1) Filtertion
  filter() {
    const queryStringObj = { ...this.queryString };
    const execludesFields = ['page', 'limit', 'sort', 'fields', 'keyword'];
    execludesFields.forEach((field) => delete queryStringObj[field]);
    // console.log(req.query);
    let queryStr = JSON.stringify(queryStringObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`); // "\b  \b" -> to tell that i want the exacte value for gte|gt ... the same word
    // g -> as if more than one value exist catch all of them not the only one}

    this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));

    return this; // return this ==> to let me make instance --> .filter().sort()... >>becouse filter is return the all object
  }

  // 3) Sorting
  sort() {
    if (this.queryString.sort) {
      // for sorting by more than one thing we must remove the ',' between them like => sort=price,-sold --> when i make mongooseQuery.sort(req.query.sort); ->> it sort by -> sort(price,-sold) but it must be like that -> sort(price -sold)
      // so we will split it in the ',' and join again with space
      // price,-sold =>[price , -sort] => price -sort
      const sortedBy = this.queryString.sort.split(',').join(' ');
      this.mongooseQuery = this.mongooseQuery.sort(sortedBy);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort('createdAt');
    }

    return this;
  }

  // 4) Fields Limiting
  limiting() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.mongooseQuery = this.mongooseQuery.select(fields);
    } else {
      this.mongooseQuery = this.mongooseQuery.select('-__v');
    }
    return this;
  }

  // 5) Searching
  search() {
    if (this.queryString.keyword) {
      console.log('req.query.keyword', this.queryString.keyword);
      const query = {};
      query.$or = [
        { title: { $regex: this.queryString.keyword, $options: 'i' } },
        { description: { $regex: this.queryString.keyword, $options: 'i' } },
      ];
      console.log('query', query);
      this.mongooseQuery = this.mongooseQuery.find(query);
    }
    return this;
  }

  // 2) Pagination
  pagination() {
    const page = this.queryString.page * 1 || 1; // * 1 => to convert it to number
    const limit = this.queryString.limit * 1 || 50;
    const skip = (page - 1) * limit;
    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);

    return this;
  }
}

module.exports = ApiFeatures;
