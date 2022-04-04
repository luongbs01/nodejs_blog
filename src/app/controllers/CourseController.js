const Course = require('../model/Course');
const { mongooseToObject } = require('../../utils/mongoose');

class CourseController {
  // [GET] /course/:slug
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then((course) =>
        res.render('courses/show', { course: mongooseToObject(course) }),
      )
      .catch(next);
  }

  // [GET] /course/create
  create(req, res, next) {
    res.render('courses/create');
  }

  // [POST] /course/store
  store(req, res, next) {
    const formData = req.body;
    formData.image = 'https://files.fullstack.edu.vn/f8-prod/courses/6.png';
    const course = new Course(formData);
    course
      .save()
      .then(() => res.redirect('/'))
      .catch((error) => {});
  }

  // [GET] /course/edit
  edit(req, res, next) {
    Course.findById(req.params.id)
      .then((course) =>
        res.render('courses/edit', { course: mongooseToObject(course) }),
      )
      .catch(next);
  }

  // [PUT] /course/:id/
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect('/me/stored/courses'))
      .catch(next);
  }

  // [DELETE] /course/:id/
  destroy(req, res, next) {
    Course.delete({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }
}

module.exports = new CourseController();
