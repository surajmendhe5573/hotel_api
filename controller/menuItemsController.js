const menuItem= require('../model/menuItemsModel')

const create= async(req,res)=>{
   try {
      const menuData= new menuItem(req.body);
      const saveData= await menuData.save();
      res.status(200).json(saveData)

   } catch (error) {
     res.status(500).json({error: 'Internal server error'})
   }
}

const fetch= async(req,res)=>{
    try {
        
        const data= await menuItem.find();
        res.status(200).json(data)

    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal server error'})
    }
}

const menuInfo= async(req,res)=>{
    try {
        
      const tasteType= req.params.tasteType;  // extract the worktype from the url parameters
      if(tasteType=='spicy' || tasteType=='sour' || tasteType=='sweet'){
        const response= await menuItem.find({taste: tasteType})
        res.status(200).json(response)
      }else{
        res.status(404).json({error: 'Invalid taste type'})
      }

    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal server error'})
    }
}

const update= async(req,res)=>{
    try {
        
       const menuId= req.params.id; // Exctract th ID from the url parameter
       const response= await menuItem.findByIdAndUpdate(menuId, req.body);

       if(!response){
        return res.status(404).json({error: 'menu not found'})
       }

       res.status(200).json(response)

    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal server error'})
    }
}

const deleteMenu= async(req,res)=>{
    const menuId= req.params.id;  // Extract the ID fro the url parameter
    const response= await menuItem.findByIdAndDelete(menuId, req.body);

    if(!response){
        res.status(404).json({error: "Person not found"})
    } 
    res.status(200).json({message: "Person deleted successfully"})
}

module.exports= {create, fetch, menuInfo, update, deleteMenu}