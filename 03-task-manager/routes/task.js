const express = require('express');
const router = express.Router();

// * CONTROLLERS
const { getAllTasks, getTask, createTask, updateTask, deleteTask
} = require('../controllers/task')

// router.route('/').get((req, res) => {
//     res.send('All items')
// });

router.get('/', getAllTasks);
router.post('/', createTask);

router.get('/:id', getTask);
router.patch('/:id', updateTask);
/**
 * !Why use PUT and not PATCH. using put means you are trying to replace the resource on the database.
 * 
 * * While patch is for PARTIAL UPDATE
 * 
 */
router.delete('/:id', deleteTask);


module.exports = router;
