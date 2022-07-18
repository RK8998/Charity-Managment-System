const adminModel = require('../models/adminmodel');
const userModel = require('../models/usermodel');
const paymentModel = require('../models/paymentmodel');
const donationModel = require('../models/donationmodel');
const categoryModel = require('../models/categorymodel');

exports.fetchContact = async (req,res) => {
    try {
        console.log("fetchContact method");
        const data = await adminModel.find();
        console.log(data);
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};

exports.checkUser = async (req,res) => {
    try {
        console.log("checkUser method");
        const email = req.body.email;
        console.log(email);
        const data = await userModel.findOne({email:email});
        console.log(data);
        if(data){
            res.json({status:400, msg:"User Already Exist..."});
        }else{
            res.json({status:200, msg:"Done"});
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};

exports.userReg = async (req,res) => {
    try {
        console.log('userReg method');
        console.log(req.body);
        const name = req.body.name;
        const add = req.body.add;
        const pincode = req.body.pincode;
        const city = req.body.city;
        const state = req.body.state;
        const mobile = req.body.mobile;
        const email = req.body.email;
        const pass = req.body.password;
        const cpass = req.body.cpassword;
        const gender = req.body.gender;

        const u1 = new userModel({name:name, add:add, pincode:pincode, city:city, state:state, mobile:mobile, email:email, password:pass, cpassword:cpass, gender:gender});
        const data = await u1.save();
        if(data){
            console.log(data);
            res.json({
                status:200,
                msg:"Registration Successfull..."
            });
        }else{
            res.json({
                status:400,
                msg:"Try Again..."
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};

exports.userLogin = async (req,res) =>{
    try {
        console.log("Userlogin method");
        const email = req.body.email;
        const password = req.body.password;
        console.log(email);
        console.log(password);

        const data = await userModel.count({email:email, password:password})
        console.log(data);
        if(data == 1){
            res.json({ status:200, msg:"Login Successfully..."});
        }else{
            res.json({ status:400, msg:"Invalid Username or Password..." });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};

exports.fetchAllPayment = async (req,res) => {
    try {
        console.log("fetchAllPayment method");
        const data = await paymentModel.find();
        console.log(data);
        res.status(200).send(data);        
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};
exports.fetchAllCategory = async (req,res) => {
    try {
        console.log("fetchAllcategory method");
        const data = await categoryModel.find();
        console.log(data);
        res.status(200).send(data);        
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};

exports.doDonat = async (req,res) => {
    try {
        console.log("doDonat method");
        console.log(req.body);
        const email = req.body.email;
        const name = req.body.name;
        const dcategory = req.body.dcategory;
        const payment = req.body.payment;
        const trid = req.body.trid;
        const amount = req.body.amount;
        const date = req.body.date;

        const d1 = new donationModel({email:email, name:name, dcategory:dcategory, payment:payment, trid:trid, amount:amount, date:date});
        const data  = await d1.save();
        if(data){
            console.log(data);
            res.json({
                status : 200,
                msg : "Donation Successfully..."
            });
        }
        else{
            res.json({
                status : 400,
                msg : "Try Again..."
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};
exports.fetchAllDonation = async (req,res) => {
    try {
        console.log("fetchAllDonation method");
        console.log(req.body);
        const email = req.body.email;
        console.log(email);
        const data = await donationModel.find({email:email});
        console.log(data);
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};

// User profile

exports.fetchUserProfile = async (req,res) => {
    try {
        console.log("fetchUserProfile method");
        const email = req.body.email;
        console.log(email);
        const data = await userModel.find({email:email});
        console.log(data);
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};

exports.updateUserProfile = async (req,res) => {
    try {
        console.log("updateUserProfile method");
        const id = req.body.id;
        const data = await userModel.findByIdAndUpdate(id, {
            name:req.body.name,
            add:req.body.add,
            pincode:req.body.pincode,
            city:req.body.city,
            state:req.body.state,
            email:req.body.email,
            mobile:req.body.mobile,
            password:req.body.password,
            cpassword:req.body.cpassword,
            gender:req.body.gender
        });
        console.log(data);
        if(data){
            res.json({
                status:200,
                msg:"Update Successfully..."
            })
        }else{
            res.json({
                status:400,
                msg:"Try Again..."
            })
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};
