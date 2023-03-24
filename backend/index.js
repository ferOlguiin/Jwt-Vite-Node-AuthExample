import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();

app.use(express.json());
app.use(cors({origin: "*"}))

app.post("/login", (req, res) => {
    const user = req.body;
    const token = jwt.sign(user, `${user.name}`, { expiresIn: '1m' });
    res.status(200).send(token); 
});

app.post("/probando", (req, res) => {
    const token = req.headers.authorization;
    const user = req.body;
    jwt.verify(token, user.name, function(err, user){
        if(err){
            res.status(403).send({msg: "No autorizado"})
        } else{
            res.status(200).send(user)
        }
    })

})

app.listen(4000);
console.log("Server on port 4000");