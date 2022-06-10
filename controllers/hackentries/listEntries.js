const getConnection = require('../../db');
// const { generateError } = require('../../helpers');

async function listEntries(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    //en ejemplo conection es lo que queremos
    //query es le metodo para solicitar la peticion de la base datos

    //la llamada de la base datos
    const queryResult = await connection.query(
      //esta funcion nos permite hacer la peticion de sql
      //devuelve toda la informacion de la tabla hackentries
      `
      SELECT hackentries.id as hackId , title,content, users.id as userId, 
      users.name, hackentries.created_at FROM hackentries inner join users on users.id = hackentries.user_id
      ORDER BY hackentries.created_at DESC
            `
    );
    //lo guarda en result
    const [result] = queryResult;
    res.send({
      status: 'ok',
      message: result,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

module.exports = listEntries;
