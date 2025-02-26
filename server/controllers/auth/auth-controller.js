const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

//Register
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.json({
        success: false,
        message:
          "!El email ya está registrado! Por favor intenta con otro email",
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    //Para guardar en MongoDB
    await newUser.save();

    res.status(200).json({
      success: true,
      message: "Usuario agregado exitosamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.json({
        success: false,
        message: "¡El email no existe! Por favor registrarse primero",
      });
    }

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );

    if (!checkPasswordMatch) {
      return res.json({
        success: false,
        message: "¡Contraseña Incorrecta! Intenta de nuevo",
      });
    }

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "90m" }
    );

    //Activar secure : true en producción, para asegurarse de acceder solo en conexiones seguras
    //res.cookie se usa para guardar el token en el navegador y así el usuario acceder a su sesión
    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Usuario logueado exitosamente",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//Logout

const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "¡Usuario deslogueado exitosamente!",
  });
};

//Auth middleware
//Evalúa si el usuario es válido o no
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Usuario no autorizado",
    });

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401);
  }
};

module.exports = { registerUser, loginUser, logoutUser, authMiddleware };
