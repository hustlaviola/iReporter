import incidents from '../models/incidentsModel';

class Validate {
  static validateId(req, res, next) {
    const redFlagId = Number(req.params.id);

    if (Number.isNaN(redFlagId)) {
      return res.status(422).send({
        status: res.statusCode,
        error: 'Invalid Id, Please input a number',
      });
    }

    const redFlag = incidents
      .find(incident => incident.id === parseInt(req.params.id, 10));
    if (!redFlag) {
      return res.status(404).send({
        status: res.statusCode,
        error: 'Red-flag record not found',
      });
    }
    return next();
  }


  static validatePost(req, res, next) {
    const {
      latitude, longitude, comment,
    } = req.body;

    if (!latitude) {
      return res.status(400).send({
        status: res.statusCode,
        error: 'Please add a latitude',
      });
    }

    if (!longitude) {
      return res.status(400).send({
        status: res.statusCode,
        error: 'Please add a longitude',
      });
    }

    if (!comment) {
      return res.status(400).send({
        status: res.statusCode,
        error: 'Please add a comment',
      });
    }

    return next();
  }

  static validateLocationUpdate(req, res, next) {
    const { latitude, longitude } = req.body;

    const latitudeRegEx = /^[-+]?([1-8]?[0-9][.]([0-9]+)|90[.](0+))$/;
    const longitudeRegEX = /^[-+]?((1[0-7][0-9])|([1-9]?[0-9]))[.]([0-9]+)|(180)[.](0+)/;
    
    if (!latitude) {
      return res.status(400).send({
        status: res.statusCode,
        error: 'Please enter a latitude',
      })
    }

    if (!longitude) {
      return res.status(400).send({
        status: res.statusCode,
        error: 'Please enter a longitude',
      })
    }
    
    if (!latitudeRegEx.test(latitude)) {
      return res.status(422).send({
        status: res.statusCode,
        error: 'Invalid latitude format',
      })
    }

    if (!longitudeRegEX.test(longitude)) {
      return res.status(422).send({
        status: res.statusCode,
        error: 'Invalid longitude format',
      })
    }

    return next();
  }

  static validateCommentUpdate(req, res, next) {
    const { comment } = req.body;

    if (!comment) {
      return res.status(400).send({
        status: res.statusCode,
        error: 'Please add a new comment',
      });
    }

    return next();
  }
}

export default Validate;
