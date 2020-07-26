const express = require('express');
const path = require('path');

module.exports = app => {
    // Get request which sends index.html to browser when '/' endpoint is hit
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
      });
    // Get request which sends stats.html to browser when '/stats' endpoint is hit
    app.get('/stats', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/stats.html'));
    });
    // Get request which sends exercise.html to browser when '/exercise' endpoint is hit
    app.get('/exercise', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/exercise.html'));
    });
}

