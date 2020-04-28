const express = require('express');
const router = express.Router();
const members = require('../../Members');
const uudi = require('uuid');

//get all members
router.get('/', (req, res) =>{
    res.json(members);
});

//get single member
router.get('/:id', (req, res)=>{
    const found = members.some(members => members.id === parseInt(req.params.id));
    if(found)
    {
        res.json(members.filter(members => members.id === parseInt(req.params.id)));
    }
    else{
        res.status(400).json({msg:`No member found with id of ${req.params.id}`});
    }
})

//create a member
router.post('/', (req, res) =>{
    const newMember = {
        id: uudi.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active',
    };

    if(!newMember.name || !newMember.email){
        return res.status(400).json({msg:'Please include a name and email'});
    }

    members.push(newMember);
    res.json(members);
    //res.redirect('/');
})

//update member
router.put('/:id', (req, res)=>{
    const found = members.some(members => members.id === parseInt(req.params.id));
    if(found)
    {
        const updateMember = req.body;
        members.forEach(members => {
            if(members.id === parseInt(req.params.id)){
                members.name = updateMember.name ? updateMember.name : members.name;
                members.email = updateMember.email ? updateMember.email : members.email; 
                res.json({msg:'member udpated', members});
            }
        })
    }
    else{
        res.status(400).json({msg:`No member found with id of ${req.params.id}`});
    }
})

//delete single member
router.delete('/:id', (req, res)=>{
    const found = members.some(members => members.id === parseInt(req.params.id));
    if(found)
    {
        res.json({msg:'member deleted', 
        members:members.filter(members => members.id !== parseInt(req.params.id))});
    }
    else{
        res.status(400).json({msg:`No member found with id of ${req.params.id}`});
    }
})

module.exports = router;