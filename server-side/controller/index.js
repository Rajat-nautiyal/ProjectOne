const userList = require('../model/listSchema');

const getList = async(req, res) => {
    try{
        const lists = await userList.find();
        if(!lists){
           return res.status(404).json({message:"no list exist"})
        }
        res.status(201).json({lists});    
    }catch(e){
        res.status(501).json({error: e.message});    
    }
}

const postList = async(req, res) => {
    try{
        const {list} = req.body
        console.log(list)
        const newList = new userList({
            list : list
        })
        const newListPost = await newList.save();
        res.status(200).json({message: 'list updated', newListPost});    
    }catch(e){
        res.status(501).json({error: e.message});    
    }
}
const deleteList = async(req, res) => {
    try{
        const {_id} = req.body
        await userList.findByIdAndDelete(_id);
        res.status(200).json({message: "list is deleted" })
    }catch(e){
        res.status(501).json({error: e.message});    
    }
}
const updateList = async(req, res) => {
    try{
        const {id} = req.params;
        const {list} = req.body;
        // console.log(id,list)
        const updatedList = await userList.findByIdAndUpdate(id,{list:list});
        res.status(200).json({message: "list is updates", updatedList})
    }catch(e){
        res.status(501).json({error: e.message});    
    }
}

module.exports = {
    getList,
    deleteList,
    postList,
    updateList
}
