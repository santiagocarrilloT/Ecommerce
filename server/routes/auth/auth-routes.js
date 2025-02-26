const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
} = require("../../controllers/auth/auth-controller");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
//Función ejecutada por el middleware para verificar si el usuario está autenticado
router.get("/check-auth", authMiddleware, (req, res) => {
  //req.user contiene la información del usuario autenticado
  const user = req.user;
  //Se envía la información del usuario al cliente (res la contiene)
  res.status(200).json({
    success: true,
    message: "Usuario autenticado",
    user,
  });
});

module.exports = router;
