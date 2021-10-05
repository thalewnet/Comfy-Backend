const { District } = require('../models');

exports.getProvinces = async (req, res, next) => {
  try {
    const result = await District.findAll({
      attributes: ['province'],
      group: ['province'],
    });
    const provinceList = result.map((item) => item.province);

    res.json({ provinces: provinceList });
  } catch (err) {
    next(err);
  }
};

exports.getDistrict = async (req, res, next) => {
  try {
    const { province } = req.query;
    const result = await District.findAll({
      where: { province: province },
      attributes: ['amphoe'],
      group: ['amphoe'],
    });
    const amphoeList = result.map((item) => item.amphoe);
    console.log(amphoeList);
    res.json({ amphoeList });
  } catch (err) {
    next(err);
  }
};

exports.getAmphoeZip = async (req, res, next) => {
  try {
    const { amphoe, province } = req.query;
    const result = await District.findAll({
      where: { amphoe, province },
      attributes: ['district', 'zipcode'],
      group: ['district'],
    });
    const districtLists = result.map((item) => item.district);
    console.log(districtLists);
    res.json({ districtLists, zipcode: result[0].zipcode });
  } catch (err) {
    next(err);
  }
};
