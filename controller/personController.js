const Person= require('../model/personModel')

const create= async(req,res)=>{
    try {
        
       const userdata= new Person(req.body);
       const saveData= await userdata.save();
       res.status(200).json(saveData)

    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'})
    }
}

const fetch= async(req,res)=>{
    try {
        
        const data= await Person.find();
        res.status(200).json(data)

    } catch (error) {
        res.status(500).json({error: 'Internal server error'})
    }
}

const personInfo= async(req,res)=>{
        try {
            
            const workType= req.params.workType; // Extract the work type from the url parameters
            if(workType=='chef' || workType=='waiter' || workType=='manager'){
                const response= await Person.find({work: workType})
                res.status(200).json(response)
            }   

        } catch (error) {
            res.status(404).json({error: 'Invalid work type'})
        }
}

const update= async(req,res)=>{
    try {
        
       const personId= req.params.id; // Exctract th ID from the url parameter
       const response= await Person.findByIdAndUpdate(personId, req.body, {
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose validation
       });

       if(!response){
        return res.status(404).json({error: 'Person not found'})
       }

       res.status(200).json(response)

    } catch (error) {
        res.status(500).json({error: 'Internal server error'})
    }
}

const deletePerson= async(req,res)=>{
    const personId= req.params.id;  // Extract the ID fro the url parameter
    const response= await Person.findByIdAndDelete(personId, req.body);

    if(!response){
        res.status(404).json({error: "Person not found"})
    } 
    res.status(200).json({message: "Person deleted successfully"})
}


module.exports= {create, fetch, personInfo, update, deletePerson}