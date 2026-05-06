import { userRepository } from '../repositories/userRepository';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || '');

const generateToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'secret', { expiresIn: '15d' });
};

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const register = async (data: any) => {
  try {
    const {
      fullName = '',
      username = '',
      email = '',
      password = '',
      profession = '',
      phone = '',
      serviceArea = '',
      address = '',
      postalCode = '',
      city = ''
    } = data;

    if (!fullName || !username || !email || !password ||
        !profession || !phone || !serviceArea || !address ||
        !postalCode || !city) {
      return { status: 400, body: { message: 'Veuillez remplir tous les champs requis' } };
    }

    if (password.length < 10) {
      return { status: 400, body: { message: 'Le mot de passe doit contenir au moins 10 caractères' } };
    }

    // Validate password rules
    const errorMessages: string[] = [];
    if (!/[A-Z]/.test(password)) errorMessages.push('Doit contenir au moins une majuscule');
    if (!/\d/.test(password)) errorMessages.push('Doit contenir au moins un chiffre');
    if (!/[^A-Za-z0-9]/.test(password)) errorMessages.push('Doit contenir au moins un caractère spécial');

    if (errorMessages.length > 0) {
      return { status: 400, body: { message: 'Mot de passe invalide', errors: errorMessages } };
    }

    // Check if email already exists
    const existingEmail = await userRepository.findByEmail(email);
    if (existingEmail) {
      return { status: 400, body: { message: 'Cet email est déjà en usage' } };
    }

    // Check if username already exists
    const existingUsername = await userRepository.findByUsername(username);
    if (existingUsername) {
      return { status: 400, body: { message: 'Ce nom d\'utilisateur est déjà pris' } };
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Handle profile image
    const profileImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;

    // Save the user
    const user = await userRepository.create({
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

    // Send OTP via Resend
    try {
      await resend.emails.send({
        from: 'send@aserrar.dev',
        to: email,
        subject: 'Vérification de votre email - Atelier Pro',
        html: `
          <h1>Bienvenue chez Atelier Pro!</h1>
          <p>Votre code de vérification est: <strong>${otp}</strong></p>
          <p>Ce code expirera dans 10 minutes.</p>
        `
      });
    } catch (emailError) {
      console.error('Error sending OTP email:', emailError);
    }

    return {
      status: 201,
      body: {
        success: true,
        email: user.email,
        message: 'Inscription réussie. Veuillez vérifier votre email.'
      }
    };
  } catch (error) {
    console.error('Erreur lors de l\'inscription', error);
    return { status: 500, body: { message: 'Erreur interne' } };
  }
};

export const verifyEmail = async (data: any) => {
  try {
    const { otp } = data;
    if (!otp) {
      return { status: 400, body: { message: 'Veuillez saisir le code de vérification' } };
    }

    const user = await userRepository.findByOtp(otp, { $gt: new Date() });
    if (!user) {
      return { status: 400, body: { message: 'Code invalide ou expiré' } };
    }

    user.verified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    const token = generateToken((user._id as any).toString());

    return {
      status: 200,
      body: {
        token,
        user: {
          id: (user._id as any).toString(),
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
      }
    };
  } catch (error) {
    console.error('Erreur lors de la vérification', error);
    return { status: 500, body: { message: 'Erreur interne' } };
  }
};

export const resendOtp = async (data: any) => {
  try {
    const { email } = data;
    const user = await userRepository.findByEmail(email);
    if (!user) {
      return { status: 400, body: { message: 'Utilisateur non trouvé' } };
    }

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    await resend.emails.send({
      from: 'send@aserrar.dev',
      to: email,
      subject: 'Nouveau code de vérification - Atelier Pro',
      html: `
        <h1>Votre nouveau code de vérification</h1>
        <p>Votre code est: <strong>${otp}</strong></p>
        <p>Ce code expirera dans 10 minutes.</p>
      `
    });

    return { status: 200, body: { message: 'Code renvoyé avec succès' } };
  } catch (error) {
    console.error('Erreur lors du renvoi', error);
    return { status: 500, body: { message: 'Erreur interne' } };
  }
};

export const login = async (data: any) => {
  try {
    const { email, password } = data;
    if (!email || !password) {
      return { status: 400, body: { message: 'Veuillez saisir vos identifiants' } };
    }

    const user = await userRepository.findByEmail(email);
    if (!user) {
      return { status: 400, body: { message: 'Informations incorrectes' } };
    }

    if (!(await user.comparePassword(password))) {
      return { status: 400, body: { message: 'Mot de passe incorrect' } };
    }

    if (!user.verified) {
      return { status: 401, body: { message: 'Veuillez vérifier votre email avant de vous connecter' } };
    }

    const token = generateToken((user._id as any).toString());

    return {
      status: 200,
      body: {
        token,
        user: {
          id: (user._id as any).toString(),
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
      }
    };
  } catch (error) {
    console.error('Erreur lors de la connexion', error);
    return { status: 500, body: { message: 'Erreur interne' } };
  }
};

export const forgotPassword = async (data: any) => {
  try {
    const { email } = data;
    const user = await userRepository.findByEmail(email);
    if (!user) {
      return { status: 400, body: { message: 'Utilisateur non trouvé' } };
    }

    const resetToken = generateOTP();
    const resetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    user.otp = resetToken;
    user.otpExpires = resetExpires;
    await user.save();

    await resend.emails.send({
      from: 'send@aserrar.dev',
      to: email,
      subject: 'Réinitialisation de mot de passe - Atelier Pro',
      html: `
        <h1>Réinitialisation de mot de passe</h1>
        <p>Votre code de réinitialisation est: <strong>${resetToken}</strong></p>
        <p>Ce code est valable 1 heure.</p>
        <p>Ou cliquez sur ce lien: <a href="${process.env.FRONTEND_URL}/reset-password?token=${resetToken}">Réinitialiser</a></p>
      `
    });

    return { status: 200, body: { message: 'Email de réinitialisation envoyé' } };
  } catch (error) {
    console.error('Erreur forgot password', error);
    return { status: 500, body: { message: 'Erreur interne' } };
  }
};

export const resetPassword = async (data: any) => {
  try {
    const { token, password } = data;
    if (!token || !password) {
      return { status: 400, body: { message: 'Token et nouveau mot de passe requis' } };
    }

    const user = await userRepository.findByOtp(token, { $gt: new Date() });
    if (!user) {
      return { status: 400, body: { message: 'Token invalide ou expiré' } };
    }

    if (password.length < 10) {
      return { status: 400, body: { message: 'Le mot de passe doit contenir au moins 10 caractères' } };
    }

    const errorMessages: string[] = [];
    if (!/[A-Z]/.test(password)) errorMessages.push('Doit contenir au moins une majuscule');
    if (!/\d/.test(password)) errorMessages.push('Doit contenir au moins un chiffre');
    if (!/[^A-Za-z0-9]/.test(password)) errorMessages.push('Doit contenir au moins un caractère spécial');

    if (errorMessages.length > 0) {
      return { status: 400, body: { message: 'Mot de passe invalide', errors: errorMessages } };
    }

    user.password = password;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    return { status: 200, body: { message: 'Mot de passe mis à jour avec succès' } };
  } catch (error) {
    console.error('Erreur reset password', error);
    return { status: 500, body: { message: 'Erreur interne' } };
  }
};

export const socialLogin = async (data: any) => {
  // TODO: Verify idToken with provider
  return { status: 200, body: { message: 'Social login not implemented yet' } };
};
