const express = require('express');
const router = express.Router();

const { 
    getPeople, 
    singlePerson, 
    updatedPerson, 
    deletedPerson, 
    createPerson, 
    createPersonPostman } = require('../controllers/people');


// router.get('/', getPeople);
// router.get('/:id', singlePerson);
// router.put('/:id', updatedPerson);
// router.delete('/:id', deletedPerson)
// router.post('/', createPerson);
// router.post('/postman', createPersonPostman);

// ? ---> Other ways to setup the Routes
router.route('/').get(getPeople).post(createPerson);
router.route('/postman').post(createPersonPostman);
router.route('/:id')
    .get(singlePerson)
    .put(updatedPerson)
    .delete(deletedPerson);



module.exports = router;