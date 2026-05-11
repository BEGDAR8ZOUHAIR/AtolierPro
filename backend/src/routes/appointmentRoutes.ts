import express, { Request, Response, NextFunction } from "express";
import Appointment from "../models/Appointment";
import protectRoute from "../middleware/auth.middleware";

const router = express.Router();

// Create appointment
router.post("/", protectRoute, async (req, res) => {
  try {
    const {
      clientName,
      clientEmail,
      clientPhone,
      service,
      address,
      postalCode,
      city,
      appointmentDate,
      appointmentTime
    } = req.body;

    if (!clientName || !clientEmail || !clientPhone || !service || !address || !postalCode || !city || !appointmentDate || !appointmentTime) {
      return res.status(400).json({ message: "Veuillez fournir toutes les informations" })
    }

    const newAppointment = new Appointment({
      clientName,
      clientEmail,
      clientPhone,
      service,
      address,
      postalCode,
      city,
      appointmentDate,
      appointmentTime,
      user: req.user._id
    });

    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    console.error("Error creating appointment", error);
    res.status(500).json({ message: "Erreur interne sur le serveur" })
  }
});

// Get all appointments with pagination
router.get("/", protectRoute, async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const skip = (page - 1) * limit;

    const appointments = await Appointment.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "username profileImage");

    const totalAppointments = await Appointment.countDocuments();

    res.json({
      appointments,
      currentPage: page,
      totalAppointments,
      totalPages: Math.ceil(totalAppointments / limit)
    });
  } catch (error) {
    console.error("Error fetching appointments", error);
    res.status(500).json({ message: "Erreur interne sur le serveur" })
  }
});

// Get user specific appointments
router.get("/user", protectRoute, async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.json(appointments);
  } catch (error) {
    console.error("Error fetching user appointments", error);
    res.status(500).json({ message: "Erreur interne sur le serveur" })
  }
});

// Update appointment
router.put("/:id", protectRoute, async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;

    const appointment = await Appointment.findByIdAndUpdate(id, updates, {
      new: true
    });

    if (!appointment) return res.status(404).json({ message: "Rendez-vous non térouvé" });

    res.json(appointment);
  } catch (error) {
    console.error("Error updating appointment", error);
    res.status(500).json({ message: "Erreur interne sur le serveur" })
  }
});

// Confirm appointment
router.patch("/:id/confirm", protectRoute, async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);

    if (!appointment) return res.status(404).json({ message: "Rendez-vous non trouvé" });

    if (appointment.status === "CONFIRMÉ") {
      return res.status(400).json({ message: "Ce rendez-vous est déjà confirmé" })
    }

    appointment.status = "CONFIRMÉ";
    await appointment.save();

    res.json({ message: "Rendez-vous confirmé avec succès" });
  } catch (error) {
    console.error("Error confirming appointment", error);
    res.status(500).json({ message: "Erreur interne sur le serveur" })
  }
});

// Delete appointment
router.delete("/:id", protectRoute, async (req, res) => {
  try {
    const id = req.params.id;
    const appointment = await Appointment.findById(id);

    if (!appointment) return res.status(404).json({ message: "Rendez-vous non trouvé" });

    await appointment.deleteOne();
    res.json({ message: "Rendez-vous supprimé avec succès" });
  } catch (error) {
    console.error("Error deleting appointment", error);
    res.status(500).json({ message: "Erreur interne sur le serveur" })
  }
});
export default router;