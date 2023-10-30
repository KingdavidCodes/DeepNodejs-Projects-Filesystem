const asyncHandler = require('express-async-handler');// ! express-async-handler is a async handler that handles the exceptions --> meaning the errors. in the Promise errors.
//* so we don't need to write the tryCatch block everytime we create a controller to catch the errors.


//* @desc Get all contacts
//* @route GET /api/contacts
//* access public
const getContacts = asyncHandler(async(req, res) => {
  res.status(200).json({
    message: "Get all contacts"
  });
});

//* @desc Create new contacts
//* @route CREATE /api/contacts
//* access public
const createContact = asyncHandler((req, res) => {
  const { name, email, phone } = req.body;
  // ! If there is any false the the stateement run the If block code
  if(!name || !email || !phone){
    res.status(400);
    throw new Error('All fields are mandatory');
    // ! check out what is in the which property/keys are in the  Error object
  }
  res.status(200).json({
    message: "Create contacts"
  });
  console.log(`The req.body is`, req.body);
})

//* @desc Get single contact
//* @route GET /api/contacts/:id
//* access public
const getContact = asyncHandler((req, res) => {
  const { id } = req.params;
  res.status(200).json({
    message: `Get contact with the ID: ${id}`
  });
});

//* @desc Update single contact
//* @route PUT /api/contacts/:id
//* access public
const updateContact = asyncHandler((req, res) => {
  const { id } = req.params;
  res.status(200).json({
    message: `Update contact with the ID: ${id}`
  });
});

//* @desc Delete single contact
//* @route DELETE /api/contacts/:id
//* access public
const deleteContact = asyncHandler((req, res) => {
  const { id } = req.params;
  res.status(200).json({
    message: `Delete contact with the ID: ${id}`
  });
});




module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact
}

