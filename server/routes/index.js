const router = require('express').Router();
const userRoutes = require('./userRoutes');

router.use('/users', userRoutes);

router.use((req, res) => {
    return res.send('Wrong route!');
});

module.exports = router;