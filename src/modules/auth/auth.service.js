import { OAuth2Client } from "google-auth-library";
import { OTP } from "../../db/models/otp.model.js";
import { User } from "../../db/models/user.model.js";
import { sendEmail, generateToken, verifyToken, hash, compare, encypt, sendEmailEvent } from "../../utils/index.js";
import { messages } from "../../utils/messages.js/index.js";
import Randomstring from "randomstring";
// we hash password(one way), we encrypt personal info(two way)


export const sendOTP = async(req, res, next) => {
  const {email} = req.body
  const userExist = await User.findOne({email})
  if(userExist) return next(new Error(messages.user.alreadyExist, {cause: 401}))
  const otp = Randomstring.generate({length: 5, charset: 'alphanumeric'})
  sendEmailEvent.emit('sendEmail', email, otp)
  await OTP.create({email, otp})
return res.status(201).json({success: true, message: messages.otp.createdSuccessfully})


}
export const register = async (req, res, next) => {
  const { userName, email, password, phone, role, otp } = req.body;
  const existOTP = await OTP.findOne({email})
  if (!existOTP) return next(new Error(messages.otp.notFound), {cause:404})
  if (existOTP.otp != otp) return next(new Error("ivalid OTP!", {cause:400}))
  const user = await User.create({
    userName,
    email,
    password:password,
    phone: encypt({data: phone}),
    role
  });
 
  return res.status(201).json({
    success: true,
    message: "user created successfully",
    data: user,
  });
};

export const activateAccount = async (req, res, next) => {
  const  token  = req.params.token;
  const { id, error } = verifyToken({ token });
  if(error) return next(error)
  const user = await User.findByIdAndUpdate(id, { isConfirmed: true });

  if (!user) {
    return next(new Error("user not found", { cause: 404 }));
  }
  return res.status(200).json({
    success: true,
    message: "account verified successfully🎊. login now",
  });
};


export const login = async (req, res, next) => {
  const { email, password } = req.body;

  const existUser = await User.findOne({ email });
   if (!existUser) {
    return next(new Error("invalid credentials", { cause: 401 }));
  }


  const matched = compare({data: password, hashedData: existUser.password})
  if (!matched) {
    return next(new Error("invalid credentials", { cause: 401 }));
  }
  if (existUser.isDeleted){
    await User.updateOne({_id: existUser._id}, {isDeleted: false})
  }

  const accessToken = generateToken({
    payload: { id: existUser._id, email },
    options: { expiresIn: "1h" },
  });
    const refreshToken = generateToken({
    payload: { id: existUser._id, email },
    options: { expiresIn: "7d" },
  });
  return res.status(200).json({
    success: true,
    message: "login successfully",
    accessToken,
    refreshToken

  });
};

const verifyGoogleToken = async (idToken) => {
  const client = new OAuth2Client()
  const ticket =  await client.verifyIdToken({
    idToken,
    audience: process.env.CLIENT_ID
  })

  const payload = ticket.getPayload()

  return payload
}
export const googleLogin = async(req, res, next) => {
  const {idToken} = req.body
  const {name, email, picture} = await verifyGoogleToken(idToken)

  let userExist = await User.findOne({email})
  if(!userExist){
    userExist = await User.create({
      userName: name,
      profilePic: picture,
      email,
      provider: 'google'
    })
  }
  const accessToken = generateToken({
    payload: { id: userExist._id, email },
    options: { expiresIn: "1h" },
  });
    const refreshToken = generateToken({
    payload: { id: userExist._id, email },
    options: { expiresIn: "7d" },
  });
  return res.status(200).json({
    success: true,
    message: "login successfully",
    accessToken,
    refreshToken

  });


}

export const refreshToken = async(req, res, next) => {
  const {refreshToken} = req.body

  const result = verifyToken({token: refreshToken})
  if (result.error) return next(result.error)
  
  const accessToken = generateToken({
    payload: {email: result.email, id: result.id},
    options : {expiresIn: '1h'}
  })
  return res.status(200).json({success: true, accessToken})
}

