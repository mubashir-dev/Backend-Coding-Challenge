const authService = require("../services/auth.service");
const userService = require("../services/user.service");
const apiResponse = require("../utils/response.util");
const { Encryption } = require("../utils/hashing.util");
const jwtService = require("../services/jwt.service");
const emailService = require("../services/email.service");
const serializationService = require("../services/serialization.service");

//login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //query user
    const userExists = await authService.find({ email: email });
    if (!userExists) {
      return apiResponse.notFound(res, "Account doen't found in the database");
    }

    //check if account is suspeneded
    if (userExists.status == "suspended") {
      return apiResponse.unauthorizedResponse(
        res,
        "Account is suspended,Contact Support"
      );
    }

    //compare password with hash
    let passwordCompared = await Encryption.compare(
      password,
      userExists.password
    );

    if (!passwordCompared) {
      return apiResponse.unauthorizedResponse(
        res,
        "Credentials are may not be correct"
      );
    }

    //user playload
    const userData = {
      id: userExists._id,
      name: userExists.name,
      role: userExists.role,
    };

    //access-token & refresh-token
    const [accessToken, refreshToken] = await Promise.all([
      jwtService.signAccessToken(userData),
      jwtService.signARefreshToken(userData),
    ]);

    //serilizing data
    const data = serializationService.serilizeUser(
      accessToken,
      refreshToken,
      userData
    );
    return apiResponse.successData(res, "successfully logged in", data);
  } catch (error) {
    next(error);
  }
};

//refresh token
exports.refreshToken = async (req, res, next) => {
  try {
    const { refreshtoken } = req.body;
    const loggedUser = await jwtService.verifyRefreshToken(refreshtoken);
    const [accessToken, refreshToken] = await Promise.all([
      jwtService.signAccessToken(loggedUser),
      jwtService.signARefreshToken(loggedUser),
    ]);

    //serilizing data
    const data = serializationService.serilizeUser(
      accessToken,
      refreshToken,
      loggedUser
    );

    return apiResponse.successData(
      res,
      "successfully generated fresh tokens",
      data
    );
  } catch (error) {
    next(error);
  }
};

//forgot password
exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const userExists = await authService.find({ email: email });

    if (!userExists) {
      return apiResponse.notFound(res, "Account doen't found in the database");
    }

    if (userExists.status == "suspended") {
      return apiResponse.unauthorizedResponse(
        res,
        "Account is suspended,Contact Support"
      );
    }

    //password reset token
    const token = authService.randomToken();

    //delete previous records
    await authService.deletePasswordForgot(req, res);

    //storing token
    req.body.token = token;

    const tokenExist = authService.storePasswordForgot(req, res);

    if (!tokenExist) {
      return apiResponse.Error(res, "something went wrong");
    }

    //send password reset email

    //reset link
    const resetPasswordLink =
      "http://localhost:3000/auth/forgot-password-restore/" + token;

    const template = `<p>Password Reset Link : <a href=${resetPasswordLink}>Click here to reset your password</a></p>`;
    //dispatching email
    emailService.sendEmail(
      resetPasswordLink,
      userExists.email,
      "Password Reset Link",
      template
    );

    return apiResponse.success(res, "password reset link sent to your email");
  } catch (error) {
    next(error);
  }
};

//forgot password restore
exports.forgotPasswordRestore = async (req, res, next) => {
  try {
    const token = req.params.token;

    const tokenExists = await authService.getPasswordForgot(req, res);

    if (!tokenExists) {
      return apiResponse.notFound(res, "token record not found");
    }

    const userExists = await authService.find({ email: tokenExists.email });

    if (!userExists) {
      return apiResponse.notFound(res, "Invalid/Expired reset link");
    }

    req.body.email = userExists.email;

    //revoke and update user password
    Promise.all([
      await authService.deletePasswordForgot(req, res),
      await authService.resetPassword(req, res),
    ]);
    return apiResponse.success(res, "password has successfully been restored");
  } catch (error) {
    next(error);
  }
};
