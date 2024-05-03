const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.send('Restaurant route');
}
);

module.exports = router;