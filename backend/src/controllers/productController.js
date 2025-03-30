const Product = require('../models/productModel')
const Errorhandler = require('../utils/errorhander')
const catchAsyncError = require('../middleware/catchAsyncErrors')
const ApiFeatures = require('../utils/apiFeatures')
const cloudinary = require('../config/cloudinary')

exports.createProduct = catchAsyncError(async(req,res) =>{

    // assigning value of req.body.user as the id of loggedin user (i.e id of logged in user will be req.user.id)
    user = req.user.id;
    const { name, description, price, stock } = req.body;

    const images = req.files ? req.files.map((file) => file.path) : [];

    if (!name || !description || !price ) {
        return res.status(400).json({ 
            success: false, 
            message: 'All fields are required including at least one image.'
        });
    }

    const product = await Product.create({ name, description, price, user, images, stock});

    res.status(201).json({
        success:true,
        product
    });
})

// for getting all products
exports.getAllProducts = catchAsyncError(async(req,res) =>{

    // const resultPerPage = 10;
    const productCount = await Product.countDocuments();

    const apiFeatures = new ApiFeatures(Product.find(),req.query)
    .search()     // search function
    .filter()     // filter function on category,price,rating
    // .pagination(resultPerPage);    // total result to show in 1 page

    // const products = await Product.find();  // now instead of this do below line due to search feature
    const products = await apiFeatures.query;

    res.status(200).json({
        success:true,
        products,
        productCount
    });
})

// get all products of seller
exports.getSellerProducts = catchAsyncError(async (req, res, next) => {
    const { sellerId } = req.params;  // Get sellerId from route params

    if (!sellerId) {
        return next(new Errorhandler("Seller ID is required", 400));
    }

    const productCount = await Product.countDocuments({ seller: sellerId });

    const apiFeatures = new ApiFeatures(Product.find({ seller: sellerId }), req.query)
        .search()    // Apply search function
        .filter();   // Apply filters (category, price, rating)

    const products = await apiFeatures.query;

    res.status(200).json({
        success: true,
        products,
        productCount
    });
});


// Get product details
exports.getProductDetails=catchAsyncError(async(req,res,next)=>{
    let product = await Product.findById(req.params.id);
    
    if(!product){
        return next(new Errorhandler("Product Not Found",404));
    }
    res.status(200).json({
        success:true,
        product,
    })
})

// for updating the product - Admin -->
exports.updateProduct = catchAsyncError(
    async(req,res) =>{
    let product = await Product.findById(req.params.id);
    
    if(!product){
        return res.status(404).json({
            success:false,
            message:"Product not found"})
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true,
        product
    })
})

// Delete the product - Admin -->
exports.deleteProduct = catchAsyncError(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    // Delete images from Cloudinary
    if (product.images && product.images.length > 0) {
        const deletePromises = product.images.map(async (imageUrl) => {

            // Extracting public_id from the Cloudinary URL
            const publicId = imageUrl.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`social_media_task/${publicId}`);

        });

        await Promise.all(deletePromises);
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: "Product Deleted Successfully"
    });
});


// creating & updating review -->
exports.createProductReview = catchAsyncError(async(req,res,next)=>{
    const{rating,comment,productId} = req.body

    const review = {
        user : req.user._id,
        name : req.user.name,
        rating : Number(rating),
        comment
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(rev=>rev.user.toString() === req.user.id);
    if(isReviewed){

        product.reviews.forEach(rev=>{
            if(rev.user.toString() === req.user.id){
                rev.rating = rating;
                rev.comment = comment;  
            }
        })
    }
    else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    let avg = 0;
   
    product.reviews.forEach((rev)=>{  // sum of all ratings of review
        avg += Number(rev.rating)
    })
    avg = avg/product.numOfReviews;
    product.ratings = avg;

    await product.save({validateBeforeSave:false})
    res.status(200).json({
        success:true,
        message:"Review Added Successfully"
    })
})

// get all reviews of single product
exports.getProductReviews = catchAsyncError(async(req,res,next)=>{
    const product = await Product.findById(req.query.id);

    if(!product){
        return next(new Errorhandler("Product Not Found",404));
    }
    res.status(200).json({
        success:true,
        reviews:product.reviews
    })
})

// deleting a review 
exports.deleteReview = catchAsyncError(async(req,res,next)=>{

    const product = await Product.findById(req.query.productId);

    if(!product){
        return next(new Errorhandler("Product Not Found",404));
    }
    // keeping all reviews except the review given by current user
    const reviews = product.reviews.filter((rev)=>rev.user.toString() !== req.query.id.toString())

    product.numOfReviews = reviews.length // updating numOfReviews
    product.reviews = reviews;

    let avg = 0;
    reviews.forEach((rev)=>{  // sum of all ratings of review
        avg += Number(rev.rating)
    })
    avg = avg/product.numOfReviews;
    product.ratings = avg;

    await product.save({validateBeforeSave:false})

    res.status(200).json({
        success:true,
        message:"Review deleted successfully",
        reviews
    })
})