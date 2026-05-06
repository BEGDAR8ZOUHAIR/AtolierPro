import express from "express";
import * as authController from "../controllers/authController";

const router = express.Router();

router.post("/register", authController.register);
router.post("/verify-email", authController.verifyEmail);
router.post("/resend-otp", authController.resendOtp);
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
router.post("/social", authController.social);

export default router;
