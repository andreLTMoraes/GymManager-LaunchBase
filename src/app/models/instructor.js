const db = require('../../config/db')

module.exports = {
    
    find(id, callback) {
        db.query(`SELECT * FROM instructors WHERE id = ${id}`, function(err, result){
            if(err) throw `Database error! ${err.message}`

            callback(result.rows[0])
        })
    },
    all(callback) {
        db.query("SELECT * FROM instructors", function(err, result){
            if(err) throw `Database error! ${err.message}`

            callback(result.rows)
        })
    },
    create(values, callback) {
        const query = `
            INSERT INTO instructors (
                name,
                avatar_url,
                gender,
                services,
                birth,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        ` 

        db.query(query, values, function(err, result){
            if(err) throw `Database error! ${err.message}`
            
            callback(result.rows[0].id)
        })  
    },
    update(values, callback) {
        const query = `
            UPDATE instructors SET
                name=($2),
                avatar_url=($3),
                gender=($4),
                services=($5),
                birth=($6)
            WHERE id=($1)
            RETURNING id
        `
        db.query(query, values, function(err, result){
            if(err) throw `Database error! ${err.message}`
            
            callback(result.rows[0].id)
        }) 
    },
    delete(id, callback) {
        db.query(`DELETE FROM instructors WHERE id = ${id}`, function(err, result){
            if(err) throw `Database error! ${err.message}`

            callback()
        })
    }
}