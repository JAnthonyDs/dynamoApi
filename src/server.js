const express = require('express')
const AWS = require('aws-sdk')
require('dotenv').config()

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const dynamoClient = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = "user"

//Ready
const getCharacters= async() =>{
    const params = {
        TableName: TABLE_NAME
    };

    const characteres = await dynamoClient.scan(params).promise()
    console.log(characteres)
    return characteres
}

//Create
const addOrUpdateCharacter = async (characterer) => {
    const params ={
        TableName: TABLE_NAME,
        Item: characterer
    }

    return await dynamoClient.put(params).promise()
}

const getCharacterById = async (email) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            email
        }
    }
    const characterer = await dynamoClient.get(params).promise()
    console.log(characterer) 
    return characterer
}


const deleteCharacter = async (email) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            email
        }
    }
    
    return await dynamoClient.delete(params).promise()
}


getCharacters()
const newUser = {email: 'teste@email.com', nome: 'Zeca da silva'} 
// addOrUpdateCharacter(newUser)
