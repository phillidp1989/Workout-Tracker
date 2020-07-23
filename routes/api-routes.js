const express = require('express');
const mongoose = require('mongoose');

module.exports = app => {
    app.get('/api/workouts', (req, res) => {
        
      });
    
    app.get('/api/workouts/:id', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/stats.html'));
    });

    app.get('/api/workouts/range', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/stats.html'));
    });

    app.post('/api/workouts', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/exercise.html'));
    });
    
    app.put('/api/workouts/:id', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/exercise.html'));
    });
}