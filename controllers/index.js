const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);

<<<<<<< HEAD


=======
router.use((req, res) => {
    res.status(404).end
})
>>>>>>> 2018862085aab07231669314c57f126c1153f3a8
module.exports = router;