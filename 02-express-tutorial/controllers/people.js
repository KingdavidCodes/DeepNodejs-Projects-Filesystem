let { people } = require('../data');

const getPeople = (req, res) => {
    res.status(200).json({
        success: true,
        data: people
    });
}

const singlePerson = (req, res) => {
    people.filter((people) => {
        if(people.id === Number(req.params.id)){
            res.status(200).json({
                success: true,
                people
            })    
        }
    })
}

const createPerson = (req, res) => {
    const { name } = req.body;
    if(!name){
        return res.status(400).json({
            success: false,
            msg: 'Please provide name value'
        });
    }
    res.status(201).json({
        success: true,
        person: name
    });
}

const createPersonPostman = (req, res) => {
    const { name} = req.body;
    if(!name){
        return res.status(400).json({
            success: false,
            msg: 'Please provide name value'
        });
    }
    res.status(201).send({
        success: true,
        data: [...people, {id: people.length + 1, name}]
    })
}

const updatedPerson = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const person = people.find((person) => person.id === Number(id)); //Gets the value and return it to the variable
    if(!person){
    return res.status(404).json({
                success: false, 
                msg: `No person with id ${id}`
            })
    }
    const newPeople = people.map((person) => {
         if(person.id === Number(id)){
            person.name = name
         }
         return person;
    });
    res.status(200).json({
        success: true,
        data: newPeople
    })
}

const deletedPerson = (req, res) => {
    const person = people.find((person) => person.id === Number(req.params.id))
    if (!person) {
      return res
        .status(404)
        .json({ success: false, msg: `no person with id ${req.params.id}` })
    }
    const newPeople = people.filter(
      (person) => person.id !== Number(req.params.id)
    )
    return res.status(200).json({ success: true, data: newPeople })
  }






module.exports = {
    getPeople,
    singlePerson,
    createPerson,
    createPersonPostman,
    updatedPerson,
    deletedPerson,
}