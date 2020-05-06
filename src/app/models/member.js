const db = require('../../config/db')

module.exports = {
    
    find(id, callback) {
        db.query(`SELECT * FROM members WHERE id = ${id}`, function(err, result){
            if(err) throw `Database error! ${err.message}`

            callback(result.rows[0])
        })
    },
    all(callback) {
        db.query("SELECT * FROM members", function(err, result){
            if(err) throw `Database error! ${err.message}`

            callback(result.rows)
        })
    },
    create(values, callback) {
        const query = `
            INSERT INTO members (
                avatar_url,
                name,
                email,
                birth,
                gender,
                blood,
                weight,
                height
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id
        ` 

        db.query(query, values, function(err, result){
            if(err) throw `Database error! ${err.stack}`
            
            callback(result.rows[0].id)
        })  
    },
    update(values, callback) {
        const query = `
            UPDATE members SET
            avatar_url = ($2),
            name = ($3),
            email = ($4),
            birth = ($5),
            gender = ($6),
            blood = ($7),
            weight = ($8),
            height = ($9)
            WHERE id=($1)
            RETURNING id
        `
        db.query(query, values, function(err, result){
            if(err) throw `Database error! ${err.message}`
            
            callback(result.rows[0].id)
        }) 
    },
    delete(id, callback) {
        db.query(`DELETE FROM members WHERE id = ${id}`, function(err, result){
            if(err) throw `Database error! ${err.message}`

            callback()
        })
    }
}