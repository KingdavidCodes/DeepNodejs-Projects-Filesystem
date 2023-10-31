const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');// ! express-async-handler is a async handler that handles the exceptions --> meaning the errors. in the Promise errors.
//* so we don't need to write the tryCatch block everytime we create a controller to catch the errors.
const Contact = require('../models/contactModel');





//* @desc Get all contacts
//* @route GET /api/contacts
//* access private
const getContacts = asyncHandler(async(req, res) => {
  const contacts = await Contact.find({user_id: req.user.id});
  res.status(200).json({
    npHits: contacts.length,
    contacts
  });
});

//* @desc Create new contacts
//* @route CREATE /api/contacts
//* access private
const createContact = asyncHandler(async(req, res) => {
  const { name, email, phone } = req.body;
  // ! If there is any false the the stateement run the If block code
  if(!name || !email || !phone){
    res.status(400);
    throw new Error('All fields are mandatory');
    // ! check out what is in the which property/keys are in the  Error object
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id
  });
  res.status(200).json(contact);
  console.log(`The req.body is`, req.body);
});

//* @desc Get single contact
//* @route GET /api/contacts/:id
//* access private
const getContact = async(req, res) => {
  try {
    const { id: contactID } = req.params
    const contact = await Contact.findOne({_id: contactID});
    if(!contact){
      res.status(404);
      throw new Error('Contact not found');
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json(error);
  }
}




//* @desc Update single contact
//* @route PUT /api/contacts/:id
//* access private
const updateContact = asyncHandler(async(req, res) => {
  const { id: contactID } = req.params;

  // * check if contact is in DB. If not throw error
  const contact = await Contact.findOne({_id: contactID});
  if(!contact){
    res.status(404);
    throw new Error("Contact not found");
  }

  // * validation to stop users from editing others contact
  if(contact.user_id.toString() !== req.user.id){
    res.status(403);
    throw new Error("User don't have permission to update other user contacts");
  }

  // * update the contact
  const updatedContact = await Contact.findByIdAndUpdate(
    contactID,
    req.body,
    {new: true} //! return new update to the JSON
  );

  res.status(200).json(updatedContact);
});



//* @desc Delete single contact
//* @route DELETE /api/contacts/:id
//* access private
const deleteContact = asyncHandler(async(req, res) => {
  const { id: contactID } = req.params;

   // * check if contact is in DB. If not throw error
  const contact = await Contact.findOne({_id: contactID});
  if(!contact){
    res.status(404);
    throw new Error("Contact not found");
  }

  // * validation to stop users from editing others contact
  if(contact.user_id.toString() !== req.user.id){
    res.status(403);
    throw new Error("User don't have permission to delete other user contacts");
  }

  if(contact){
    // * Delete contact
    // ! check why remove() it removes all contacts in the db
    await Contact.findByIdAndDelete({_id: contactID});
  
    res.status(200).json(contact);
  }else {
    res.status(501);
    throw new Error("Sever error");
  }
});




module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact
}

