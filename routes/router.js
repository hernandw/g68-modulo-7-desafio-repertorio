import express from "express";
import { home, agregarCancion, getSongs, editSong, deleteSong} from "../controllers/controller.js";
const router = express.Router();

router.get("/", home);

router.post('/cancion', agregarCancion);

router.get('/canciones', getSongs);

router.put('/cancion/:id', editSong);

router.delete('/cancion', deleteSong);


router.get("*", (req, res) => {
  res.send("404 - page not found");
});

export default router;
