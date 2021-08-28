require('dotenv').config()
const mongoose = require('mongoose')
// mongoose.set('debug', true)
mongoose.connect(`mongodb://localhost/nft`,{ useNewUrlParser: true, useUnifiedTopology: true})

const Schema = mongoose.Schema

const schemaMeta = new Schema({
    _id: {type: Number, default: 0},
    name: {type: String, default: ''},
    description: {type: String, default: ''},
    image: {type: String, default: ''},
    // external_url: {type: String, default: ''},
    // artist: {type: String, default: ''},
    // title: {type: String, default: ''},
    // animation_url: {type: String, default: ''},
    // decimals: {type: Number, default: 0},
    // background_color: {type: String, default: ''},
    // youtube_url: {type: String, default: ''},
    // attributes: [],
    // traits: [],
    // properties: {}
},{
    versionKey: false
})

const Meta = mongoose.model('Meta', schemaMeta,'meta')

const db = async (DB, filter,  updater, options) => {
    try {
        if (options === undefined){
            if (typeof updater === 'object'){
                return await DB.findOneAndUpdate(filter,updater,{new:true})
            }
            if (typeof updater === 'string'){
                if (updater === ''){
                    const res = await DB.find(filter)
                    if (res[0] !== undefined){
                        return res
                    } else {
                        return  false
                    }
                } else {
                    const res = await DB.find(filter, updater)
                    if (res[0] !== undefined){
                        return res
                    } else {
                        return  false
                    }
                }
            }
            if (typeof updater === 'undefined'){
                const doc = new DB(filter)
                return await doc.save()
            }
        } else {
            if (options === 'many') {
                return await DB.updateMany(filter,  updater)
            }
        }
    } catch (error) {
        // console.log(error)
    }
}

module.exports = {
    meta: Meta,
    db: db
}