import db from "../../../models";

const Model = db.user;

export const postUser = () => async (req, res) => {
  const data = req.body;
  const def = defValues();
  const values = {
    ...data,
    ...def,
  };
  try {
    let data = await Model.create(values);
    if (data) {
      res.status(200).json({ data: data });
    } else {
      throw new Error("No se creo el user");
    }
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
};


export const getUserLimit = () => async (req, res) => {
  try {
    const cantidad = Number.parseInt(req.params.cantidad);
    let objs = await Model.findAll({
      offset: cantidad,
      limit: 5,
    });
    if (objs) {
      res.status(200).json({ data: objs });
    } else {
      throw new Error("No se encontraron los user");
    }
  } catch (e) {
    logger.error(e.message);
    res.status(500).json({ error: e.message });
  }
};

export const getUserById = () => async (req, res) => {
  try {
    const id = req.params.id;
    const obj = await Model.findOne({
      where: {
        id: id,
      },
    });
    if (obj) {
      res.status(200).json({ data: obj });
    } else {
      throw new Error("No se encontro el user");
    }
  } catch (e) {
    logger.error(e.message);
    res.status(500).json({ error: e.message });
  }
};

export const putUser = () => async (req, res) => {
  const data = req.body;
  const values = Object.assign({}, data);
  try {
    const upd = await Model.update(values, {
      where: {
        id: data.id,
      },
    });
    if (upd) {
      res.status(200).json({ data: upd });
    } else {
      throw new Error("No se modifico el user especificada");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = () => async (req, res) => {
  const idUser = req.params.id;
  try {
    await Model.destroy({
      where: {
        id: idUser,
      },
    });
    res.status(200).json({ data: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
