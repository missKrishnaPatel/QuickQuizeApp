const ArenaForm = require('../models/ArenaForm');

exports.submitForm = async (req, res) => {
  try {
    const { fullName, email, location, experienceLevel, motivation } = req.body;

    // Basic validation (Mongoose schema handles most validation)
    if (!fullName || !email || !experienceLevel) {
      return res.status(400).json({ error: 'Please fill out all required fields' });
    }

    // Create new form entry
    const formData = new ArenaForm({
      fullName,
      email,
      location,
      experienceLevel,
      motivation,
    });

    // Save to database
    const savedForm = await formData.save();

    res.status(201).json({
      message: 'Form data saved successfully',
      data: savedForm,
    });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ error: 'An error occurred while saving the form data' });
  }
};