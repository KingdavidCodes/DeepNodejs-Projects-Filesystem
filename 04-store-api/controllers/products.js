const Product = require('../models/product');


// * Instead of setting our own tryCatch block we can just use the express npm package (express-async-errors)

const getAllProductsStatic = async (req, res) => {
    // throw new Error('testing async errors') // (express-async-errors) package
    const products = await Product
        .find({})
        .where('price').gt(30)
        .sort('price')
        .select('name price')
        // skip and limit is for pagination property

// limit => Gets back how many product you wan to get back
// 

    res.status(200).json({products, nbHits: products.length})
}


const getAllProducts = async (req, res) => {
    const { featured, 
    company, 
    name, 
    sort, 
    fields, numericFilters } = req.query;
    const queryObject = {}

    if(featured){
        // * setting up a new props featured in queryObject
        queryObject.featured = featured === 'true'? true: false
    }
    if(company){
        queryObject.company = company
    }
    if(name){
        queryObject.name = {$regex: name, $options: 'i'}
        // options i means case sensitive
    }
    // if there is no feature then our queryObject will be {} therefore will be product.find({})
    if(numericFilters){
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        }

        const regeEx = /\b(<|>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(
            regeEx, 
            (match) => `-${operatorMap[match]}-`);

        const options = ['price', 'rating'];
        filters = filters.split(',').forEach((item) => {
            const [field, operator,value] = item.split('-')
            if(options.includes(field)){
                // Adding a field propery to the object
                // queryObject['price']
                queryObject[field] = {[operator]: Number(value)}
            }
        });
    }

    console.log(queryObject);


    let result = Product.find(queryObject)
    if(sort){
        // split to remove the(,) then join back together with a space
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    }else {
        result = result.sort('createdAt')
    }

    if(fields){
        const filedList = fields.split(',').join(' ');
        result = result.select(filedList);
    }
    

    // * Pagenation
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // limiting our response to only 7 therefore we will have 4 pages in the 23 products
    //page = 2 // 2-1 * 7 = 7
    // if skip is 0 that means we are not skipping the first 2 items 

    result = result.skip(skip).limit(limit);

    

    const products = await result;
    res.status(200).json({products, nbHits: products.length});
}



module.exports = {
    getAllProducts,
    getAllProductsStatic
}