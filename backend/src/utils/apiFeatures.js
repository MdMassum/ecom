class ApiFeatures{
    constructor(query,querystr){
        this.query = query;   // Mongoose query (e.g. Product.find())
        this.querystr = querystr;
    }
    search(){

        const keyword = this.querystr.searchKey ?{ 
            name:{
                $regex: this.querystr.searchKey,
                $options:"i",  // this means case insensetive
            },

        }:{}
        this.query = this.query.find({...keyword}).populate('seller');
        return this;
    }

    filter(){ 
        // const queryCopy = this.querystr // but this.querystr is object and passed through reference so do->
        const queryCopy = {...this.querystr} // using spread operator

        // removing fields that are from search field and not require in filter
        const removeFields = ["searchKey","page","limit","sort","order"];
        removeFields.forEach((key)=>{delete queryCopy[key]});

        let querystr = JSON.stringify(queryCopy);
        // console.log(querystr)
        querystr = querystr.replace(/\b(gt|lt|gte|lte)\b/g,(key)=>`$${key}`)    // basically changing from gt to $gt
        this.query = this.query.find(JSON.parse(querystr));
        // this.query = this.query.find(queryCopy);  // basically running find({category:" "});

        return this;
    }

    pagination(resultPerPage){
        const currPage = Number(this.querystr.page) || 1;
        const skip = resultPerPage * (currPage-1);
        
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}
module.exports = ApiFeatures;