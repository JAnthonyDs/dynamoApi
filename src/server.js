require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const AWS = require('aws-sdk')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3333

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})


const dynamoClient = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = "user"


app.get('/user', async (req,res) => {
    const params = {
        TableName: TABLE_NAME
    };

    const characteres = await dynamoClient.scan(params).promise()
    // console.log(characteres.Items)
    return res.json(characteres.Items)
})


app.post('/user', async (req,res) => {
    const characterer = {
        email: req.body.email,
        nome: req.body.nome
    }
    const params ={
        TableName: TABLE_NAME,
        Item: characterer
    }

    const newUser =  await dynamoClient.put(params).promise()

    return res.json({message:"Usuário criado/atualizado com sucesso"})
})

app.delete('/user/:email', async (req,res) => {
    const email = req.params.email
    const params = {
        TableName: TABLE_NAME,
        Key: {
            email
        }
    }

    const status = await dynamoClient.delete(params).promise()

    return res.json({message:"Usuario deletado com sucesso"})
})


// const getCharacterById = async (email) => {
//     const params = {
//         TableName: TABLE_NAME,
//         Key: {
//             email
//         }
//     }
//     const characterer = await dynamoClient.get(params).promise()
//     console.log(characterer) 
//     return characterer
// }

app.listen(PORT, () => {
    console.log(`Server is running`)
})