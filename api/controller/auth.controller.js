const jwt = require('jsonwebtoken');
const User = require('./../model/user.model');
exports.login = async function (req,res){
    let data = req.body;
    let email = data.email;
    let password = data.password;
    let user = await User.findOne({ email: email });
    console.log(user);
    if(user=== null){
        return res.status(404).json({
            message:'Email does not exist',
            status: false
        })
    }
    else if(email === user.email && password === user.password){
        var token = jwt.sign({ email: email }, 'shhhhh');
        const decode = jwt.verify(token, 'shhhhh');
        return res.status(200).json({
            message:'logged in !',
            status: true
            // token,
            // decode
        })
    }
    else{
        return res.status(401).json({
            message:'check your email and password',
            status: false
        })
    }
}

exports.user = async function (req,res){
    let email = req.body.email;
    console.log(email);
    let user = await User.findOne({email:email});
    return res.status(200).json({
        user
    })
}

exports.users = async function (req,res){
    console.log('0------0');
    // let token= req.body.token;
    let token = req.headers.token;

    if (token) {
        let decode = jwt.verify(token, 'shhhhh');
        let adminEmail = decode.email;
        console.log("Check", decode.email);

        if (adminEmail === 'admin@gmail') {
            let users = await User.find();
            return res.status(200).json({
                message: "All Users!",
                users
            })
        } else {
            let data = req.body;
            let password = data.password;
            let email = data.email;
            let user = await User.findOne({ email: email, password: password });
            return res.status(200).json({
                user,
            })
        }

    }else{
        let data = req.body;
        let password = data.password;
        let email = data.email;
        let user = await User.findOne({email:email,password:password} );
        return res.status(200).json({
            user,
        })  
    }
}

exports.signup = async function (req,res){
    let email=req.body.email;
    let password = req.body.password;
    let name = req.body.name;
    let newUser = new User({
        name,
        email,
        password
    })
    await newUser.save();
    return res.status(200).json({
        message:'User Added'
    })
}