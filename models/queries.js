import { pool } from "../config/db.js";

const agregarCancionQueries = async (datos) => {
  try {
    const sql = {
      text: "INSERT INTO canciones (titulo, artista, tono) VALUES ($1, $2, $3) returning *",
      values: datos,
    };
    const response = await pool.query(sql);
    if (response.rowCount > 0) {
      return response.rows[0];
    } else {
      return new Error("Cancion no agregada");
    }
  } catch (err) {
    console.error("Error al agregar cancion:", err);
  }
};

const getSongsQuery = async () => {
  try {
    const query = { text: "SELECT * FROM canciones" };
    const result = await pool.query(query);
    if (result.rowCount > 0) {
      return result.rows;
    } else {
      return new Error("Canciones no encontradas");
    }
  } catch (error) {
    console.log("Code: " + error.code + "\nMessage: " + error);
  }
};

const editSongQuery = async (titulo, artista, tono, id) => {
  try {
    const query = {
      text: "UPDATE canciones SET titulo = $1, artista = $2, tono = $3 WHERE id = $4 RETURNING *",
      values: [titulo, artista, tono, id],
    };
    const result = await pool.query(query);
    if (result.rowCount > 0) {
      return result.rows[0];
    } else {
      console.log("No se pudo editar la canción");
    }
  } catch (error) {
    console.log("Code: " + error.code + "\nMessage: " + error);
  }
};

const deleteSongQueries = async (id) => {
  try {
      const sql = {
          text: "DELETE FROM canciones WHERE id = $1 returning *",
          values: [id],
      }
      const response = await pool.query(sql)
      if (response.rowCount > 0) {
          return response.rows
      } else {
          return new Error("No se elimino la canción")
      }
  } catch (error) {
      console.log("Error code: ", error.code, "Error message: ", error.message);
  }
}

export { agregarCancionQueries, getSongsQuery, editSongQuery, deleteSongQueries };
