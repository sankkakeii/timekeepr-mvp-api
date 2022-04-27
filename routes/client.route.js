const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client.controller');
const checkNumber = require('../middleware/news.middleware');
const clientMiddleware = require('../middleware/client.middleware');

/* CLIENTS WILL BE CALLED TENANTS INTERCHANGEABLY */
// router.post('/', (req, res) => {
//     res.send('client route');
// });
router.post('/sign-up', clientController.signUp);
router.post('/login', clientController.login);
router.get('/dashboard', clientController.dashboard);
router.put('/add-client', clientController.addUser);
router.put('/add-location', clientController.addLocation);
// router.get('/users', checkNumber, clientController.create);
router.get('/view-users', clientController.viewUsers);
router.get('/analytics', clientController.viewAnalytics);
router.get('/notifications', clientController.notifications);
router.post('/settings', clientController.settings);

module.exports = router;