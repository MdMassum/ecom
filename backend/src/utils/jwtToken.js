
const sendToken = (user,statusCode,res) =>{

    // generating token -->
    // const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
    //     expiresIn:process.env.JWT_EXPIRE
    // })  // or
    const token = user.getJWTtoken();

    //options for cookie -->
    
    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",  
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    };

    // sending response
    res.status(statusCode).cookie("token",token,options).json({
        success:true,
        user,
        token
    })
}
module.exports = sendToken