import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Resend } from "resend";

const router = express.Router();
const resend = new Resend(process.env.RESEND_API_KEY);

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15d" });
};

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Register a new artisan
router.post("/register", async (req, res) => {
  try {
    const {
      fullName = "",
      username = "",
      email = "",
      password = "",
      profession = "",
      phone = "",
      serviceArea = "",
      address = "",
      postalCode = "",
      city = ""
    } = req.body;

    if (!fullName || !username || !email || !password ||
        !profession || !phone || !serviceArea || !address ||
        !postalCode || !city) {
      return res.status(400).json({
        message: "Veuillez remplir tous les champs requis"
      });
    }

    if (password.length < 10) {
      return res.status(400).json({
        message: "Le mot de passe doit contenir au moins 10 caractères"
      });
    }

    // Validate password rules
    let errorMessages = [];

    if (!/[A-Z]/.test(password)) {
      errorMessages.push("Doit contenir au moins une majuscule");
    }
    if (!/\d/.test(password)) {
      errorMessages.push("Doit contenir au moins un chiffre");
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      errorMessages.push("Doit contenir au moins un caractère spécial");
    }

    if (errorMessages.length > 0) {
      return res.status(400).json({
        message: "Mot de passe invalide",
        errors: errorMessages
      });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Cet email est déjà en usage" });
    }

    // Check if username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Ce nom d'utilisateur est déjà pris" });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Handle profile image
    const profileImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;

    // Save the user
    const user = new User({
      fullName,
      username,
      email,
      password,
      profession,
      phone,
      serviceArea,
      address,
      postalCode,
      city,
      profileImage,
      otp,
      otpExpires,
      verified: false
    });

    await user.save();

    // Send OTP via Resend
    try {
      await resend.emails.send({
        from: "send@aserrar.dev",
        to: email,
        subject: "Vérification de votre email - Atelier Pro",
        html: `
          <h1>Bienvenue chez Atelier Pro!</h1>
          <p>Votre code de vérification est: <strong>${otp}</strong></p>
          <p>Ce code expirera dans 10 minutes.</p>
        `
      });
    } catch (emailError) {
      console.error("Error sending OTP email:", emailError);
    }

    res.status(201).json({
      success: true,
      email: user.email,
      message: "Inscription réussie. Veuillez vérifier votre email."
    });
  } catch (error) {
    console.error("Erreur lors de l'inscription", error);
    res.status(500).json({ message: "Erreur interne" });
  }
});

// Verify email with OTP
router.post("/verify-email", async (req, res) => {
  try {
    const { otp } = req.body;

    if (!otp) {
      return res.status(400).json({ message: "Veuillez saisir le code de vérification" });
    }

    const user = await User.findOne({
      otp,
      otpExpires: { $gt: new Date() }
    });

    if (!user) {
      return res.status(400).json({ message: "Code invalide ou expiré" });
    }

    user.verified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    const token = generateToken(user._id);

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        profession: user.profession,
        phone: user.phone,
        serviceArea: user.serviceArea,
        address: user.address,
        postalCode: user.postalCode,
        city: user.city,
        profileImage: user.profileImage,
        createdAt: user.createdAt,
        verified: true
      }
    });
  } catch (error) {
    console.error("Erreur lors de la vérification", error);
    res.status(500).json({ message: "Erreur interne" });
  }
});

// Resend OTP
router.post("/resend-otp", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Utilisateur non trouvé" });
    }

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    // Send OTP via Resend
    await resend.emails.send({
      from: "send@aserrar.dev",
      to: email,
      subject: "Nouveau code de vérification - Atelier Pro",
      html: `
        <h1>Votre nouveau code de vérification</h1>
        <p>Votre code est: <strong>${otp}</strong></p>
        <p>Ce code expirera dans 10 minutes.</p>
      `
    });

    res.status(200).json({ message: "Code renvoyé avec succès" });
  } catch (error) {
    console.error("Erreur lors du renvoi", error);
    res.status(500).json({ message: "Erreur interne" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({
      message: "Veuillez saisir vos identifiants"
    });

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Informations incorrectes" });

    // Check password
    if (!(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }

    // Check if verified
    if (!user.verified) {
      return res.status(401).json({ message: "Veuillez vérifier votre email avant de vous connecter" });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        profession: user.profession,
        phone: user.phone,
        serviceArea: user.serviceArea,
        address: user.address,
        postalCode: user.postalCode,
        city: user.city,
        profileImage: user.profileImage,
        createdAt: user.createdAt,
        verified: user.verified
      }
    });
  } catch (error) {
    console.error("Erreur lors de la connexion", error);
    res.status(500).json({ message: "Erreur interne" });
  }
});

// Forgot password
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Utilisateur non trouvé" });
    }

    const resetToken = generateOTP(); // Using OTP as reset token
    const resetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    user.otp = resetToken;
    user.otpExpires = resetExpires;
    await user.save();

    // Send reset link via Resend
    await resend.emails.send({
      from: "send@aserrar.dev",
      to: email,
      subject: "Réinitialisation de mot de passe - Atelier Pro",
      html: `
        <h1>Réinitialisation de mot de passe</h1>
        <p>Votre code de réinitialisation est: <strong>${resetToken}</strong></p>
        <p>Ce code est valable 1 heure.</p>
        <p>Ou cliquez sur ce lien: <a href="${process.env.FRONTEND_URL}/reset-password?token=${resetToken}">Réinitialiser</a></p>
      `
    });

    res.status(200).json({ message: "Email de réinitialisation envoyé" });
  } catch (error) {
    console.error("Erreur forgot password", error);
    res.status(500).json({ message: "Erreur interne" });
  }
});

// Reset password
router.post("/reset-password", async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ message: "Token et nouveau mot de passe requis" });
    }

    const user = await User.findOne({
      otp: token,
      otpExpires: { $gt: new Date() }
    });

    if (!user) {
      return res.status(400).json({ message: "Token invalide ou expiré" });
    }

    // Validate new password
    if (password.length < 10) {
      return res.status(400).json({
        message: "Le mot de passe doit contenir au moins 10 caractères"
      });
    }

    let errorMessages = [];
    if (!/[A-Z]/.test(password)) errorMessages.push("Doit contenir au moins une majuscule");
    if (!/\d/.test(password)) errorMessages.push("Doit contenir au moins un chiffre");
    if (!/[^A-Za-z0-9]/.test(password)) errorMessages.push("Doit contenir au moins un caractère spécial");

    if (errorMessages.length > 0) {
      return res.status(400).json({
        message: "Mot de passe invalide",
        errors: errorMessages
      });
    }

    user.password = password;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Mot de passe mis à jour avec succès" });
  } catch (error) {
    console.error("Erreur reset password", error);
    res.status(500).json({ message: "Erreur interne" });
  }
});

// Social login (placeholder)
router.post("/social", async (req, res) => {
  try {
    const { idToken, provider } = req.body; // idToken from Google/Apple

    // TODO: Verify idToken with provider
    // For now, just return success
    res.status(200).json({ message: "Social login not implemented yet" });
  } catch (error) {
    console.error("Erreur social login", error);
    res.status(500).json({ message: "Erreur interne" });
  }
});

export default router;
