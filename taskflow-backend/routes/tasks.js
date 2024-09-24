const express = require("express");
const Task = require("../models/Task");
const router = express.Router();

// Créer une nouvelle tâche
router.post("/", async (req, res) => {
  const { title, description, assignedTo } = req.body;
  try {
    const newTask = new Task({ title, description, assignedTo });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la création de la tâche." });
  }
});

// Obtenir toutes les tâches
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des tâches." });
  }
});

// Mettre à jour une tâche
router.put("/:id", async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, status },
      { new: true }
    );
    res.status(200).json(updatedTask);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour de la tâche." });
  }
});

// Supprimer une tâche
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Tâche supprimée." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de la tâche." });
  }
});

module.exports = router;
